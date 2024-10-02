import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Component/Login/user-login/user-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateUserComponent } from './Component/User/create-user/create-user.component';
import { BlogListingComponent } from './Component/Blog/blog-listing/blog-listing.component';
import { BlogCategoryComponent } from './Component/Blog/blog-category/blog-category.component';
import { BlogTagComponent } from './Component/Blog/blog-tag/blog-tag.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    CreateUserComponent,
    BlogListingComponent,
    BlogCategoryComponent,
    BlogTagComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true  // This allows multiple interceptors if you have more
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
