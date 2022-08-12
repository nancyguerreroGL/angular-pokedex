import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthFormComponent} from './components/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';


import {AuthService} from './services/auth/auth.service';


@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule
    ],
    declarations: [
      AuthFormComponent
    ],
    exports: [
      AuthFormComponent
    ]
  })
  export class SharedModule {
     static forRoot() : ModuleWithProviders<SharedModule> {
       return {
         ngModule: SharedModule,
         providers: [
          AuthService
         ]
       }
     }
  }