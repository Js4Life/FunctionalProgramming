import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';

import { AuthenticationService} from '../services/security/authentication.service';

import {Constants} from '../models/constants.model';
import {AppRouteConfig} from '../app.router-config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage : String;
  loginForm:any={};
  options:any=[
    {id:0,name:'Dashboard'},{id:1,name:'Option 2'}
  ];
  user:any;
  submitted = false;
  loading : boolean = false;
  showLogInDiv : boolean = false;
  showForgetPasswordDiv : boolean = false;
  showResetLinkDiv : boolean = false;
  showResetPasswordDiv : boolean = false;
  constructor(private authSvc:AuthenticationService,public router : Router,private arc:AppRouteConfig) { }
    onSubmit() {
        this.submitted = true;
    }

  login(){
    console.log(this.loginForm);
    // this.arc.gotoPage('dashboard');
    if(this.loginForm.name=="" || this.loginForm.password=="")
      {
        this.errorMessage = ' Username and password can not be null';
      }
      else {
    this.loading = true;    
    this.authSvc
        .login(this.loginForm)
        .then(a => {
        this.loading = false;    
    
          if( a ){
              this.user= JSON.parse(localStorage[Constants.LOGIN_RESPONSE]);
              this.arc.gotoPage('dashboard');
          }
          else {
              //  alert('Invalid username or password!');
               this.errorMessage = 'Invalid Username or password';
              // this.errorMessage.message = '404 error';
          }
        });
  }
}

//   resetUser() {
//     this.loginForm = new loginForm('','');
// }

  ngOnInit() {
    this.showingDivs();
  }

  showingDivs(){
    this.showLogInDiv=true;
    this.showForgetPasswordDiv=false;
    this.showResetLinkDiv=false;
    this.showResetPasswordDiv=false;
  }
  forgetPassword(){
    this.showLogInDiv=false;
    this.showForgetPasswordDiv=true;
    this.showResetLinkDiv=false;
    this.showResetPasswordDiv=false;
  }
  backToLogIn(){
    this.showingDivs();    
  }
  sendResetPasswordLink(){
    this.showLogInDiv=false;
    this.showForgetPasswordDiv=false;
    this.showResetLinkDiv=true;
    this.showResetPasswordDiv=false;
  }
  returnToLogIn(){
    this.showLogInDiv=false;
    this.showForgetPasswordDiv=false;
    this.showResetLinkDiv=false;
    this.showResetPasswordDiv=true;
  }
  UpdatePassword(){
    this.showingDivs();
  }
}
