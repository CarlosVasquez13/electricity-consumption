
export interface IAparato {
    id: number;
    nombre: string;
    potencia: number;
    tiempoUso: number;
    consumoTotal: number; // Consumo total en kWh
    tipoPotencia: number; // Tipo de potencia (1: Kw, 2: w)
}

export class Aparato implements IAparato {
    nombre: string;
    potencia: number; // Potencia en Kw
    tiempoUso: number;
    id: number;
    consumoTotal: number; // Consumo total en kWh
    tipoPotencia: number; // Tipo de potencia (1: Kw, 2: w)
    /**
     *
     */
    constructor() {
        this.nombre = '';
        this.potencia = 0;
        this.tiempoUso = 0;
        this.id = 0;
        this.consumoTotal = 0;
        this.tipoPotencia = 1; // Default to Kw
    }
}