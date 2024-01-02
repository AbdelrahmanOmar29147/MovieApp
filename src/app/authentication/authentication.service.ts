import { Injectable } from '@angular/core';
import { AuthenticationModule } from './authentication.module';
import { HttpClient } from '@angular/common/http';
import { FIRE_BASE_API_KEY } from '../environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: AuthenticationModule,
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIRE_BASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  login(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIRE_BASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }
}
