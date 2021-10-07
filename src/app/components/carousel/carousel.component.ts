import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  template: `
    <img src="https://material.angular.io/assets/img/examples/shiba2.jpg" style="width: 100%;margin-top: 56px">
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