import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { CardDto } from 'src/app/components/catalogo/card-catalogo';
import data from 'src/assets/products.json'

@Component({
  selector: 'app-home',
  template: `
    <app-carousel></app-carousel>
    <app-catalogo [cards]="cards" [titulo]="tituloMarcas"></app-catalogo>
    <app-catalogo [cards]="services" [titulo]="tituloServicios" ></app-catalogo>
    <h2 class="flex justify-center pt-8 mb-8" style="background-color: #EFF2FB ">Donde encontrarnos?</h2>
      <nav class="flex flex-wrap justify-evenly flex-1">
        <mat-card class="example-card mt-8 py-0" style="max-width: 100vh">
           <img mat-card-image src="assets/img/mapaUbicacion.img" alt="catalogo"> 
       </mat-card>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public cards!: Array<CardDto>;
  public services!: Array <CardDto>
  public tituloMarcas = "Nuestras Marcas";
  public tituloServicios= "Nuestros Servicios";
  constructor() {}

  ngOnInit() {
    this.cards = data.catalogo;
    this.services=data.servicios
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }