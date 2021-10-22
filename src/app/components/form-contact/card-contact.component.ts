import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card-contact',
  template: `
    <h2 class="text-align-center">Escribinos..</h2>
    <div class="">
      <mat-card >
         <mat-card-header class="flex flex-column align-items-center">
            <div mat-card-avatar class="mb-16">
              <mat-icon style="font-size: 36px;">email</mat-icon>
            </div>
            <mat-card-title style="font-size: small;">{{contactoCorreo}}</mat-card-title>
        </mat-card-header>
      </mat-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardContactComponent implements OnInit {
  
  @Input() contactoWhatsapp: string ="";
  @Input() contactoCorreo: string ="";

  constructor() { }

  ngOnInit(): void {
  }

}
