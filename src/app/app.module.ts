import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexDashboardModule } from './pokedex-dashboard/pokedex-dashboard.module';
import { PokedexContainerComponent } from './pokedex-container/pokedex-container.component';
import { AuthFromComponent } from './auth-from/auth-from.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexContainerComponent,
    AuthFromComponent
  ],
  imports: [
    //angular modules
    BrowserModule,
    AppRoutingModule,
    //custom modules
    PokedexDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
