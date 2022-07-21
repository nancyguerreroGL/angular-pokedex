import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/login/login.component'

const routes: Routes = [
   {path: '', redirectTo:'/pokedex', pathMatch: 'full'},
   {path:'login', loadChildren: () => import('./pokedex-container/pokedex-container.component').then(m => m.PokedexContainerComponent)},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
