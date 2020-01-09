import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable()
export class ErrInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return next.handle(req).pipe(
            //If there is error on http connection occurr, error will be catched
            catchError((error:HttpErrorResponse) => {
               let errorMessage = "Unknown error occurred!";
               if (error.error.message){
                errorMessage = error.error.message;
               }
               //Activate a dialog and share the errorMessage to the dialog
               console.log("dialog activated!");
             
                alert(error.error.message);
            //    this.dialog.open(ErrorComponent,{data:{message:"Unknown error occurred!"}});
                return throwError(error);
            })
        );
    }
    

}