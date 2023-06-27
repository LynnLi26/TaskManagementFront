import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { QuotesDataService } from '../services/quotesData.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Iquote } from '../iquote';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {
  quotes: any;
  //allQuote: IQuote[];
  quotesWithoutSort: any=[];
  QuoteIdFilter="";
  QuoteTypeFilter="";
  flag = true;

  quoteId: any;
  quoteType: any;
  sales: any;
  premium: any;
  dueDate: any;
  idq: any;
  typeq: any;
  sal: any;
  prem: any;
  date: any;
  desc: any;

  description: any;
  closeResult: string;
  editForm: FormGroup;

  selectedSort = 'quoteID';
  displayedColumns: string[] = ['QuoteID', 'QuoteType', 'Description', 'Sales', 'DueDate', 'Premium','icons'];
  //dataSource: MatTableDataSource<any>;
  dataSource: MatTableDataSource<Iquote> = new MatTableDataSource<Iquote>();

  searchText: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public quote: QuotesDataService, 
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    debugger;
    this.quote.getQuotes().subscribe ({
      next: (dta: Iquote) => {
        debugger;
        
        //localStorage.setItem('mydata', JSON.stringify(dta));
        //let data = JSON.parse( localStorage.getItem('mydata'));
        this.dataSource.data = Object.values(dta);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.quotes = dta;
        this.quotesWithoutSort = dta;
      }
    })
  }

  ngAfterViewInit(): void {
    // debugger;
    // let mydata = JSON.parse( localStorage.getItem('mydata'));

    // this.dataSource.data =mydata
     this.dataSource.sort = this.sort;
  }

  AddTask(addQuoteForm: NgForm) {
    let body = {};
    if(addQuoteForm.valid) {
      body = {
        "QuoteID": addQuoteForm.value.quoteId,
        "QuoteType": addQuoteForm.value.quoteType,
        "Description": addQuoteForm.value.description,
        "DueDate": addQuoteForm.value.dueDate,
        "Premium": addQuoteForm.value.premium,
        "Sales": addQuoteForm.value.sales
      }
    }

    this.quote.PostQuotes(body).subscribe( {
      next: (data) => {
        debugger;
        console.log(data)
      }
    });
  }

  DeleteTask(id: any) {
    debugger;
    this.quote.DeleteQuotes(id).subscribe();
  }

  onColumnSelected(event: Event, asc: any) {
    const selectElement = event.target as HTMLSelectElement;
    const column = selectElement.value;
    if (column) {
      const ascending = asc; // or false for descending
      this.sortData(column, ascending);
      debugger;
    }
  }

  sortData(column: any, asc: any ) {
    //const column = this.selectedSort;
    //const direction = 'asc';
 
    this.quotes = this.quotesWithoutSort.sort(function(a:any,b:any){
      if(column == 'Premium') {

      }
      if(asc) {
        return (a[column]>b[column])? 1 : ((a[column]<b[column])? -1:0);
      }
      else {
        return (b[column]>a[column])? 1 : ((b[column]<a[column])? -1:0);
      }
    });
    this.dataSource  = new MatTableDataSource(Object.values(this.quotes));
    console.log(this.quotes);   
    debugger;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  openEdit(targetModal, quotes: any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.editForm.patchValue( {
    "QuoteID": quotes.quoteId,
    "QuoteType": quotes.quoteType,
    "Description": quotes.description,
    "DueDate": quotes.dueDate,
    "Premium": quotes.premium,
    "Sales": quotes.sales
   } );
   debugger;
 }

 saveEdit() {
  console.log(this.editForm.value);
  this.quote.PutQuotes(this.editForm.value, this.editForm).subscribe( {
    next: (data) => {
      debugger;
      console.log(data)
    }
  })
 }

 EditTask(editQuoteForm: NgForm, id: any) {
    let body = {};
    if(editQuoteForm.valid) {
      body = {
        "QuoteID": editQuoteForm.value.idq,
        "QuoteType": editQuoteForm.value.typeq,
        "Description": editQuoteForm.value.desc,
        "DueDate": editQuoteForm.value.date,
        "Premium": editQuoteForm.value.prem,
        "Sales": editQuoteForm.value.sal
      }
      debugger;
    }
    this.quote.PutQuotes(id, body).subscribe( {
      next: (data) => {
        debugger;
        console.log(data)
      }
    });
 }

 FilterFn() {
  var QuoteIdFilter = this.QuoteIdFilter;
  var QuoteTypeFilter = this.QuoteTypeFilter;

  if (QuoteTypeFilter === undefined) {
    console.log("QuoteTypeFilter is undefined");
    return;
  }
  console.log("QuoteTypeFilter value:", QuoteTypeFilter);

  this.quotes = this.quotesWithoutSort.filter(
    function(el:any) {
      debugger;
      return el.QuoteID.toString().toLowerCase().includes(
        QuoteTypeFilter.toString().trim().toLocaleLowerCase()
      )||
        el.QuoteType.toString().toLowerCase().includes(
        QuoteTypeFilter.toString().trim().toLocaleLowerCase()
      )||
        el.Sales.toString().toLowerCase().includes(
        QuoteTypeFilter.toString().trim().toLocaleLowerCase()
      )||
      el.Premium.toString().toLowerCase().includes(
        QuoteTypeFilter.toString().trim().toLocaleLowerCase()
      )||
      el.Description.toString().toLowerCase().includes(
        QuoteTypeFilter.toString().trim().toLocaleLowerCase()
      )||
      el.DueDate.toString().toLowerCase().includes(
        QuoteTypeFilter.toString().trim().toLocaleLowerCase()
      )
    }
  );
  this.dataSource = new MatTableDataSource(Object.values(this.quotes));
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  console.log(this.quotes);
  debugger;
 }

 onSearchTextEntered(searchValue: string) {
  this.searchText = searchValue;
  let body = {}
  this.quote.getQuotes().subscribe( {
    next:(data) => {
      this.quotes = data;
      
      debugger;
      for(let i = 0; i < this.quotes.length; i++) {
        this.quotes.QuoteType = this.quotes[i].QuoteType;
        console.log(this.quotes[i].QuoteType)
      }
      //console.log(this.quotes)
      debugger;
    }
  } )
  console.log(this.searchText);
 }
}
