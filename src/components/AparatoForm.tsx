import { useState } from 'preact/hooks';
import type { Aparato } from '../data/types/IAparato';

interface AgregarFormProps {
    onAgregarAparato: (aparato: Aparato) => void;
};

const AparatoForm = (
    { onAgregarAparato }: AgregarFormProps
) => {
   
    const [aparato, setAparato] = useState<Aparato>({
        nombre: '',
        potencia: 0,
        tiempoUso: 0,
        id: 0,
        consumoTotal: 0,
        tipoPotencia: 1
    });

    const handleInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;

        setAparato((prev) => ({
            ...prev,
            [name]: name === 'potencia' || name === 'tiempoUso' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        console.log('[handleSubmit]', aparato);
        onAgregarAparato(aparato);
        setAparato({
            nombre: '',
            potencia: 0,
            tiempoUso: 0,
            id: 0,
            consumoTotal: 0,
            tipoPotencia: 1
        });
    };
    const handleDropdownChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        setAparato((prev) => ({
            ...prev,
            nombre: target.value,
        }));
    };

    const handleTipoPotenciaChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        console.log('[handleTipoPotenciaChange]', target.value);

        setAparato((prev) => ({
            ...prev,
            tipoPotencia: Number(target.value),
        }));
    }

    const opcionesAparatos = ['Refrigerador', 'Televisor', 'Microondas', 'Lavadora',
        'Aire Acondicionado', 'Computadora', 'Horno Eléctrico', 'Secadora de Pelo', 'Plancha', 'Calentador de Agua'
        , 'Estufa Eléctrica', 'Lavavajillas', 'Cafetera', 'Ventilador', 'Tostadora', 'Batidora', 'Freidora Eléctrica', 'Horno de Convección'
        , 'Secadora de Ropa', 'Aspiradora', 'Deshumidificador', 'Humidificador', 'Purificador de Aire', 'Calefactor'
        , 'Cortadora de Césped Eléctrica', 'Sierra Eléctrica', 'Taladro Eléctrico', 'Compresora de Aire', 'Soldadora Eléctrica'
        , 'Lijadora Eléctrica', 'Esmeriladora', 'Amoladora', 'Desmalezadora Eléctrica', 'Sierra Circular Eléctrica'
    ];

    return (
        <form onSubmit={handleSubmit}
         class="p-4 bg-gray-100 rounded shadow-md">
            <div class="mb-4">
                <label for="nombre" class="block text-sm font-medium text-gray-700">
                    Aparato
                </label>
                <select
                    id="nombre"
                    name="nombre"
                    value={aparato.nombre}
                    onChange={handleDropdownChange}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="" disabled>
                        Selecciona un aparato
                    </option>
                    {opcionesAparatos.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            </div>
            <div class="mb-4 flex justify-between">
                <div class="mb-4">
                    <label for="potencia" class="block text-sm font-medium text-gray-700">
                        Potencia
                    </label>
                    <input
                        type="number"
                        id="potencia"
                        name="potencia"
                        value={aparato.potencia}
                        onChange={handleInputChange}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label for="categoria" class="block text-sm font-medium text-gray-700">
                        Tipo Potencia
                    </label>
                    <select
                        id="potenciaTipo"
                        name="tipoPotencia"
                        onChange={handleTipoPotenciaChange}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="1" disabled>
                            Selecciona el tipo de potencia
                        </option>
                        <option value="1">Kw</option>
                        <option value="2">w</option>
                    </select>
                </div>
                
            </div>
            <div class="mb-4">
                <label for="tiempoUso" class="block text-sm font-medium text-gray-700">
                    Tiempo de Uso (horas)
                </label>
                <input
                    type="number"
                    id="tiempoUso"
                    name="tiempoUso"
                    value={aparato.tiempoUso}
                    onChange={handleInputChange}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Agregar Aparato
            </button>
        </form>
    );
};

export default AparatoForm;