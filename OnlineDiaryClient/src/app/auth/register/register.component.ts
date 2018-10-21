import { Component, OnInit } from '@angular/core';
import { users } from '../models/users';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message/message.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: users;
  submitted:boolean=false;
  constructor(
    private authService: AuthService,
    public alertMsg: MessageService,
    private router: Router) {
    this.user = new users();
    this.alertMsg.reset();
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.user)
      .subscribe((data: any) => {
        this.alertMsg.show(data.valid,data.msg);
        if (data.valid) {
          this.reset();
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1000);
          this.submitted = false;
        }
      });
  }

  reset() {
    this.user = new users();
  }
}
