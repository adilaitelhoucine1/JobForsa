import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FavoriteOffer } from '../../model/favorite-offer';
import { FavoriteCardComponent } from '../../components/favorite-card/favorite-card';
import { PageHeader } from '../../components/page-header/page-header';
import * as FavoritesActions from '../../store/favorites/actions.favorites';
import * as FavoritesSelectors from '../../store/favorites/selectors.favorites';
import * as AuthSelectors from '../../store/auth/selectors.auth';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, FavoriteCardComponent, PageHeader],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {
  private store = inject(Store);

  favorites$: Observable<FavoriteOffer[]> = this.store.select(FavoritesSelectors.selectFavorites);
  loading$: Observable<boolean> = this.store.select(FavoritesSelectors.selectFavoritesLoading);
  error$: Observable<string | null> = this.store.select(FavoritesSelectors.selectFavoritesError);

  ngOnInit() {
    this.store.select(AuthSelectors.selectCurrentUser).pipe(take(1)).subscribe(user => {
      if (user?.id) {
        this.store.dispatch(FavoritesActions.loadFavorites({ userId: Number(user.id) }));
      }
    });
  }

  removeFavorite(id: number) {
    this.store.dispatch(FavoritesActions.removeFavorite({ id }));
  }
}

