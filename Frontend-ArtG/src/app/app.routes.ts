import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/artworks', pathMatch: 'full' },
  {
    path: 'artworks',
    loadComponent: () =>
      import('./artworks/artwork-list/artwork-list.component')
        .then(m => m.ArtworkListComponent)
  },
  {
    path: 'artworks/new',
    loadComponent: () =>
      import('./artworks/artwork-form/artwork-form.component')
        .then(m => m.ArtworkFormComponent)
  },
  {
    path: 'artworks/edit/:id',
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
