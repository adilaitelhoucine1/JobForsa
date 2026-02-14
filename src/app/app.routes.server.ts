import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'jobs',
    renderMode: RenderMode.Server
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  // Protected routes - use Client Side Rendering to avoid SSR auth issues
  {
    path: 'favorites',
    renderMode: RenderMode.Client
  },
  {
    path: 'applications',
    renderMode: RenderMode.Client
  },
  {
    path: 'profile',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
