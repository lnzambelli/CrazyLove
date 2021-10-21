import {  Component, Input, NgModule,  OnChanges } from '@angular/core';
import { CardDto} from './card-catalogo';
import { CardsStore } from './card-catalogo-store';

@Component({
  selector: 'app-catalogo',
  template: `
      <div class="flex justify-center py-8">
      <mat-chip color="primary" selected class="flex justify-center py-8" style="width: 50%; border-radius: 10px 100px / 120px;max-width: 250px">{{titulo | uppercase}}</mat-chip>
      </div>
      <nav class="flex flex-wrap justify-evenly flex-1">
        <mat-card class="example-card mt-8" style="max-width: 280px; " *ngFor="let card of cardsStore.state$ | async">
           <mat-card-header class="">
             <mat-card-title >{{card.marca}}</mat-card-title>
            </mat-card-header>
           <img mat-card-image [src]="card.imagen" alt="catalogo" class="mb-0 img-formato" style="border-radius: 100px ">
           <mat-card-actions class="flex justify-around">
               <button mat-button color="primary" [routerLink]="card.url" style="">{{card.titulo}}</button>
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

