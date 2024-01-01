import { Injectable } from '@angular/core';
import { AuthenticationModule } from './authentication.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: AuthenticationModule,
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDl_akTC4eSnoh5CIVV5GdQ0-wIk8jXHWw',
      { email: email, password: password, returnSecureToken: true }
    );
  }
}
