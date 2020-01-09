import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
//Set login status flag for html
private isAuthenticated = false;

//Set token variable
private token:string;

//Setna login status listener
private authStatusListner = new Subject<boolean>();

  constructor(private http:HttpClient, private router:Router) { }

  //Set functions to get the three private variables
  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListner(){
    return this.authStatusListner.asObservable();
  }


  //Set the main functions
  createUser(email:string, password:string){
    const authData:AuthData = {email:email, password:password};
    this.http.post("http://localhost:3000/signup",authData)
             .subscribe(response=>{
               console.log(response);
             });
  }

  login(email:string, password:string){
    const authData:AuthData = {email:email, password:password};
    this.http.post<{token:string}>("http://localhost:3000/login",authData)
             .subscribe(response=>{
               //Get the responsed token from the backend side
               const token = response.token;
               this.token = token;
               console.log(response);
               //If token is not null, then get flags and variables
               if(token){
                 this.isAuthenticated = true;
                 this.authStatusListner.next(true);
                 this.router.navigate(['/list']);
               }
             });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.router.navigate(['/']);
  }

}
