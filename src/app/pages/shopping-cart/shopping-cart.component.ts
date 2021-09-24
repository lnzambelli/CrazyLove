import { PedidoWeb } from './../../models/pedido-web';
import { Component, OnInit, ChangeDetectionStrategy, } from '@angular/core';
import {CartDataService} from 'src/app/services/cart-data.service'
import { Producto, Productos } from 'src/app/components/dashboard/productos';
import {MaterialModule} from 'src/app/material/material.module'
import {DialogHandlerService} from 'src/app/services/dialog-msj/dialog-handler.service';
import {MensajeContactoService} from 'src/app/services/mensaje-contacto.service'

@Component({
  selector: 'app-shopping-cart',
  template: `
    <mat-card style="box-shadow: none">
      <mat-card>
          <mat-card-header class="flex justify-center pt-8" >
              <mat-card-title *ngIf="datosDeTabla.length!==0"class="w-100" >Orden de compra</mat-card-title>
              <mat-card-title *ngIf="datosDeTabla.length===0" class="w-100" >Carrito Vacio</mat-card-title>
          </mat-card-header>
       </mat-card>
        <mat-card-content *ngFor="let prod of datosDeTabla" value="prod.nombre" class="mb-8">
           <mat-card class="flex flex-row py-0">
             <mat-card-content class="flex flex-row justify-between w-100 mt-16 mb-0" >
                <p>{{prod.cantidad}}   {{prod.nombre |uppercase}}</p>
                <span>{{prod.total |currency}}</span>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="eliminarItems(prod.nombre)">
                  <mat-icon color="warn">clear</mat-icon>
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-card-content>
        <mat-card-content *ngIf="datosDeTabla.length!==0" class="flex justify-center">
            <mat-chip class="p-4 w-100 text-align-center"color="warn" selected>
                 Importe Total: {{resultado |currency}}
           </mat-chip>
        </mat-card-content>
          <mat-card-content *ngIf="datosDeTabla.length!==0" class="flex justify-center mb-32 flex-column">
            <mat-card class="flex justify-center flex-column">
                <mat-form-field >
                    <mat-label>Nombre y Apellido</mat-label>
                    <input matInput placeholder="Nombre y Apellido" #nombreApellido>
                 </mat-form-field>
                <mat-form-field >
                    <mat-label>Telefono</mat-label>
                    <input matInput placeholder="Telefono" #telefono>
               </mat-form-field>
               <button mat-button color="primary" (click)="enviarPedido(nombreApellido.value, telefono.value)">Confirmar Pedido</button>
          </mat-card>
          </mat-card-content>
    </mat-card>  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {

  datosDeTabla: Array<Producto> =[]
  resultado: number = 0;
  nombreApellido: string ="";
  telefono:  string ="";
  arrayProd: string[]= []
  
  constructor(private cartService: CartDataService,
              private dialog: DialogHandlerService,
              private mensajeContacto: MensajeContactoService) { }

  ngOnInit(){
    this.datosDeTabla = this.cartService.enviarDatoATabla();
    this.resultado = this.cartService.enviarResultado();
 }

 eliminarItems(nombreProducto: string){
    this.dialog.showErrorDialog("Producto eliminado",[])
    this.datosDeTabla = this.datosDeTabla.filter(prod => prod.nombre !== nombreProducto);
    this.cartService.actualizarTabla(nombreProducto);
    this.resultado = this.cartService.enviarResultado();
 }


 enviarPedido(nombreApellido: string, telefono: string){
   if (nombreApellido !=="" || telefono!==""){
      this.datosDeTabla.forEach(prod =>{
         const articulo = (prod.cantidad+" "+prod.nombre+": $"+prod.total)
        this.arrayProd.push(articulo)
    })

    const PEDIDO: PedidoWeb = {
        nombre: nombreApellido,
        telefono: telefono,
        productos: this.arrayProd,
        precioTotal: this.resultado
    }
    this.mensajeContacto.guardarMensaje(PEDIDO,"pedidoWeb").then(()=>{
      this.dialog.showConfirmDialog(["Pedido confirmado..Gracias por su compra!!"])
      
  }, error =>{
    console.log(error)
  })
   }else{
     this.dialog.showErrorDialog("ERROR: Campos incompletos",[])
   }
    
 }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ShoppingCartModule { }
