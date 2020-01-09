import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private authService:AuthServiceService, private router:Router) { }

  ngSignup(form:NgForm) {
    if(form.invalid){
      return;
    }
    
    this.authService.createUser(form.value.email, form.value.password);
    this.router.navigate(['/login']);
  }

}
