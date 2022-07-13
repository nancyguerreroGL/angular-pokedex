import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedComponent } from './shared/shared.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SharedComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
