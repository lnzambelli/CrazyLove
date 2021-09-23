import { Store } from 'src/assets/store';
import { Producto } from './productos';

export class ProductStore extends Store<Producto[]>{
  constructor() {
    super([]);
  }

  public empty() {
    this.setState([]);
  }

  public add(nombre: string, precio: number, cantidad: number, total: number) {
    const existeProducto = this.state.find(producto => producto.nombre === nombre);
    if(!existeProducto){
        this.setState([...this.state, new Producto(nombre, precio, cantidad, (cantidad*precio))]);
    }else{
       
    }
  }
}