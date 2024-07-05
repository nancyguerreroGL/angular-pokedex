import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexDashboardModule } from './pokedex-dashboard/pokedex-dashboard.module';
import { AuthPokedexModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Store } from './store';
import {LoginModule} from './auth/login/login.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    //angular modules
    BrowserModule,
    AppRoutingModule,
    //custom modules
    AuthPokedexModule,
    PokedexDashboardModule,
    LoginModule

  ], 
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
