import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, NgModule, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DialogHandlerService} from 'src/app/services/dialog-msj/dialog-handler.service'

@Component({
  selector: 'app-seleccionar-fragancia',
  template: `
      <div mat-dialog-content>
        <div class="text-align-center">
            <mat-icon color="primary" >check_circle_outline</mat-icon>
        </div> 
        <p>Seleccionar fragancia</p>
         <mat-form-field appearance="fill">
            <mat-label>Fragancia</mat-label>
            <mat-select disableRipple>
                <mat-option *ngFor="let text of data.text" (onSelectionChange)="notificarCambios($event, text)" value={{i}>{{text}}</mat-option>
            </mat-select>
          </mat-form-field>
      </div>
      <div mat-dialog-actions class="justify-around">
        <button mat-raised-button mat-dialog-close color="primary" (click)="mensajeConfirmacion()">Aceptar</button>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeleccionarFraganciaComponent  {

  public fraganciaElegida!: string;

  constructor(public dialogo: MatDialogRef<SeleccionarFraganciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {text: string[] }, 
    private dialog: DialogHandlerService) { }

  notificarCambios(event: any, text: string){
    this.fraganciaElegida= text;
  }

  async mensajeConfirmacion(){
      this.dialogo.beforeClosed().subscribe(() => this.dialogo.close(this.fraganciaElegida));
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SeleccionarFraganciaModule { }