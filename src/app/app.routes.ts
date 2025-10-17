import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Hero } from './components/hero/hero';
import { NotFound } from './components/not-found/not-found';
import { Signup } from './components/auth/signup/signup';
import { Sites } from './components/user/sites/sites';
import { VerifyEmail } from './components/auth/verify-email/verify-email';
import { ResetTokenGuard } from './components/auth/resetpwd/reset-token.guard';

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
    path: 'services/:id',
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
    path: 'verify-email',
    component: VerifyEmail,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./components/auth/resetpwd/resetpwd').then((m) => m.Resetpwd),
    canActivate: [ResetTokenGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/auth/forgotpwd/forgotpwd').then((m) => m.Forgotpwd),
  },
  {
    path: 'user-details',
    loadComponent: () =>
      import('./components/user/home-component/home-component').then(
        (m) => m.HomeComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/user/sites/sites').then((m) => m.Sites),
      },
      {
        path: 'site',
        loadComponent: () =>
          import('./components/user/sites/site/site').then((m) => m.Site),
      },
      {
        path: 'transformers',
        loadComponent: () =>
          import('./components/user/transformers/transformers').then(
            (m) => m.Transformers
          ),
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
