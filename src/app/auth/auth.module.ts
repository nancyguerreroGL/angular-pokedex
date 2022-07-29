import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent} from '../auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { SharedModule } from './shared/shared.module';

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

export const firebaseConfig = {
  apiKey: "AIzaSyApHiRBNx91xUcmS65By9KKQq-qBjSjV3w",
  authDomain: "angular-pokedex-dff1f.firebaseapp.com",
  databaseURL: "https://angular-pokedex-dff1f-default-rtdb.firebaseio.com",
  projectId: "angular-pokedex-dff1f",
  storageBucket: "angular-pokedex-dff1f.appspot.com",
  messagingSenderId: "174603308728",
  appId: "1:174603308728:web:0a92903de30bc2b2e7ee4d",
  measurementId: "G-GBNQ0GVCC1"
};

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),

  ]
})
export class AuthPokedexModule { }
