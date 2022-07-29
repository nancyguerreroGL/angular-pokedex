import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 error!: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

 
  ngOnInit(): void {

  }

  async loginUser(event: FormGroup) {
    const {email, password} = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/pokedex'])
    } catch(err: any) {
      this.error = err.message
    }
  }


}
