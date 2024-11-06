import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiBlogService {

  private apiUrl = environment.baseUrl;;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'timeout': `${600000}` })
  };

  constructor(private http: HttpClient) { }

  GetAllApiBlog(tagName: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetApiBlog?tag=${tagName}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }


  GetApiBlogById(BlogId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetApiBlogById?BlogId=${BlogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  SaveFavApiBlog(model: any): Observable<any> {
    console.log("SaveFavApiBlog " + JSON.stringify(model));
    return this.http.post<any>(`${this.apiUrl}/SaveFavApiBlog`, model, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(new Date() + ": SaveFavApiBlog  " + JSON.stringify(response));
      }),
      catchError(this.handleError<any>('Post'))
    );
  }
  
  GetFavApiBlog(userId: any): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetFavApiBlog?userId=${userId}`, this.httpOptions).pipe(
      tap((response: any) => {
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
