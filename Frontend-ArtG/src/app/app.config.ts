import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers:  [
    provideRouter(routes),
    provideHttpClient(),
    
  ]
};

