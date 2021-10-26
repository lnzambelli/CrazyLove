import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import {FirestoreService} from '../../services/firestore.service';
import {DialogHandlerService} from '../../services/dialog-msj/dialog-handler.service';
import data from '../../../assets/products.json'

@Component({
  selector: 'app-list-of-receptions',
  template: `
  <mat-card style="margin-top: 60px"*ngIf="!claveValida" >
   <form >
      <mat-form-field class="w-100">
          <mat-label>Contraseña</mat-label>
          <input matInput #clave maxlength="10" placeholder="Ingrese clave de admin...">
      </mat-form-field>
    </form>
    <button mat-button color="primary" class="w-100" (click)="mostrarNotificaciones(clave.value)">Ver Pedidos</button> 
  </mat-card>
  <div style="margin-top: 60px" *ngIf="claveValida">
   <mat-card >
      <mat-card-header class="flex justify-center pt-8 pb-8" >
          <mat-card-title class="w-100" >PEDIDOS WEB</mat-card-title>
      </mat-card-header>
      <nav class="flex flex-wrap justify-evenly flex-1 w-100">
        <mat-card *ngFor="let ped of listPedidos" style="width: 280px" class="mb-16">
          <mat-list-item>De: {{ped.nombre}} ({{ped.telefono}}) </mat-list-item>
          <mat-list-item>Precio: {{ped.precioTotal | currency}} </mat-list-item>
          <mat-list-item>Productos:</mat-list-item>
          <div *ngFor="let ped of ped.productos">
            <mat-list-item>{{ped}}</mat-list-item>
          </div>
          <button mat-button color="primary" class="w-100" (click)="eliminarPedido(ped.id)">Eliminar</button>
        </mat-card>
    </nav>
    </mat-card>
    
    <mat-card>
      <mat-card-header class="flex justify-center pt-8 pb-8" >
          <mat-card-title class="w-100" >MENSAJES WEB</mat-card-title>
      </mat-card-header>
      <nav class="flex flex-wrap justify-evenly flex-1 w-100"> 
        <mat-card *ngFor="let mensaje of listMensajes" style="width: 280px" class="mb-16">
          <mat-list-item>De: {{mensaje.firstName}} </mat-list-item>
          <mat-list-item>Email: {{mensaje.email}} </mat-list-item>
          <mat-list-item>Mensaje: {{mensaje.mensaje}} </mat-list-item>
          <button mat-button color="primary" class="w-100" (click)="eliminarMensaje(mensaje.id)">Eliminar</button>
        </mat-card>
    </nav>
    </mat-card>
    
  </div>
    `,
  styles: ['mat-list-item {font-size: small !important }'],
})
export class ListOfReceptionsComponent implements OnInit {

  listPedidos: Array<any> = [];
  listMensajes: Array<any> = [];
  displayedColumns = ["firstName","email","mensaje"]
  claveValida: boolean = false;
  claveIngreso: string ="";

  constructor(private firestore: FirestoreService,
              private dialog: DialogHandlerService) { }

  ngOnInit(){
    this.claveValida= false;
    this.claveIngreso= data.datos[0].claveMensajes
    this.obtenerMensajes();
    this.obtenerPedidosWeb();
  }

  obtenerPedidosWeb(){
      this.listPedidos=[];
      this.firestore.obtenerNuevosPedidos().subscribe(doc => {
      doc.forEach((element: any) => {
        this.listPedidos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  obtenerMensajes(){
    this.listMensajes=[];
    this.firestore.obtenerNuevosMensajes().subscribe(doc =>{
      doc.forEach((element: any) => {
        this.listMensajes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }
  eliminarMensaje(id: string){
      this.firestore.eliminarMensaje(id).then(()=>{
          this.dialog.showConfirmDialog(["Mensaje eliminado"]).afterClosed().subscribe(()=>{
            this.obtenerMensajes();
          })
         
      }, error =>{
          console.log(error)
      })
  }
  eliminarPedido(id: string){
    this.firestore.eliminarPedidos(id).then(()=>{
      this.dialog.showConfirmDialog(["Pedido eliminado"]).afterClosed().subscribe(()=>{
        this.obtenerPedidosWeb();
      });
      
      
    }, error =>{
        console.log(error)
    })
  }
  
  mostrarNotificaciones(clave: any){
      if (clave===this.claveIngreso){
        this.claveValida=true;
      }
  }
}

@NgModule({
  declarations: [
    ListOfReceptionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ListOfReceptionsModule { }
