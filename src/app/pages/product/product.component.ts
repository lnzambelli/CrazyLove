import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardDto } from 'src/app/components/dashboard/card';

import detalleProd from '../../../assets/detalle-productos.json'

@Component({
  selector: 'app-product',
  template: `
    <mat-card style="box-shadow: none; margin-top: 56px; " class="pb-0">  
      <mat-form-field class="w-100" >
        <mat-label>Seleccionar Categoria</mat-label>
          <mat-select required [(value)]="selected">
            <mat-option *ngFor="let categoria of arrCategorias; index as i" [value]="categoria" >
              <button mat-button (click)="obtenerCards(categoria)" class="w-100 p-4" style="text-align: initial;">{{categoria}}</button>
            </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-card>
    <app-dashboard [cards]="cards"></app-dashboard >

  `,
   styles: ['button { padding: 4px }'],
  
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent implements OnInit {

  public cards!: Array<CardDto>;
  public arrCategorias: string[] =[]
  public arrProdCat!: any;
  public selected = "Saphirus";

  constructor() { }

  ngOnInit(): void {
    this.arrProdCat =detalleProd;
    this.arrCategorias = Object.keys(this.arrProdCat);
    this.cards= this.arrProdCat[this.selected]
  }

  obtenerCards(categoria: string){
      this.cards = this.arrProdCat[categoria]
  }
}
