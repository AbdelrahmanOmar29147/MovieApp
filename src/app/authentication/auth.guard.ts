import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate():
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authenticationService.user.pipe(
      take(1),
      map((user) => {
        console.log('first');
        if (!!user) {
          return true;
        }
        return this.router.createUrlTree(['/authentication']);
      })
    );
  }
}
