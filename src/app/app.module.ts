import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { HttpLoaderFactory } from './shared/util';
import {
  RECAPTCHA_V3_SITE_KEY,
  ReCaptchaV3Service,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { ENV } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LanguageSwitcherComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RecaptchaV3Module,
  ],
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: ENV.GOOGLE.RECAPTCHA,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
