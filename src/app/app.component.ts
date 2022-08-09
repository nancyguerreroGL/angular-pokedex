import { Component, OnDestroy, OnInit } from '@angular/core';
import {Store} from './store';
import {AuthService, User} from './auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user$!: Observable<any>;
  subscription!: Subscription
  title = 'my-app';

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select('user')
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async onLogout() {
     await this.authService.logoutUser();
     this.router.navigate(['/auth/login'])
  }

}
