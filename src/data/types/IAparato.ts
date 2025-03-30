
export interface IAparato {
    nombre: string;
    potencia: number;
    tiempoUso: number;
    id: number;
}

export class Aparato implements IAparato {
    nombre: string;
    potencia: number;
    tiempoUso: number;
    id: number;

    /**
     *
     */
    constructor() {
        this.nombre = '';
        this.potencia = 0;
        this.tiempoUso = 0;
        this.id = 0;
    }
}