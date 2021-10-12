import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {speedDialAnimations} from './speed-dial-animations'; 

@Component({
  selector: 'app-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.scss'],
  animations: speedDialAnimations 
})
export class SpeedDialComponent {

  fabButtons = [
    {
      icon: 'timeline'
    },
    {
      icon: 'view_headline'
    },
    {
      icon: 'room'
    },
    {
      icon: 'lightbulb_outline'
    },
    {
      icon: 'lock'
    }
  ];
  buttons: Array<any> = [];
  fabTogglerState = 'inactive';

  constructor() { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

}


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule
  ],
})
export class SpeedDialModule { }
