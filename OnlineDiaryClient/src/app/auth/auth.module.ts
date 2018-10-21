import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { Imports } from './../imports';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    Imports
  ],
  declarations: [LoginComponent,AuthComponent, RegisterComponent],
  providers:[AuthService]
})
export class AuthModule { }
