import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ModalComponent } from './shared/modal-component/modal-component';
import { LoaderComponent } from './shared/loader-component/loader-component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    RouterOutlet,
    Footer,
    ModalComponent,
    LoaderComponent,
    TranslateModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private translate: TranslateService) {
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
}
