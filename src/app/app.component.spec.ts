import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './components/header/header.component';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, LanguageSwitcherComponent],
      imports: [RouterTestingModule, SharedModule, HttpClientTestingModule],
      providers: [TranslateService, TranslateStore],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
