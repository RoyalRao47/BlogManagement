import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './Component/Login/user-login/user-login.component';
import { CreateUserComponent } from './Component/User/create-user/create-user.component';


const routes: Routes = [
  { path: '', component: UserLoginComponent }, 
  { path: 'create-user', component: CreateUserComponent },  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
