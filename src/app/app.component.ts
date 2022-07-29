import { Component, OnDestroy, OnInit } from '@angular/core';
import {Store} from './pokedex-dashboard/store';
import {AuthService, User} from './auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;
  subscription!: Subscription
  title = 'my-app';

  constructor(
    private store: Store,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user')
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
