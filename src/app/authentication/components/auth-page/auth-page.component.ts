import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { AuthResponseData } from '../../user.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
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
      authObservable = this.authenticationService.login(email, password);
    } else {
      const { email, password, firstName, lastName } = form.value;
      authObservable = this.authenticationService.signup(
        email,
        password,
        firstName,
        lastName
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
