import { Injectable } from '@angular/core';
import { AuthenticationModule } from './authentication.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ENV } from '../../environments/environment';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData, User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    captchaToken: string
  ) {
    return this.http
      .post<AuthResponseData>(ENV.firebase.port + `/register`, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        token: captchaToken,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.token);
        })
      );
  }

  login(email: string, password: string, captchaToken: string) {
    return this.http
      .post<AuthResponseData>(ENV.firebase.port + `/authenticate`, {
        email: email,
        password: password,
        token: captchaToken,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.token);
        })
      );
  }

  autoLogin() {
    const token = localStorage.getItem('userData');

    if (!token) {
      return;
    }

    const loadedUser = new User(token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/authentication']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(token: string) {
    const user = new User(token);
    this.user.next(user);
    localStorage.setItem('userData', token);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email or password are not correct.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This email or password are not correct.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'All requests from this device are blocked due to unusual activity.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'This user account has been disabled by an administrator.';
        break;
      case '"WEAK_PASSWORD : Password should be at least 6 characters':
        errorMessage = 'Password should be at least 6 characters.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
