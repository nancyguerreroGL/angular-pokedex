import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/**const firebaseConfig = {
  apiKey: "AIzaSyApHiRBNx91xUcmS65By9KKQq-qBjSjV3w",
  authDomain: "angular-pokedex-dff1f.firebaseapp.com",
  databaseURL: "https://angular-pokedex-dff1f-default-rtdb.firebaseio.com",
  projectId: "angular-pokedex-dff1f",
  storageBucket: "angular-pokedex-dff1f.appspot.com",
  messagingSenderId: "174603308728",
  appId: "1:174603308728:web:0a92903de30bc2b2e7ee4d",
  measurementId: "G-GBNQ0GVCC1"
};
 */