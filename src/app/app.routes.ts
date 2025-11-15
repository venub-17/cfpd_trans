import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Hero } from './components/hero/hero';
import { NotFound } from './components/not-found/not-found';
import { Signup } from './components/auth/signup/signup';
import { Sites } from './components/user/sites/sites';
import { VerifyEmail } from './components/auth/verify-email/verify-email';
import { ResetTokenGuard } from './components/auth/resetpwd/reset-token.guard';
import { AboutUs } from './components/about-us/about-us';

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
    path: 'about-us',
    component: AboutUs,
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
    path: 'spotlight',
    loadComponent: () =>
      import('./components/news-spotlight/news-spotlight').then(
        (m) => m.NewsSpotlight
      ),
  },
  {
    path: 'spotlight/details',
    loadComponent: () =>
      import('./components/news-spotlight/spotlightDetails.component').then(
        (m) => m.SpotlightDetailsComponent
      ),
  },
  {
    path: 'products/product-details',
    loadComponent: () =>
      import('./components/products/product-detail/product-detail').then(
        (m) => m.ProductDetail
      ),
  },
  {
    path: 'faq_private',
    loadComponent: () =>
      import('./components/faq-private/faq-private').then((m) => m.FaqPrivate),
  },
  {
    path: 'faq_public',
    loadComponent: () =>
      import('./components/faq-public/faq-public').then((m) => m.FaqPublic),
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
    path: 'reset-password',
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
