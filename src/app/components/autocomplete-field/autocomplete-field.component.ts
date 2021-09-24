import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-field',
  template: `
  <form class="example-form">
    <mat-form-field  >
      <mat-label>Categoria</mat-label>
      <input type="text"
           placeholder="Seleccionar Categoria"
           aria-label="Number"
           matInput
           [formControl]="myControl"
           [matAutocomplete]="auto">
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
        <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
          {{option}}
        </mat-option>
    </mat-autocomplete>
  </mat-form-field>
</form>
`
})
export class AutocompleteFieldComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Categoria 1', 'Categoria 2', 'Categoria 3'];
  filteredOptions!: Observable<string[]>;
  
  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

