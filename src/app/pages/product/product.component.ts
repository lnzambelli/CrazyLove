import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardDto } from 'src/app/components/dashboard/card';
import data from 'src/assets/products.json';
import prod from './products-art.json';
import detalleProd from './detalle-productos.json'

@Component({
  selector: 'app-product',
  template: `
    <mat-card style="box-shadow: none; margin-top: 56px; " class="pb-0">  
      <mat-form-field class="w-100" >
        <mat-label>Seleccionar Categoria</mat-label>
          <mat-select required [(value)]="selected">
            <mat-option *ngFor="let categoria of arrCategorias; index as i" [value]="categoria" >
              <button mat-button (click)="expandirCategorias=i" class="w-100" style="text-align: initial;">{{categoria}}</button>
            </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="w-100">
        <mat-label>Seleccionar Producto</mat-label>
          <mat-select required>
            <mat-option *ngFor="let producto of arrProd[expandirCategorias].prod" [value]="producto">
              <button mat-button (click)="obtenerCards(producto)" class="w-100" style="text-align: initial;">{{producto}}</button>
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
  expandirCategorias: number =0
  public arrCategorias: string[] = ["Saphirus", "Sahumerios y velas", "Decoracion", "Belleza y cuidado", "Remeras Jibre"]
  public arrProd!: Array<any>;
  public arrProdCat!: any;
  selected = "Saphirus"

  constructor() { }

  ngOnInit(): void {
    this.cards = data.cards;
    this.arrProd = prod.productos;
    this.arrProdCat =detalleProd
  }

  obtenerCards(categoria: string){
      this.cards = this.arrProdCat[categoria]
  }
   
}
