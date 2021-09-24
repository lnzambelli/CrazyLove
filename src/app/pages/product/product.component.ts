import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardDto } from 'src/app/components/dashboard/card';
import data from 'src/assets/products.json';

@Component({
  selector: 'app-product',
  template: `
    <mat-toolbar class="flex justify-between  flex-wrap" style="height: auto" color="primary">
      <button mat-button  (click)="expandirCategorias=1">Proveedor 1</button>
      <button mat-button (click)="expandirCategorias=2">Proveedor 2</button>
      <button mat-button (click)="expandirCategorias=3">Otro</button> 
    </mat-toolbar>
    <mat-toolbar class="flex justify-between flex-wrap" style="height: auto" *ngIf="expandirCategorias===1">
      <button mat-button color="primary" (click)="obtenerCards(1)">Categoria 1</button>
      <button mat-button color="primary"(click)="obtenerCards(2)">Categoria 2</button>
      <button mat-button color="primary"(click)="obtenerCards(3)">Categoria 3</button> 
    </mat-toolbar>
    <mat-toolbar class="flex justify-between flex-wrap" style="height: auto" *ngIf="expandirCategorias===2">
      <button mat-button color="primary" (click)="obtenerCards(4)">Prod 1</button>
    </mat-toolbar>
    <mat-toolbar class="flex justify-between flex-wrap" style="height: auto" *ngIf="expandirCategorias===3">
      <button mat-button color="primary" (click)="obtenerCards(5)">Cat 1</button>
      <button mat-button color="primary"(click)="obtenerCards(6)">Cat 2</button>
    </mat-toolbar>
    <app-dashboard [cards]="cards"></app-dashboard >
  `,
   styles: ['button { padding: 4px }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent implements OnInit {

  public cards!: Array<CardDto>;
  expandirCategorias!: number
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
        case 4:
          this.cards = data.cards3;
          break;
        case 5:
            this.cards = data.cards4;
            break;
        case 6:
            this.cards = data.cards5;
            break;
        default:
          this.cards = data.cards;
          break;
      }  
  }
}
