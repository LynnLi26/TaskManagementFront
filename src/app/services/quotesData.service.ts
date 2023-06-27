import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Iquote } from "../iquote";

@Injectable({
    providedIn: 'root'
})
export class QuotesDataService {

    constructor(private http: HttpClient) {}

    getQuotes() {
        debugger;
        let mytoken = localStorage.getItem('token');
        return this.http.get<Iquote>('https://localhost:44363/api/Quotes',{headers:{'Authorization':'bearer'+mytoken}})
    }

    getQuotesById(id: any) {
        return this.http.get('https://localhost:44363/api/Quotes/'+id)
    }
    
    PostQuotes(body: any) {
        debugger;
        //let mytoken = localStorage.getItem('token');
        return this.http.post('https://localhost:44363/api/Quotes',body)
    }

    DeleteQuotes(id: any) {
        return this.http.delete('https://localhost:44363/api/Quotes/'+id)
    }

    PutQuotes(id: any, body: any) {
        debugger;
        return this.http.put('https://localhost:44363/api/Quotes/'+id, body)
    }

}