import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  template: `
    <img src="assets/img/home/Home-Portada.jpg" style="width: 100%;margin-top: 56px">
  `,
  styles: ['img { max-height: 400px }']
})
export class CarrouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 
  }
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class CarouselModule { }