import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {

  private apiUrl = 'http://localhost:5015/api';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'timeout': `${600000}` })
  };

  constructor(private http: HttpClient) { }

  SubmitCategory(model: any): Observable<any> {
    console.log("SubmitCategory " + JSON.stringify(model));
    return this.http.post<any>(`${this.apiUrl}/SaveCategory`, model, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": SubmitCategory  " + JSON.stringify(response));
      }),
      catchError(this.handleError<any>('Post'))
    );
  }

  GetCategoryById(categoryId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetCategoryById?CategoryId=${categoryId}`, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": GetIncomeSourceById  " + JSON.stringify(response));
      }),
      catchError(this.handleError<any>('Get'))
    );
  }
  
  GetAllCategory(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAllCategory`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  ChangeStatus(categoryId: bigint): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/ChangeCategoryStatus?CategoryId=${categoryId}`, this.httpOptions).pipe(
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
