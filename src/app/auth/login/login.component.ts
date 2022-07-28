import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'pokedex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 form!: FormGroup

  constructor(

  ) { }

 
  ngOnInit(): void {

  }

  loginUser(event: FormGroup) {
    console.log('event', event.value)
  }


}
