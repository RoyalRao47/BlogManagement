import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { DropDownItem } from '../../Model/DropdownItem';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {

  private apiUrl = 'http://localhost:5015/api';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'timeout': `${600000}` })
  };

  constructor(private http: HttpClient) { }

  getBlogStatus() {
    return [
      new DropDownItem(1, 'Published'),
      new DropDownItem(2, 'Draft'),
      new DropDownItem(3, 'Archived'),
    ];
  }

  SubmitBlog(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SaveBlog`, formData, {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data', // Do NOT set this header, it's handled automatically
      })
    });
  }


  // SubmitBlog(formData: FormData): Observable<any> {
  //   formData.forEach((value, key) => {
  //     console.log("service  " + key + ' : ' + value);
  //   });
  //   return this.http.post<any>(`${this.apiUrl}/SaveBlog`, formData, this.httpOptions).pipe(
  //     tap((response: any) => {
  //       console.log(new Date() + ": SubmitBlog resp " + JSON.stringify(response));
  //     }),
  //     catchError(this.handleError<any>('Post'))
  //   );
  // }





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
