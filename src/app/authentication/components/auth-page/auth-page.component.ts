import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { AuthResponseData } from '../../user.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ENV } from '../../../../environments/environment';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  userSubscription!: Subscription;
  isLogin = true;
  isLoading = false;
  error: string = '';
  key: string = ENV.GOOGLE.RECAPTCHA;
  captchaToken!: string;
  isCaptchaAuthenticated = false;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticatedNavigation();
  }

  authenticatedNavigation() {
    this.userSubscription = this.authenticationService.user.subscribe(
      (data) => {
        data && this.router.navigate(['/catalog']);
      }
    );
  }
  onSwitchAuth() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLogin) {
      const { email, password } = form.value;
      authObservable = this.authenticationService.login(
        email,
        password,
        this.captchaToken
      );
    } else {
      const { email, password, firstName, lastName } = form.value;
      authObservable = this.authenticationService.signup(
        email,
        password,
        firstName,
        lastName,
        this.captchaToken
      );
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
    form.reset();
  }

  send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.isCaptchaAuthenticated = true;

    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.log(token);
        this.captchaToken = token;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
