import { Store } from 'src/assets/store';
import { Card } from './card-catalogo';

export class CardsStore extends Store<Card[]>{
  constructor() {
    super([]);
  }

  public empty() {
    this.setState([]);
  }

  public add(marca: string, imagen: string, titulo: string, url: string) {
    this.setState([...this.state, new Card(marca, imagen, titulo, url)]);
  }
}