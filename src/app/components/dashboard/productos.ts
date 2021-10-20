export interface Productos {
    nombre: string;
    precio: number;
    cantidad: number;
    total: number;
}

export class Producto {
    constructor(public nombre: string, public precio: number, public cantidad: number,  public total: number) {
        this.nombre=nombre;
        this.precio=precio;
        this.cantidad=cantidad;
        this.total=this.cantidad*this.precio
     }
}