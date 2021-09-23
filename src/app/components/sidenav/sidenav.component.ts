import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MaterialModule } from './../../material/material.module';

@Component({
  selector: 'app-sidenav',
  template: `
      <mat-drawer-container> 
          <mat-drawer mode="side"opened >
            <mat-selection-list [multiple]="false"class="flex flex-row" >
                <mat-list-option class="flex flex-row">
                    <mat-icon  >home</mat-icon>
                    <span>Home</span>
                </mat-list-option>
              </mat-selection-list> 
            </mat-drawer > 
          <mat-drawer-content> Contenido principal </mat-drawer-content > 
      </mat-drawer-container>
`,
  
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SidenavModule { }