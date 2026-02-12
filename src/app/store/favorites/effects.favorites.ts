import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { FavoritesService } from '../../services/favoritesService';
import * as FavoritesActions from './actions.favorites';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private favoritesService = inject(FavoritesService);

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      switchMap(({ userId }) =>
        this.favoritesService.getFavorites(userId).pipe(
          map((favorites) => FavoritesActions.loadFavoritesSuccess({ favorites })),
          catchError((error) =>
            of(FavoritesActions.loadFavoritesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      switchMap(({ favorite }) =>
        this.favoritesService.addFavorite(favorite).pipe(
          map((favorite) => FavoritesActions.addFavoriteSuccess({ favorite })),
          catchError((error) =>
            of(FavoritesActions.addFavoriteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.removeFavorite),
      switchMap(({ id }) =>
        this.favoritesService.removeFavorite(id).pipe(
          map(() => FavoritesActions.removeFavoriteSuccess({ id })),
          catchError((error) =>
            of(FavoritesActions.removeFavoriteFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

