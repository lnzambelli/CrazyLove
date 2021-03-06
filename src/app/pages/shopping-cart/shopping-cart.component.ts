import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit, OnChanges } from '@angular/core';
import { Producto } from 'src/app/components/dashboard/productos';
import { MaterialModule } from 'src/app/material/material.module';
import { CartDataService } from 'src/app/services/cart-data.service';
import { DialogHandlerService } from 'src/app/services/dialog-msj/dialog-handler.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PedidoWeb } from './../../models/pedido-web';
import data from '../../../assets/products.json';
import {AuthViewListService} from '../../services/auth-view-list.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <mat-card style="box-shadow: none; margin-top: 56px" class="">  
          <mat-card>
              <div class="flex justify-between align-items-center">
                  <h3 class="mb-0"><b>¿Cómo realizar un pedido?</b></h3>
                  <button mat-icon-button color="primary" (click)="viewMenu()">
                      <mat-icon *ngIf="!mostrarNota">visibility</mat-icon>
                      <mat-icon *ngIf="mostrarNota">visibility_off</mat-icon>
                  </button>
              </div>
              <p *ngIf="mostrarNota">
                  En las 3 rayitas de la barra superior↖️, ingresa a la opción "Productos", elegí una marca/categoría, y luego añadí tus productos favoritos al carrito🛒🤩
              </p>
              <p *ngIf="mostrarNota">
              📩 Inmediatamente cuando llega, tomo tu pedido, lo preparo y me pongo en contacto vía WhatsApp 💬 para coordinar entrega📦🛍️
              </p>
          </mat-card>
    </mat-card>
    <mat-card style="box-shadow: none;">
      <mat-card>
          <mat-card-header class="flex justify-center pt-8" >
              <mat-card-title *ngIf="datosDeTabla.length!==0"class="w-100" >Orden de compra</mat-card-title>
              <mat-card-title *ngIf="datosDeTabla.length===0" class="w-100" >Carrito Vacío</mat-card-title>
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
               <mat-form-field >
                  <mat-label>Forma de pago</mat-label>
                      <mat-select #pago>
                        <mat-option value="efectivo">Efectivo</mat-option>
                        <mat-option value="transferencia">Transferencia Bancaria</mat-option>
                        <mat-option value="mercado pago">Mercado Pago</mat-option>
                    </mat-select>
                </mat-form-field>
                <mat-form-field >
                  <mat-label>Forma de entrega</mat-label>
                      <mat-select #entrega>
                        <mat-option value="envio">Enviar a Domicilio</mat-option>
                        <mat-option value="retiro">Retirar en local</mat-option>
                    </mat-select>
                </mat-form-field>
                
               <button mat-button color="primary" (click)="enviarPedido(nombreApellido.value, telefono.value, pago.value,entrega.value)" [disabled]="!estadoConexion || confirmoPedido">Confirmar Pedido</button>
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
  telefonoOk: string ="";
  pago: string ="";
  confirmoPedido: boolean = false
  mostrarNota: boolean = false;
 
  
  constructor(private cartService: CartDataService,
              private dialog: DialogHandlerService,
              private firestoreService: FirestoreService,
              private router: Router,
              private authtService: AuthViewListService) { 
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

 viewMenu(){
   this.mostrarNota=!this.mostrarNota;
 }

 async enviarPedido(nombreApellido: string, telefono: string, pago: string, entrega: string){
    if(nombreApellido===this.usuarioOk && telefono===this.telefonoOk){
      this.authtService.estado$.next(true);
        this.router.navigate(['list-of-receptions'])
    }else{
      if (nombreApellido !=="" && telefono!=="" && pago!=="" ){
        this.confirmoPedido = true;
        this.datosDeTabla.forEach(prod =>{
           const articulo = (prod.cantidad+" "+prod.nombre+": $"+prod.total)
          this.arrayProd.push(articulo)
        })
  
        const PEDIDO: PedidoWeb = {
          nombre: nombreApellido+` (${pago} con ${entrega})`,
          telefono: telefono,
          productos: this.arrayProd,
          precioTotal: this.resultado,
          
        }
        /*
        await this.mailerService.enviarCorreo(PEDIDO,true).then(()=>{
            console.log("Enviado al correo")
        })
        */
        await this.firestoreService.guardarMensaje(PEDIDO,"pedidoWeb").then(()=>{
        
          const dialog = this.dialog.showConfirmDialog(["Pedido confirmado con éxito.. Gracias por su compra!!"]);
          dialog.afterClosed().subscribe(()=>{
            location.reload()
          })            
        }, error =>{
          console.log(error)
        })
        
      }else{
       this.dialog.showErrorDialog("ERROR: Existen campos sin completar",[])
     }
    }
   
 }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    MatAutocompleteModule,
  ]
})
export class ShoppingCartModule { }
