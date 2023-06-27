import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// interface LoginResponse extends Object {
//   access_token: any;
// }

export class LoginComponent {
  

  username: any;
  psw: any;
  token = '';
  flag = true;
  status = "Enable";
  bgcolor: string = '';

  rgName: any;
  rgpsw: any;
  confmpsw: any;
  constructor(private account: AccountService, private router: Router) {}

  // Login() {
  //   this.account.Login().subscribe({next: (dta) => {
  //     localStorage.setItem('token', dta['access-token'])
  //     debugger;
  //     console.log(dta)
  //   }})
  // }

  Login(login: NgForm) {
    this.account.Login(login.value.username, login.value.psw).subscribe (
      {next: (dta) => {
        localStorage.setItem('token', dta['access_token']);
        debugger;
        this.router.navigate(['Task'])
        console.log(dta)},
      error:(error) => {
        window.alert('Login failed');
      }}
    )
  }
  
  showRegister() {
    this.flag = !this.flag;
    //this.status = this.flag? "Enable" : "Disable";
    
  }

  register(register: NgForm) {
    let body = {}
    if(register.valid) {
      body = {     
        "Email": register.value.rgName,
        "password": register.value.rgpsw,
        "confirmpassword": register.value.confmpsw
      }
      debugger;
    }

    this.account.Register(body).subscribe({
      next:(data) => {
        debugger;
        console.log(data);
      },
      error: (err) => {window.alert('Success')},
      complete: () => {
        debugger;
        window.alert('Success');
      }
    })
  }
}
