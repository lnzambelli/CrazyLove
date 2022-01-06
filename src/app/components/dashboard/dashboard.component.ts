import { CartDataService } from './../../services/cart-data.service';
import { Component, Input, OnChanges } from '@angular/core';
import {  CardDto } from './card';
import { CardsStore } from './cards-store';
import {DialogHandlerService} from 'src/app/services/dialog-msj/dialog-handler.service';


@Component({
  selector: 'app-dashboard',
  template: `
  <mat-card style="box-shadow: none" >
    <nav class="flex flex-wrap justify-evenly flex-1 mb-16">
      <mat-card class="example-card mt-4 pb-0 mb-8" style="max-width: 120px" *ngFor="let card of cardsStore.state$ | async">
        <mat-card-header class="mb-4 w-100 mx-0" >
          <div style="height: 60px" class="w-100 mx-0">
            <mat-card-title style="font-size: smaller;" class="w-100" >{{card.producto |titlecase}}</mat-card-title>
          </div>
        </mat-card-header>
        <img mat-card-image [src]="card.imagen" alt="producto" class="mb-0 img-formato mx-0">
        <mat-card-actions class="flex justify-between pt-0 mb-4">
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

  public async agregarAlCarrito(card: CardDto){
    if (card.fragancias.length>=0 && card.fragancias[0]!=""){
      const dialogRef =  this.dialog.seleccionarFragancia(card.fragancias);
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          this.cartService.obtenerDatos(card, result);
          this.dialog.showConfirmDialog(["Agregado al carrito"])
        }else{
          this.dialog.showErrorDialog("Error: Campo incompleto", ["No selecciono ninguna opción"])
          return
        }
      });
    }else{
        this.cartService.obtenerDatos(card,"");
        this.dialog.showConfirmDialog(["Agregado al carrito"])
    }   
  }

  private createCards() {
    this.cardsStore.empty();
    for (let card in this.cards) {
      this.cardsStore.add(
        this.cards[card].producto,
        this.cards[card].imagen,
       this.cards[card].precio,
       this.cards[card].fragancias
      );
    }
  }
}
