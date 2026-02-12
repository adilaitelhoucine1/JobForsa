import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './state.favorites';
import { FavoriteOffer } from '../../model/favorite-offer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectFavorites = createSelector(
  selectFavoritesState,
  (state): FavoriteOffer[] => state?.favorites || []
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state): boolean => state?.loading || false
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state): string | null => state?.error || null
);
