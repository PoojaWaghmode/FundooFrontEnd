import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './Components/login/login.component'
import {RegistrationComponent} from './Components/registration/registration.component'
import {ForgetPasswordComponent} from './Components/forget-password/forget-password.component'
import {ResetPasswordComponent}from './Components/reset-password/reset-password.component'
import{DashboardComponent} from './Components/dashboard/dashboard.component'
const routes: Routes = [
  { path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{ path: 'login', component: LoginComponent },
{path:'register',component :RegistrationComponent},
{path:'forgetpassword',component:ForgetPasswordComponent},
{path:'resetpassword/:token',component:ResetPasswordComponent},
{path:'dashboard',component:DashboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
