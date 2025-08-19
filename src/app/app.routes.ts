import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Hero } from './components/hero/hero';
import { NotFound } from './components/not-found/not-found';
import { Signup } from './components/auth/signup/signup';

export const routes: Routes = [
  {
    path: '',
    component: Hero,
  },
  {
    path: 'home',
    component: Hero,
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products').then((m) => m.Products),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./components/services-component/services-component').then(
        (m) => m.ServicesComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contacts/contacts').then((m) => m.Contacts),
  },
  {
    path: 'products/product-details',
    loadComponent: () =>
      import('./components/products/product-detail/product-detail').then(
        (m) => m.ProductDetail
      ),
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: '**',
    component: NotFound,
  },
];
