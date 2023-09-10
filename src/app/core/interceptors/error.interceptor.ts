import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toast: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(
        (err)=>{
          if(err){
            if(err.status===400){
              this.toast.error(err.error.message,err.error.statusCode);
            }
            if(err.status===401){
              if(err.error.errors){
                throw err.error;
              }
              else{
                this.toast.error(err.error.message,err.error.statusCode);

              }
            }
            if(err.status===404){
              this.router.navigateByUrl('/notfound');
            }
            if(err.status===500){
              const navigationExtra: NavigationExtras={state:{error:err.error}}
            this.router.navigateByUrl('/servererror');
            }
          }
          return throwError(()=>err.message || 'server Not Found');
        }
        )
      )

  }
}
