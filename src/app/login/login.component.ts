import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  constructor(private authService:AuthServiceService) { }

 onLogin(form:NgForm) {
    if(form.invalid){
      console.log("Form invalid!");
      return;
    }else{
      //Print the result to help debug
      console.log(form.value);

      //Use the service to login
      this.authService.login(form.value.email, form.value.password);
    }
    
 
  }

}
