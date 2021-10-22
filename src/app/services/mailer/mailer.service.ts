/*
import { Injectable } from '@angular/core';
import { transporter } from './mailer';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  constructor() { }

  async enviarCorreo(datos: any, esPedido: boolean){
     try {
        if(esPedido){
          await transporter.sendMail({
            from: '"Web App 👻" <foo@example.com>', // sender address
            to: "virgiferrari@hotmail.com,", // list of receivers
            subject: "Nuevo Pedido ✔", // Subject line
            text: "Nuevo pedido Recibido..", // plain text body
            html: `
              <h1>Nuevo Pedido</h1>
              <p>${datos.nombre}</p>
              <p>${datos.telefono}</p>
              <p>${datos.precioTotal}</p>
              <div *ngFor="let texto of ${datos.productos}">
                  {{texto}}
              </div>
            `, // html body
        });  
        }else{
          await transporter.sendMail({
            from: '"Web App 👻" <foo@example.com>', // sender address
            to: "virgiferrari@hotmail.com,", // list of receivers
            subject: "Nuevo Mensaje ✔", // Subject line
            text: "Nuevo Mensaje Recibido..", // plain text body
            html: `
              <h1>Nuevo Mensaje</h1>
              <div *ngFor="let texto of ${datos}">
                  <p>{{texto}}</p>
              </div>
            `, // html body
        });  
        }
        
      } catch (error) {
      
      }
  }

}
*/