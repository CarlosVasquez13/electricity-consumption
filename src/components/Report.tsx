import { useEffect, useState } from "preact/hooks";
import type { Aparato } from "../data/types/IAparato";

const Report = () => {
  const [consumoTotal, setConsumoTotal] = useState(0);
  let costoPorKw = 3.5;
  let [totalPagar, setTotalPagar] = useState(0);
  let [aparatos, setAparatos] = useState<Aparato[]>([]);

  useEffect(() => {
    const storedAparatos = localStorage.getItem("aparatos");
    if (storedAparatos === null) {
      return;
    }

    const parsedAparatos = JSON.parse(storedAparatos) as Aparato[];
    setAparatos(parsedAparatos);
    let calcularConsumoTotal = parsedAparatos.reduce((total, aparato) => {
      return total + (aparato.potencia * aparato.tiempoUso) / 1000; // Convertir a kWh
    }, 0);
    calcularConsumoTotal = Math.round(calcularConsumoTotal * 100) / 100;
    const facturaTotal = Math.round(calcularConsumoTotal * costoPorKw);

    setConsumoTotal(calcularConsumoTotal);
    setTotalPagar(facturaTotal);
  }, []);

  return (
    <div class="container mx-auto p-4">
      <div class="mb-4">
        <h1 class="text-2xl text-white font-bold text-center">
          Reporte de Consumo Eléctrico
        </h1>
      </div>

      <div class="mb-4">
        <p class="text-center text-white">
          Este es un reporte detallado del consumo eléctrico. A continuación se
          presentan los datos relevantes, también se incluye un estimado del
          total a pagar.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-1/2 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-8 py-4">
                {" "}
                Total Cosumo(mes){" "}
              </th>
              <th scope="col" class="px-8 py-4">
                {" "}
                Costo por kWh{" "}
              </th>
              <th scope="col" class="px-8 py-4">
                {" "}
                Total a Pagar{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {consumoTotal} kWh
              </td>
              <td class="px-6 py-4">{costoPorKw} </td>
              <td class="px-6 py-4"> L.{totalPagar} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="overflow-x-auto">
        <div>
            <h2 class="text-lg text-white font-bold mt-4 mb-4">
                Detalle de Aparatos
            </h2>
            <p class="text-white mb-4">
                A continuación se presenta el detalle de cada aparato y su consumo
                eléctrico.
            </p>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Nombre</th>
                    <th scope="col" class="px-6 py-3">Potencia (W)</th>
                    <th scope="col" class="px-6 py-3">Tiempo de Uso (h)</th>
                    <th scope="col" class="px-6 py-3">Consumo (kWh)</th>
                </tr>
            </thead>
            <tbody>
                {aparatos.map((aparato, index) => (
                    <tr
                        key={index}
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {aparato.nombre}
                        </td>
                        <td class="px-6 py-4">{aparato.potencia}</td>
                        <td class="px-6 py-4">{aparato.tiempoUso}</td>
                        <td class="px-6 py-4">
                            {((aparato.potencia * aparato.tiempoUso) / 1000).toFixed(2)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
