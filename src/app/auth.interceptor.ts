import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserService } from './Service/Login/login-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginUserService: LoginUserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.loginUserService.getToken()  
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });
    return next.handle(authReq);
  }
}
