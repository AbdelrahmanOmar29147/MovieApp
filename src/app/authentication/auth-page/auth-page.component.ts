import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { AuthResponseData } from '../user.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  authenticationForm!: FormGroup;
  userSubscription!: Subscription;
  isLogin = true;
  isLoading = false;
  error: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.userSubscription = this.authenticationService.user.subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }

  private initForm() {
    this.authenticationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),
      ]),
    });
  }

  onSwitchAuth() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (!this.authenticationForm.valid) {
      return;
    }

    const { email, password } = this.authenticationForm.value;
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLogin) {
      authObservable = this.authenticationService.login(email, password);
    } else {
      authObservable = this.authenticationService.signup(email, password);
    }

    authObservable.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err;
      },
    });
    this.authenticationForm.reset();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
