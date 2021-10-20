import { Store } from 'src/assets/store';
import { Card } from './card';

export class CardsStore extends Store<Card[]>{
  constructor() {
    super([]);
  }

  public empty() {
    this.setState([]);
  }

  public add(producto: string, imagen: string, precio: string, fragancias: string[]) {
    this.setState([...this.state, new Card(producto, imagen, precio, fragancias)]);
  }
}