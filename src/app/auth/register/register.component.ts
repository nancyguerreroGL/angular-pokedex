import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'pokedex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error!: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  async registerUser(event: FormGroup) {
    const {email, password} = event.value;
    try {
      await this.authService.createUser(email, password)
    } catch(err: any) {
      this.error = err.message
    }
  }

}
