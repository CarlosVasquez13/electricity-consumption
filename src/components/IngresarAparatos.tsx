import { h } from "preact";
import type { Aparato } from "../data/types/IAparato";
import AparatoForm from "./AparatoForm";
import AparatosTable from "./AparatosTable";
import { useEffect, useState } from "preact/hooks";

const IngresarAparatos = () => {
  let aparatosInit: Aparato[] = [];

  const [ aparatos, setAparatos ] = useState<Aparato[]>(aparatosInit);
  const [ consumoTotal, setConsumoTotal ] = useState(0);
  const [ facturaTotal, setFacturaTotal ] = useState(0);
  const precioKw = 6.41;
  const precioPrimeros50 = 4.92;

    const agregarAparato = (aparato: Aparato) => {
      //aparto.tipoPotencia: 1:kw, 2w
      let potencia = aparato.tipoPotencia === 1 ? aparato.potencia : aparato.potencia / 1000;
      aparato.potencia = potencia;

        setAparatos((prev) => [...prev, { ...aparato, id: prev.length + 1 }]);
        actualizarTotales();
    };

    const actualizarTotales = () => {
        let consumoTotalAcum = aparatos.reduce((total, aparato) => {
          return total + (aparato.potencia * aparato.tiempoUso);
        }, 0);

        setConsumoTotal(consumoTotalAcum);
        //los primeros 50kw a 4.92
        //los siuguientes a 6.41
        let totalPagar = 0;
        if (consumoTotalAcum <= 50) {
          totalPagar = consumoTotalAcum * precioPrimeros50;
        }
        else {
          totalPagar = (50 * precioPrimeros50) + ((consumoTotalAcum - 50) * precioKw);
        }

        //redondear a 2 decimales
        totalPagar = Math.round(totalPagar * 100) / 100;
        setFacturaTotal(totalPagar);
    }

    const eliminarAparato = (id: number) => {
        setAparatos((prev) => prev.filter((aparato) => aparato.id !== id));
        actualizarTotales();
    }

    // Save the list of "aparatos" to localStorage whenever it changes
    useState(() => {
      const storedAparatos = window.localStorage.getItem("aparatos");
      if (storedAparatos) {
        aparatosInit = JSON.parse(storedAparatos);
      }
    });

    useEffect(() => {
      window.localStorage.setItem("aparatos", JSON.stringify(aparatos));
    }, [aparatos]);
    
  return (
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-8 gap-4 mb-4">
        <div class="col-span-8 grid grid-cols-3 gap-4">
          <div class="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 class="text-lg font-semibold">Consumo Total</h3>
            <p class="text-2xl font-bold">{consumoTotal} kWh</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 class="text-lg font-semibold">Precio Actual por kw</h3>
            <p class="text-2xl font-bold">L.{precioKw}</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 class="text-lg font-semibold">Total Factura Mensual</h3>
            <p class="text-2xl font-bold">L.{facturaTotal}</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div class="p-4 col-span-3">
          <AparatosTable aparatos={aparatos} onEliminarAparato={eliminarAparato}/>
        </div>

        <div class="bg-gray-200 p-4 col-span-1">
          <AparatoForm onAgregarAparato={agregarAparato} />
        </div>
      </div>

      <div class="mt-4">
        <div class="p-4">
          <div>
            <button class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2">
              Calcular Consumo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresarAparatos;
