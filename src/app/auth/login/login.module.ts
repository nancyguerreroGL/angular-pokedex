import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


import { LoginComponent } from './login.component';

export const ROUTES: Routes = [
   {
    path: 'auth/login',
    children: [ 
      {path: '', component: LoginComponent}
    ]
   }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    SharedModule,

  ],
  declarations: [
    LoginComponent

  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }