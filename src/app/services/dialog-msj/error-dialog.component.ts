import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
      <div mat-dialog-content>
        <div class="text-align-center">
        <mat-icon color="warn" >error_outline</mat-icon>
        </div> 
          <div style="white-space: pre-line">{{data.text}}</div>
           <div *ngFor="let error of data.errors" class="errorMessage">{{error}}</div>
      </div>
    <div mat-dialog-actions class="justify-around">
       <button mat-button mat-dialog-close color="accent">Aceptar</button>
    </div> 
  `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDialogComponent {

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
                                 @Inject(MAT_DIALOG_DATA) public data: any) { 
  }
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class ErrorDialogModule { }