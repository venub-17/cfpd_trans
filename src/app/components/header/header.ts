import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Service } from '../../shared/types';
import { serviceData } from '../../shared/temp/service.data';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn: boolean = false;
  openDropdown: string = '';
  services: Service[] = [];
  ngOnInit(): void {}
  constructor(private translate: TranslateService) {
    this.services = serviceData;

    // Set available languages
    translate.addLangs(['en', 'es']);
    // Set default language
    translate.setDefaultLang('en');
    // Use browser language or fallback to English
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'en');
  }

  switchLanguage(event: any) {
    const lang = event.target.value;
    console.log(lang, 'lang');
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  toggleState: boolean = false;
  onToggleMenu() {
    this.toggleState = !this.toggleState;
  }
  onToggleDropdown(name: string) {
    this.openDropdown = name ? name : '';
  }
}
