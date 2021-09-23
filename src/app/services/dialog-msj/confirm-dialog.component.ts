import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
      <div mat-dialog-content>
      <div class="text-align-center">
        <mat-icon color="primary" >check_circle_outline</mat-icon>
        </div> 
         <p *ngFor="let text of data.text" style="white-space: pre-line">{{text}}</p>
      </div>
      <div mat-dialog-actions class="justify-around">
        <button mat-raised-button mat-dialog-close color="primary" mat-dialog-close>Aceptar</button>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  constructor(public dialogo: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string[] }) { 
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
export class ConfirmDialogModule { }