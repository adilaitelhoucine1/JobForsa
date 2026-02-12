import { FavoriteOffer } from '../../model/favorite-offer';

export interface FavoritesState {
  favorites: FavoriteOffer[];
  loading: boolean;
  error: string | null;
}
