import { Injectable} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ErrorDialogComponent } from './error-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import {SeleccionarFraganciaComponent} from 'src/app/services/dialog-msj/seleccionar-fragancia.component'

@Injectable({
  providedIn: 'root'
})

export class DialogHandlerService {

  private snackBarRef!: MatSnackBarRef<any>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public showErrorDialog(texto: string, errors: string[]) {
    this.dismissMessage();
    return this.dialog.open(ErrorDialogComponent, {
      data: { text: texto, errors: errors }
    });
  }

  public showMessageDialog(texto: string, errors?: string[]) {
    this.dismissMessage();
    return this.dialog.open(ErrorDialogComponent, {
      data: { text: texto, errors: errors },
      position: { top: '50px' },
      maxWidth: '600px'
    });
  }

  public showConfirmDialog(texto: string[]) {
    this.dismissMessage();
    return this.dialog.open(ConfirmDialogComponent, {
      data: { text: texto },
      position: {  },
      maxWidth: '600px',
    });
  }

  public dismissMessage() {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  public showMessage(mensaje: string, duracion?: number) {
    if (duracion) {
      this.snackBarRef = this.snackBar.open(mensaje, '', { duration: duracion});
    } else {
      this.snackBarRef = this.snackBar.open(mensaje);
    }
  }

  public open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open(component, config);
  }

  public seleccionarFragancia(texto: string[]) {
    this.dismissMessage();
    return this.dialog.open(SeleccionarFraganciaComponent, {
      data: { text: texto },
      position: {  },
      maxWidth: '600px'
    });
  }

}