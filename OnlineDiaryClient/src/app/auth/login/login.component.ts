import { Component, OnInit } from '@angular/core';
import { users } from '../models/users';
import { AuthService } from '../services/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: users;
  submitted:boolean=false;
  constructor(
    private authService: AuthService,
    private storage:StorageService,
    public alertService:MessageService,
    private router:Router
    ) {
    this.initVariables();
  }

  ngOnInit() {
  }

  initVariables() {
    this.user = new users();
    this.alertService.reset();
  }

  login() {
    this.authService.login(this.user)
      .subscribe(data => {
        if(data.valid){
          let result:any = {
            user:data.response,
            token:data.response.token
          }
          this.storage.removeAll();
          this.storage.set('user',result);
        }
        this.alertService.show(data.valid,data.msg)
        this.submitted = false;
        this.router.navigate(['/user/dashboard']);
      },err=>{
        this.alertService.show(false,err.error.msg)
        this.submitted = false;
      });
  }
  
}
