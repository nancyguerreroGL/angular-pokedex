import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedComponent } from './shared/shared.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponentComponent } from './auth-component/auth-component.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AuthComponentComponent
  }
]



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SharedComponent,
    AuthComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ], 
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
