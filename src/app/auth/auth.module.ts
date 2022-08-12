import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../../environments/environment';

import { SharedModule } from './shared/shared.module';

const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
      {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    ]

  }
]



@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),

  ]
})
export class AuthPokedexModule { }
