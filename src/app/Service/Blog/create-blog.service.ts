import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { DropDownItem } from '../../Model/DropdownItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {


  private apiUrl = environment.baseUrl;

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
  GetAllBlog(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAllBlog`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetAllBlogByUserId(userId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAllBlogByUserId?UserId=${userId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetActiveBlog(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetActiveBlog`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetBlogById(blogId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetBlogById?BlogId=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  ChangeStatus(blogId: bigint): Observable<any[]> {
    console.log("ChangeStatus blogId " + blogId);
    return this.http.post<any>(`${this.apiUrl}/ChangeBlogStatus?BlogId=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }
  
  GetBlogDetailById(blogId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetBlogDetailById?BlogId=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  SaveBlogComment(model: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SaveBlogComment`, model, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Post'))
    );
  }
  
  GetBlogCommentById(blogId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetBlogCommentById?BlogId=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetRelatedBlog(blogId: bigint, categoryId : bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetRelatedBlog?BlogId=${blogId}&CategoryId=${categoryId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetPagedBlogList(page: number, pageSize: number, searchQuery: string): Observable<HttpResponse<any>> {
    let params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', pageSize);
    
    if (searchQuery) {
      params = params.set('SearchQuery', searchQuery);
    }

    return this.http.get<any>(`${this.apiUrl}/GetPagedBlogList`, { params, observe: 'response' });
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
