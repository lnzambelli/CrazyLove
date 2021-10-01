import { CartDataService } from './../../services/cart-data.service';
import { Component, Input, OnChanges } from '@angular/core';
import {  CardDto } from './card';
import { CardsStore } from './cards-store';
import {DialogHandlerService} from 'src/app/services/dialog-msj/dialog-handler.service';


@Component({
  selector: 'app-dashboard',
  template: `
  <mat-card style="box-shadow: none">
    <nav class="flex flex-wrap justify-evenly flex-1 mb-16">
      <mat-card class="example-card mt-8" style="max-width: 125px" *ngFor="let card of cardsStore.state$ | async">
        <mat-card-header class="">
          <mat-card-title>{{card.producto}}</mat-card-title>
        </mat-card-header>
        <img mat-card-image [src]="card.imagen" alt="producto" class="mb-0">
        <mat-card-actions class="flex justify-around pt-0">
            <span class="p-8">{{card.precio | currency}} </span>
            <button mat-raised-button (click)="agregarAlCarrito(card)" style="box-shadow: none" class="flex justify-end">
               <mat-icon >add_shopping_cart</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
    </nav>
  </mat-card>
  `,
})


export class DashboardComponent implements OnChanges {

  @Input() cards: Array<CardDto> = [];

  public cardsStore = new CardsStore();
 
  constructor(private cartService: CartDataService, 
                      private dialog: DialogHandlerService) {}

  ngOnChanges(): void {
    this.createCards();
  }

  public agregarAlCarrito(card: CardDto){
      this.dialog.showConfirmDialog(["Agregado al carrito"])
      this.cartService.obtenerDatos(card);
  }

  private createCards() {
    this.cardsStore.empty();
    for (let card in this.cards) {
      this.cardsStore.add(
        this.cards[card].producto,
        this.cards[card].imagen,
       this.cards[card].precio,
      );
    }
  }
}
