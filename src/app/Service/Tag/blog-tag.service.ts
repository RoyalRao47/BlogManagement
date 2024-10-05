import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogTagService {
  private apiUrl = 'http://localhost:5015/api';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'timeout': `${600000}` })
  };

  constructor(private http: HttpClient) { }

  SubmitTag(model: any): Observable<any> {
    console.log("SubmitTag " + JSON.stringify(model));
    return this.http.post<any>(`${this.apiUrl}/SaveTag`, model, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": SubmitTag  " + JSON.stringify(response));
      }),
      catchError(this.handleError<any>('Post'))
    );
  }

  GetTagById(TagId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetTagById?TagId=${TagId}`, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": GetTagById  " + JSON.stringify(response));
      }),
      catchError(this.handleError<any>('Get'))
    );
  }
  
  GetAllTag(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAllTag`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  ChangeStatus(TagId: bigint): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/ChangeTagStatus?TagId=${TagId}`, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": ChangeStatus  " + JSON.stringify(response));
      }),
      catchError(this.handleError<any>('Get'))
    );
  }



  private log(message: string) {
    console.log(new Date() + ': ' + JSON.stringify(message));
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };                                                                                  
  }
}
