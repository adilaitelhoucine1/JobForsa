import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/authService';
import * as AuthActions from './actions.auth';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService.register(action.payload).pipe(
          map((user) => AuthActions.registerSuccess({ user })),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      switchMap(({ userId, userData }) =>
        this.authService.updateProfile(userId, userData).pipe(
          map(user => AuthActions.updateProfileSuccess({ user })),
          catchError(error => of(AuthActions.updateProfileFailure({ error: error.message })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.clearStorage();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );
}
