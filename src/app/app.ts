import { Component, signal, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Store } from '@ngrx/store';
import { AuthService } from './services/authService';
import * as AuthActions from './store/auth/actions.auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('JobForsa');

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    // afterNextRender only runs in the browser, never during SSR
    afterNextRender(() => {
      const user = this.authService.getUserFromStorage();
      if (user) {
        this.store.dispatch(AuthActions.loadUserFromStorage({ user }));
      }
    });
  }
}
