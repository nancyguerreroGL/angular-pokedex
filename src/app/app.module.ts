import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexDashboardModule } from './pokedex-dashboard/pokedex-dashboard.module';
import { PokedexContainerComponent } from './pokedex-container/pokedex-container.component';
import { AuthPokedexModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';





@NgModule({
  declarations: [
    AppComponent,
    PokedexContainerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    //angular modules
    BrowserModule,
    AppRoutingModule,
    //custom modules
    PokedexDashboardModule,
    AuthPokedexModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
