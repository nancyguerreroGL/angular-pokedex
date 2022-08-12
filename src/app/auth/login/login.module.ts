import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


import { LoginComponent } from './login.component';

export const ROUTES: Routes = [
    {path: '', component: LoginComponent}
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

  ]
})
export class LoginModule { }