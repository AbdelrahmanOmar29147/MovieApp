import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSubscription!: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.userSubscription = this.authenticationService.user.subscribe(
      (user) => {
        if (user) {
          this.isLoggedIn = true;
        }
      }
    );
  }

  onLogout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
