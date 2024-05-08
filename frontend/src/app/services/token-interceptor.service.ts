import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private utilsService: UtilsService,
    private router:Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if(request.headers.get('No-Auth')=== 'True'){
      return next.handle(request.clone());
    }

    const token_data = this.utilsService.getToken();
    if (token_data) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token_data.token_type} ${token_data.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        const error = err.error.message || err.statusText;
        this.router.navigate(['/404']);
        return throwError(error);
      })
    );
  }
}