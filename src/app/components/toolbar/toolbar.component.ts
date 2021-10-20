import { Router } from '@angular/router';
import { MaterialModule } from './../../material/material.module';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, OnChanges } from '@angular/core';
import data from 'src/assets/products.json';
import {CartDataService} from 'src/app/services/cart-data.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary" class="flex justify-between">
      <mat-toolbar-row class="flex justify-between">
        <div>
          <button mat-icon-button (click)="expandirMenu()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>{{nombreDeEmpresa}}</span>
        </div>
        <div> 
          <a mat-icon-button [href]="linkFacebook" Target="_blank">
             <mat-icon>facebook</mat-icon>
          </a>
          <a mat-icon-button [href]="linkInstagram" Target="_blank">
             <mat-icon>photo_camera</mat-icon>
          </a>
          <button mat-icon-button routerLink="/shopping-cart">
             <mat-icon matBadge={{cantidadArticulos}} matBadgeColor="accent" matBadgeSize="small">shopping_cart</mat-icon>
          </button>
        </div>
      </mat-toolbar-row>
      <mat-toolbar-row class="flex flex-column align-items-start mx-16" style="height: 100%" *ngIf="expanded" >
        <button mat-button routerLink="/home" (click)="expandirMenu()">Home</button>
        <button mat-button routerLink="/product" (click)="expandirMenu()">Productos</button>
        <button mat-button routerLink="/contact" (click)="expandirMenu()">Contacto</button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class ToolbarComponent implements OnInit{

  public expanded= false;
  public nombreDeEmpresa!: string; 
  public linkFacebook!: string;
  public linkInstagram!: string;
  public cantidadArticulos!: number

  constructor(private cartService: CartDataService,private  router: Router ){}

  expandirMenu(){
    this.expanded = !this.expanded;
  }
  ngOnInit(){
    this.nombreDeEmpresa = data.datos[0].nombreEmpresa;
    this.linkFacebook = data.datos[0].facebook;
    this.linkInstagram = data.datos[0].instagram;
    this.obtenerCantidad();
  }

  obtenerCantidad(){
    this.cartService.getAllProductsToCart().subscribe(cantidad =>{
      this.cantidadArticulos=cantidad
    
  })
  }

}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ToolbarModule { }