import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { LoaderComponent } from './shared/modals/loader-component/loader-component';
import { ModalComponent } from './shared/modals/modal-component/modal-component';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, ModalComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('transformer');
}
