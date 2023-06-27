import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private router: Router) {}
    canActivate(){
        let token = localStorage.getItem('token');
        if(token) {
            //debugger;
            return true;
        }
        else{
            debugger;
            this.router.navigate(['Task'])
            return false;
        }
    }
}