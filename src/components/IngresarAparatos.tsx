import { h } from "preact";
import type { Aparato } from "../data/types/IAparato";
import AparatoForm from "./AparatoForm";
import AparatosTable from "./AparatosTable";
import { useState } from "preact/hooks";

const IngresarAparatos = () => {
  let aparatosInit: Aparato[] = [];

  const [ aparatos, setAparatos ] = useState<Aparato[]>(aparatosInit);

    const agregarAparato = (aparato: Aparato) => {
      console.log('[AgregarDatos] agregarAparato', aparato);
        setAparatos((prev) => [...prev, { ...aparato, id: prev.length + 1 }]);
    };

    const eliminarAparato = (id: number) => {
        setAparatos((prev) => prev.filter((aparato) => aparato.id !== id));
    }

  return (
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-gray-200 p-4 col-span-3">
          <AparatosTable aparatos={aparatos} onEliminarAparato={eliminarAparato}/>
        </div>

        <div class="bg-gray-200 p-4 col-span-1">
          <AparatoForm onAgregarAparato={agregarAparato} />
        </div>
      </div>

      <div class="mt-4">
        <div class="bg-gray-200 p-4">
          Columna única
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
