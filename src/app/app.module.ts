import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Component/Login/user-login/user-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { CreateUserComponent } from './Component/User/create-user/create-user.component';
import { BlogListingComponent } from './Component/Blog/blog-listing/blog-listing.component';
import { BlogCategoryComponent } from './Component/Blog/blog-category/blog-category.component';
import { BlogTagComponent } from './Component/Blog/blog-tag/blog-tag.component';
import { UserHeaderComponent } from './Component/Common/user-header/user-header.component';
import { CreateBlogComponent } from './Component/Blog/create-blog/create-blog.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { BlogDetailComponent } from './home/blog-detail/blog-detail.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { ApiBlogComponent } from './home/api-blog/api-blog.component';
import { ApiblogDetailComponent } from './home/apiblog-detail/apiblog-detail.component';
import { FavApiComponent } from './home/fav-api/fav-api.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    CreateUserComponent,
    BlogListingComponent,
    BlogCategoryComponent,
    BlogTagComponent,
    UserHeaderComponent,
    CreateBlogComponent,
    MainPageComponent,
    BlogDetailComponent,
    ContactUsComponent,
    AboutUsComponent,
    ApiBlogComponent,
    ApiblogDetailComponent,
    FavApiComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,BrowserAnimationsModule,  ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true  // This allows multiple interceptors if you have more
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
