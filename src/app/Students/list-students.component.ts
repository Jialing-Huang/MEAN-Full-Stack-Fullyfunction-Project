import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../Models/Student.model';
import { StudentServiceService } from '../Services/student-service.service'; 
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

students:Student[] = [];
userIsAuthenticated = false;
authListnerSubs:Subscription;
refreshList:Subscription;

  constructor(private _studentservice:StudentServiceService,
              private authService:AuthServiceService) { }

  ngOnInit() {

    this.authListnerSubs = this.authService
                               .getAuthStatusListner()
                               .subscribe(isAuthenticated => {
                                  this.userIsAuthenticated = isAuthenticated;                                  
                                  console.log(this.userIsAuthenticated);
                                });

    //Get all students items from the mongoDB
    this.refreshList = this._studentservice.getStudents()
                                           .subscribe(data => this.students = data); 
       
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authListnerSubs.unsubscribe();
    this.refreshList.unsubscribe();
  }
}
