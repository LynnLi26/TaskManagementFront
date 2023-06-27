import { Component, EventEmitter, Output } from '@angular/core';
import { QuotesDataService } from '../services/quotesData.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  enterSearchValue: string = '';
  quotes: any;

  constructor(private quote: QuotesDataService) { }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    debugger;
    this.searchTextChanged.emit(this.enterSearchValue); 
  }
}
