import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './Component/Login/user-login/user-login.component';
import { CreateUserComponent } from './Component/User/create-user/create-user.component';
import { BlogListingComponent } from './Component/Blog/blog-listing/blog-listing.component';
import { BlogCategoryComponent } from './Component/Blog/blog-category/blog-category.component';


const routes: Routes = [
  { path: '', component: UserLoginComponent }, 
  { path: 'create-user', component: CreateUserComponent },  
  { path: 'blog-listing', component: BlogListingComponent },  
  { path: 'blog-category', component: BlogCategoryComponent },  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
