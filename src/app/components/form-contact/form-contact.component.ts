import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {DialogHandlerService} from 'src/app/services/dialog-msj/dialog-handler.service'
import {FirestoreService} from 'src/app/services/firestore.service';
import {MensajeContacto} from 'src/app/models/mensaje-contacto'

@Component({
  selector: 'app-addres-form',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})

export class AddresFormComponent {
  addressForm = this.fb.group({
    email: ["", [Validators.required, Validators.email] ],
    firstName: ["", Validators.required],
    address: ["", Validators.required],
    city: ["", Validators.required],
    mensaje:  [""],
  });

  constructor(private fb: FormBuilder, 
              private dialog: DialogHandlerService, 
              private router: Router, 
              private firestoreService: FirestoreService,
              ) {}

  enviarMensaje(){
    if (this.addressForm.valid){
      const dialogRef = this.dialog.showConfirmDialog(["Mensaje enviado correctamente"]);
      dialogRef.afterClosed().subscribe(result => {
          this.crearTarjetaContacto();
          this.router.navigate(['/home']);        
      });
    }else{
      const dialogRef = this.dialog.showErrorDialog("Campos incompletos o incorrectos", []);
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
  
  async crearTarjetaContacto(){
     const TARJETA: MensajeContacto = {
      email: this.addressForm.value.email,
      firstName: this.addressForm.value.firstName,
      address: this.addressForm.value.address,
      city: this.addressForm.value.city,
      mensaje: this.addressForm.value.mensaje
    }
    /*
    await this.mailerService.enviarCorreo(TARJETA,false).then(()=>{
      console.log("Enviado al correo")
    })
    */
    await this.firestoreService.guardarMensaje(TARJETA,"mensajes").then(()=>{
        
    }, error =>{
      console.log(error)
    })
  }
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class FormContactModule { }