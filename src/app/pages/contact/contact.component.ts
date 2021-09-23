import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { MaterialModule } from './../../material/material.module';
import data from 'src/assets/products.json'


@Component({
  selector: 'app-contact',
  template: `
    <mat-card >
      <app-addres-form></app-addres-form>
      <app-card-contact [contactoWhatsapp]="contactoWhatsapp"[contactoCorreo]="contactoCorreo" ></app-card-contact>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  public contactoWhatsapp!: string;
  public contactoCorreo!: string
  constructor() { }

  ngOnInit(): void {
    this.contactoWhatsapp= data.datos[0].telefono;
    this.contactoCorreo = data.datos[0].correo;
  }

}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
})
export class ContactModule { }