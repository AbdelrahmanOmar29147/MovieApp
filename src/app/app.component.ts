import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.autoLogin();
  }
}
