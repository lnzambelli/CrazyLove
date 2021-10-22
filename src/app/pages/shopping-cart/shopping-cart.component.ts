import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import { Producto } from 'src/app/components/dashboard/productos';
import { MaterialModule } from 'src/app/material/material.module';
import { CartDataService } from 'src/app/services/cart-data.service';
import { DialogHandlerService } from 'src/app/services/dialog-msj/dialog-handler.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PedidoWeb } from './../../models/pedido-web';
import data from '../../../assets/products.json'

@Component({
  selector: 'app-shopping-cart',
  template: `
    <mat-card style="box-shadow: none; margin-top: 56px">
      <mat-card>
          <mat-card-header class="flex justify-center pt-8" >
              <mat-card-title *ngIf="datosDeTabla.length!==0"class="w-100" >Orden de compra</mat-card-title>
              <mat-card-title *ngIf="datosDeTabla.length===0" class="w-100" >Carrito Vacio</mat-card-title>
          </mat-card-header>
       </mat-card>

        <mat-card-content *ngFor="let prod of datosDeTabla" value="prod.nombre" class="mb-8">
           <mat-card class="flex flex-row py-0">
             <mat-card-content class="flex flex-row justify-between w-100 mt-16 mb-0" >
                <p class="letra-s">{{prod.cantidad }}     {{prod.nombre |uppercase }} </p>
                <strong><span>{{prod.total |currency}}</span></strong>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="eliminarItems(prod.nombre)">
                  <mat-icon color="primary">clear</mat-icon>
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-card-content>
        <mat-card-content *ngIf="datosDeTabla.length!==0" class="flex justify-center">
            <mat-chip class="p-4 w-100 text-align-center"color="accent" selected>
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
               <button mat-button color="primary" (click)="enviarPedido(nombreApellido.value, telefono.value)" [disabled]="!estadoConexion">Confirmar Pedido</button>
          </mat-card>
          </mat-card-content>
    </mat-card> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit{

  datosDeTabla: Array<Producto> =[]
  resultado: number = 0;
  nombreApellido: string ="";
  telefono:  string ="";
  arrayProd: string[]= [];
  estadoConexion!: boolean;
  usuarioOk: string ="";
  telefonoOk: string =""
  
  constructor(private cartService: CartDataService,
              private dialog: DialogHandlerService,
              private firestoreService: FirestoreService,
              private router: Router
              ) { 
  }

  ngOnInit(){
    this.datosDeTabla = this.cartService.enviarDatoATabla();
    this.resultado = this.cartService.enviarResultado();
    this.estadoConexion = navigator.onLine;
    this.usuarioOk= data.datos[0].usuarioOk;
    this.telefonoOk=data.datos[0].telefonoOk;
 }

 eliminarItems(nombreProducto: string){
    this.dialog.showErrorDialog("Producto eliminado",[])
    this.datosDeTabla = this.datosDeTabla.filter(prod => prod.nombre !== nombreProducto);
    this.cartService.actualizarTabla(nombreProducto);
    this.resultado = this.cartService.enviarResultado();
 }

 async enviarPedido(nombreApellido: string, telefono: string){
    if(nombreApellido===this.usuarioOk && telefono===this.telefonoOk){
        this.router.navigate(['list-of-receptions'])
    }else{
      if (nombreApellido !=="" || telefono!=="" ){
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
        /*
        await this.mailerService.enviarCorreo(PEDIDO,true).then(()=>{
            console.log("Enviado al correo")
        })
        */
        await this.firestoreService.guardarMensaje(PEDIDO,"pedidoWeb").then(()=>{
        
          const dialog = this.dialog.showConfirmDialog(["Pedido confirmado..Gracias por su compra!!"]);
          dialog.afterClosed().subscribe(()=>{
            location.reload()
          })            
        }, error =>{
          console.log(error)
        })
        
      }else{
       this.dialog.showErrorDialog("ERROR: Campos incompletos",[])
     }
    }
   
 }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ShoppingCartModule { }
