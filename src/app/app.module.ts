import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStudentsComponent } from './Students/list-students.component';
import { DisplayStudentComponent } from './Students/display-student.component';
import { DetailStudentComponent } from './Students/detail-student.component';
import { CreateStudentComponent } from './Students/create-student.component';
import { StudentFilterPipe } from './Pipes/student-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from './auth-interceptor';
import { HeaderComponent } from './header/header.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { ErrInterceptor } from './err-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    DisplayStudentComponent,
    DetailStudentComponent,
    CreateStudentComponent,
    StudentFilterPipe,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    AuthGuardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
