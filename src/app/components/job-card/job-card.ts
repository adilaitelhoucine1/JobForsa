import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { JobOffer } from '../../model/offer';
import { FavoriteOffer } from '../../model/favorite-offer';
import * as FavoritesActions from '../../store/favorites/actions.favorites';
import * as FavoritesSelectors from '../../store/favorites/selectors.favorites';
import * as AuthSelectors from '../../store/auth/selectors.auth';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css'
})
export class JobCard implements OnInit {
  @Input() job?: JobOffer;
  @Output() applyClicked = new EventEmitter<JobOffer>();

  private store = inject(Store);
  isFavorite$!: Observable<boolean>;
  private currentUserId: number | null = null;

  ngOnInit() {
    // Get current user ID
    this.store.select(AuthSelectors.selectCurrentUser).subscribe(user => {
      this.currentUserId = user?.id ? Number(user.id) : null;
    });

    // Check if this job is in favorites - this will update reactively
    this.isFavorite$ = this.store.select(FavoritesSelectors.selectFavorites).pipe(
      map(favorites => {
        const isFav = favorites.some(fav => fav.offerId === this.job?.id);
        console.log(`Job ${this.job?.id} is favorite:`, isFav, 'Favorites count:', favorites.length);
        return isFav;
      })
    );
  }

  getCompanyInitial(): string {
    return this.job?.company?.charAt(0).toUpperCase() || 'C';
  }

  getDaysAgo(): string {
    if (!this.job?.date) return '0 days ago';
    const postedDate = new Date(this.job.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  }

  toggleFavorite(): void {
    if (!this.job || !this.currentUserId) {
      console.log('Cannot toggle favorite: missing job or user', { job: this.job?.id, userId: this.currentUserId });
      return;
    }

    // Use take(1) to get current value and auto-unsubscribe
    this.store.select(FavoritesSelectors.selectFavorites).pipe(take(1)).subscribe(favorites => {
      const favoritesList: FavoriteOffer[] = favorites as FavoriteOffer[] || [];
      const existingFavorite = favoritesList.find((f: FavoriteOffer) => f.offerId === this.job?.id);

      if (existingFavorite) {
        // Already in favorites - button should be disabled, so this shouldn't be called
        console.log('Job already in favorites:', existingFavorite.id);
        return;
      }

      // Add to favorites
      const favorite: FavoriteOffer = {
        userId: this.currentUserId!,
        offerId: this.job!.id,
        title: this.job!.title,
        company: this.job!.company,
        location: this.job!.location
      };
      console.log('Adding favorite:', favorite);
      this.store.dispatch(FavoritesActions.addFavorite({ favorite }));
    });
  }

  onApply(): void {
    if (this.job) {
      this.applyClicked.emit(this.job);
    }
  }
}
