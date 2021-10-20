export interface CardDto {
    producto: string;
    imagen: string;
    precio: string;
    fragancias: string[]
}

export class Card {
    constructor(public producto: string, public imagen: string, public precio: string, public fragancias: string[]) { }
}