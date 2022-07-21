import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexDashboardModule } from './pokedex-dashboard/pokedex-dashboard.module';
import { PokedexContainerComponent } from './pokedex-container/pokedex-container.component';
import { AuthModule } from './auth/auth.module';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
@NgModule({
  declarations: [
    AppComponent,
    PokedexContainerComponent,
    InfiniteScrollDirective
  ],
  imports: [
    //angular modules
    BrowserModule,
    AppRoutingModule,
    //custom modules
    PokedexDashboardModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
