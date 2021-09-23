import {  Component, Input, NgModule,  OnChanges } from '@angular/core';
import { CardDto} from './card-catalogo';
import { CardsStore } from './card-catalogo-store';

@Component({
  selector: 'app-catalogo',
  template: `
      <h2 class="flex justify-center pt-8 mb-0" style="background-color: #EFF2FB " >{{titulo}}</h2>
      <nav class="flex flex-wrap justify-evenly flex-1">
        <mat-card class="example-card mt-8" style="max-width: 250px" *ngFor="let card of cardsStore.state$ | async">
           <mat-card-header class="">
             <mat-card-title>{{card.marca}}</mat-card-title>
            </mat-card-header>
           <img mat-card-image [src]="card.imagen" alt="catalogo">
           <mat-card-actions class="flex justify-around">
               <a type="button" [href]="card.url">{{card.titulo}}</a>
            </mat-card-actions>
       </mat-card>
    </nav>
  `,
})
export class CatalogoComponent implements OnChanges {

  @Input() cards: Array<CardDto> = [];
  @Input() titulo: string = "";

  public cardsStore = new CardsStore();
  constructor() { }

  ngOnChanges(): void {
    this.createCards();
  }
  private createCards() {
    this.cardsStore.empty();
    for (let card in this.cards) {
      this.cardsStore.add(
        this.cards[card].marca,
        this.cards[card].imagen,
        this.cards[card].titulo,
        this.cards[card].url,
      );
    }
  }
}

