import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //Status flag used in html file
  public userIsAuthenticated = false;

  //Set sub status flag and use it at phase of both oninit and ondestroy
  //so insure continue correct subscribe status 
  private authListnerSubs: Subscription;
  constructor(private authService:AuthServiceService) { }

  ngOnInit() {
    this.authListnerSubs = this.authService
                               .getAuthStatusListner()
                               .subscribe(isAuthenticated => {
                                  this.userIsAuthenticated = isAuthenticated;
                                  console.log(this.userIsAuthenticated);
                                });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authListnerSubs.unsubscribe();
  }
}
