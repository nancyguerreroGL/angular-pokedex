import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent} from '../auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
     // {path: 'register', component: RegisterComponent},
      {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    ]

  }
]

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
