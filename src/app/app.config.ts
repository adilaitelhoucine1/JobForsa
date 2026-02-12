import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {authReducer} from './store/auth/reducer.auth';
import {AuthEffects} from './store/auth/effects.auth';
import { usaJobsInterceptor } from './interceptors/usajobs.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([usaJobsInterceptor])
    ),
    provideStore({
      auth:authReducer
      }
    ),
    provideEffects([AuthEffects])
]
};
