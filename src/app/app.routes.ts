import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';
import { VisiteurGuard } from './guard/visiteur-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./pages/job-search/job-search').then(m => m.JobSearch)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
   },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register),
   canActivate: [VisiteurGuard]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites').then(m => m.Favorites),
    canActivate: [AuthGuard]
  },
  {
    path: 'applications',
    loadComponent: () => import('./pages/applications/applications').then(m => m.Applications),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [AuthGuard]
  },
];
