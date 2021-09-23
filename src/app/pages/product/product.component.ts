import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardDto } from 'src/app/components/dashboard/card';
import data from 'src/assets/products.json'

@Component({
  selector: 'app-product',
  template: `
    <mat-toolbar class="flex justify-between flex-1">
      <button mat-button color="primary" (click)="obtenerCards(1)">Categoria 1</button>
      <button mat-button color="primary"(click)="obtenerCards(2)">Categoria 2</button>
      <button mat-button color="primary"(click)="obtenerCards(3)">Categoria 3</button>
  </mat-toolbar>
    <app-dashboard [cards]="cards"></app-dashboard >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent implements OnInit {

  public cards!: Array<CardDto>;
  constructor() { }

  ngOnInit(): void {
    this.cards = data.cards;
  }

  obtenerCards(categoria: number){
      switch(categoria){
        case 1:
          this.cards = data.cards;
          break;
        case 2:
          this.cards = data.cards1;
          break;
        case 3:
          this.cards = data.cards2;
          break;
        default:
          this.cards = data.cards;
          break;
      }
     
  }

}
