import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedComponent } from './shared/shared.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SharedComponent
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
