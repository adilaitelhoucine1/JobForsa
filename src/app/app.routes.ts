import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { JobSearch } from './pages/job-search/job-search';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Favorites } from './pages/favorites/favorites';
import { Applications } from './pages/applications/applications';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'jobs', component: JobSearch },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'favorites', component: Favorites },
  { path: 'applications', component: Applications },
  { path: 'profile', component: Profile }
];
