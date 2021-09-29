import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <mat-toolbar color="primary" style="height: 30px;">
      <span style="font-size: small">© 2021 CrazyLove</span>
    </mat-toolbar>`,
  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
