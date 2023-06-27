import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotesDataService } from '../services/quotesData.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id = 0;
  quote: any;

  constructor(private act: ActivatedRoute, private quotes: QuotesDataService) {}

  ngOnInit(): void {
    this.act.params.subscribe(params => {
      this.id = params['id'];
      debugger;
      this.loadDetails(this.id);
    })
  }

  loadDetails(id: any) {
    this.quotes.getQuotesById(id).subscribe((data) => {
      this.quote = data;
      debugger;
    })
  }
}
