import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  //emitimos al padre
  @Output() submitted = new EventEmitter<string>();

  // se convierte en un observable (al usarlo como formcontrol)
  inputSearch = new FormControl('');

  constructor(){}

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void{
    this.inputSearch.valueChanges
    .pipe(
      map((search:string) => search.trim()),
      debounceTime(350),
      distinctUntilChanged(),
      filter((search:string) => search !== ''),
      tap((search:string)  => this.submitted.emit(search))
    )
    .subscribe();
  }
}
