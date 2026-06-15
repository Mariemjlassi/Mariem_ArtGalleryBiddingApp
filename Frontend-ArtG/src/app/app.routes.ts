import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/artworks', pathMatch: 'full' },

    {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'artworks',
    loadComponent: () =>
      import('./artworks/artwork-list/artwork-list.component')
        .then(m => m.ArtworkListComponent)
  },
  {
    path: 'artworks/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./artworks/artwork-form/artwork-form.component')
        .then(m => m.ArtworkFormComponent)
  },
  {
    path: 'artworks/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./artworks/artwork-form/artwork-form.component')
        .then(m => m.ArtworkFormComponent)
  },
  {
    path: 'artworks/:id',
    loadComponent: () =>
      import('./artworks/artwork-detail/artwork-detail.component')
        .then(m => m.ArtworkDetailComponent)
  }
];
