import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
}) 
export class AccountService {
    username = '';
    psw = '';

    constructor(private http: HttpClient) {}

    Login(username: any, psw: any) {
        let body = new URLSearchParams();
        // body.set('Username','user1@gmail.com');
        // body.set('password','Az@123456')
        body.set('Username',username);
        body.set('password',psw);
        body.set('grant_type','password');
        return this.http.post('https://localhost:44363/Token',body,{headers:{'content-type':'x-www-form-urlencoded'}});
    }

    Register(body: any) {
        // let body = {
        //     "Email":"user4@gmail.com",
        //     "password":"Az@123456",
        //     "confirmpassword":"Az@123456"
        // }
        debugger;
        return this.http.post('https://localhost:44363/api/Account/Register',body,{headers:{'content-type':'application/json'}})
    }
}