import { h } from "preact";
import type { Aparato } from "../data/types/IAparato";

interface IProps {
  aparatos: Aparato[];
  onEliminarAparato: (id: number) => void;
}
const AparatosTable = ({ aparatos, onEliminarAparato }: IProps) => {

  const eliminarAparato = (id: number) => {
    onEliminarAparato(id);
  }

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" class="px-1 py-3">
              {" "}
              Id{" "}
            </th> */}
            <th scope="col" class="px-8 py-3">
              {" "}
              Aparato{" "}
            </th>
            <th scope="col" class="px-6 py-3">
              {" "}
              Potencia(kw){" "}
            </th>
            <th scope="col" class="px-6 py-3">
              {" "}
              Tiempo uso mensual(hrs){" "}
            </th>

            <th scope="col" class="px-1 py-3">
              {" "}
              Acción{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {aparatos.map((aparato: any) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              {/* <th scope="row" class="px-1 py-4">
                {aparato.id}
              </th> */}
              <td class="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {" "}
                {aparato.nombre}{" "}
              </td>

              <td class="px-6 py-4"> {aparato.potencia} </td>
              <td class="px-6 py-4"> {aparato.tiempoUso} </td>
              <td class="flex items-center px-2 py-4">
                <button
                onClick={() => eliminarAparato(aparato.id)}
                  class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AparatosTable;
