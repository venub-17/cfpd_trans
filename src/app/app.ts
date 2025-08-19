import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ModalComponent } from './shared/modal-component/modal-component';
import { LoaderComponent } from './shared/loader-component/loader-component';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, ModalComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('transformer');
}
