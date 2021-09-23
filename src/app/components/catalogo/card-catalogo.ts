export interface CardDto {
    marca: string;
    imagen: string;
    titulo: string;
    url: string;
}

export class Card {
    constructor(public marca: string, public imagen: string, public titulo: string, public url: string ) { }
}
