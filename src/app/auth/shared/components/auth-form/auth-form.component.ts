import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder
  ) { }
  form!: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
     email: ['', Validators.email],
     password: ['', Validators.required]
   })
 
   }
 
   onSubmit() {
    if(this.form.valid) {
      this.submitted.emit(this.form)
    }
     
   }
 
   get f(): { [key: string]: AbstractControl } {
     return this.form.controls;
   }

}
