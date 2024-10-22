import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './Component/Login/user-login/user-login.component';
import { CreateUserComponent } from './Component/User/create-user/create-user.component';
import { BlogListingComponent } from './Component/Blog/blog-listing/blog-listing.component';
import { BlogCategoryComponent } from './Component/Blog/blog-category/blog-category.component';
import { BlogTagComponent } from './Component/Blog/blog-tag/blog-tag.component';
import { CreateBlogComponent } from './Component/Blog/create-blog/create-blog.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { BlogDetailComponent } from './home/blog-detail/blog-detail.component';


const routes: Routes = [
  { path: '', component: MainPageComponent }, 
  { path: 'blog-detail/:value', component: BlogDetailComponent }, 
  { path: 'login', component: UserLoginComponent }, 
  { path: 'create-user', component: CreateUserComponent },  
  { path: 'blog-listing', component: BlogListingComponent },  
  { path: 'blog-category', component: BlogCategoryComponent },  
  { path: 'blog-tag', component: BlogTagComponent },
  { path: 'create-blog', component: CreateBlogComponent },  
  { path: 'create-blog/:value', component: CreateBlogComponent },  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
