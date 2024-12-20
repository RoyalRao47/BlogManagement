import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private apiUrl = environment.baseUrl;
  currentUserId = sessionStorage.getItem('currentUserId');
  token = sessionStorage.getItem('token');

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'timeout': `${600000}` })
  };
  constructor(private http: HttpClient) { }

  getToken(): string {
    console.log("Token  " + this.token);
    console.log("currentUserId  " + this.currentUserId);
    if (this.token != null) {
      return this.token; 
    }
    else {
      return '';  
    }
  }


  loginUser(model: any): Observable<any> {
    console.log(new Date() + ": Login User req  " + JSON.stringify(model));
    return this.http.post<any>(`${this.apiUrl}/login`, model, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": Login User response  " + JSON.stringify(response));
        sessionStorage.setItem('currentUserId', response.userId);
        sessionStorage.setItem('token', response.token);
      }),
      catchError(this.handleError<any>('Post'))
    );
  }

  private log(message: string) {
    console.log(new Date() + ': ' + JSON.stringify(message));
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
     console.log("error ", result);
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  
  }

}
