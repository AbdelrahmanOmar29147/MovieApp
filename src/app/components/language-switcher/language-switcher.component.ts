import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent implements OnInit {
  language!: string | null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.language = localStorage.getItem('language');
    this.checkLanguage();
  }

  checkLanguage() {
    this.language
      ? this.switchLanguage(this.language)
      : this.switchLanguage('en-US');
  }

  switchLanguage(language: string) {
    localStorage.setItem('language', language);
    this.language = language;
    this.translate.use(language);
    this.handleCSS();
  }

  handleCSS() {
    if (this.language === 'ar-AE') {
      this.document.getElementsByTagName('html')[0].dir = 'rtl';
      this.document.getElementsByTagName('html')[0].lang = 'ar';
    } else {
      this.document.getElementsByTagName('html')[0].dir = 'ltr';
      this.document.getElementsByTagName('html')[0].lang = 'en';
    }
  }
}
