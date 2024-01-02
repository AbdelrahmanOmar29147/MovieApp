import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authenticationForm!: FormGroup;
  isLogin = true;
  isLoading = false;
  error: string = '';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.authenticationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSwitchAuth() {
    console.log(this.isLogin);
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (!this.authenticationForm.valid) {
      return;
    }

    const { email, password } = this.authenticationForm.value;
    this.isLoading = true;

    if (this.isLogin) {
      this.authenticationService.login(email, password).subscribe({
        next: (data) => {
          console.log(data);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Error logging in';
          console.log(err);
          this.isLoading = false;
        },
      });
    } else {
      this.authenticationService.signup(email, password).subscribe({
        next: (data) => {
          console.log(data);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Error signing up';
          console.log(err);
          this.isLoading = false;
        },
      });
    }

    this.authenticationForm.reset();
  }
}
