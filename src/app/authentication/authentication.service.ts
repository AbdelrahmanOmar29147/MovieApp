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

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        ENV.firebase.baseUrl + `accounts:signUp?key=${ENV.firebase.key}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        ENV.firebase.baseUrl +
          `accounts:signInWithPassword?key=${ENV.firebase.key}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/authentication']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email or password are not correct.';
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
