import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLogin = true;

  onSwitchAuth() {
    console.log(this.isLogin);
    this.isLogin = !this.isLogin;
  }
}
