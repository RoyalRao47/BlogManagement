import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private apiUrl = 'http://localhost:5015/api';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'timeout': `${600000}` })
  };
  constructor(private http: HttpClient) { }

  submitCreateUser(model: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SaveUser`, model, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": Save User response  " + JSON.stringify(response));
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
