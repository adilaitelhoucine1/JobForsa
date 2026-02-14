import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { JobOffer } from '../../model/offer';
import { FavoriteOffer } from '../../model/favorite-offer';
import { Application } from '../../model/application';
import { ApplicationStatus } from '../../model/enum/ApplicationStatus';
import * as FavoritesActions from '../../store/favorites/actions.favorites';
import * as FavoritesSelectors from '../../store/favorites/selectors.favorites';
import * as ApplicationsActions from '../../store/applications/actions.applications';
import * as ApplicationsSelectors from '../../store/applications/selectors.applications';
import * as AuthSelectors from '../../store/auth/selectors.auth';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css'
})
export class JobCard implements OnInit {
  @Input() job?: JobOffer;

  private store = inject(Store);
  isFavorite$!: Observable<boolean>;
  isTracked$!: Observable<boolean>;
  private currentUserId: number | null = null;
  isAuthenticated$!: Observable<boolean>;

  ngOnInit() {
    this.store.select(AuthSelectors.selectCurrentUser).pipe(take(1)).subscribe(user => {
      this.currentUserId = user?.id ? Number(user.id) : null;
    });

    this.isAuthenticated$ = this.store.select(AuthSelectors.selectCurrentUser).pipe(
      map(user => !!user)
    );

    this.isFavorite$ = this.store.select(FavoritesSelectors.selectFavorites).pipe(
      map(favorites => favorites.some(fav => fav.offerId === this.job?.id))
    );

    // Check if this job is already tracked in applications
    this.isTracked$ = this.store.select(ApplicationsSelectors.selectApplications).pipe(
      map(applications => applications.some(app => app.offerId === this.job?.id))
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
      return;
    }

    this.store.select(FavoritesSelectors.selectFavorites).pipe(take(1)).subscribe(favorites => {
      const favoritesList: FavoriteOffer[] = favorites as FavoriteOffer[] || [];
      const existingFavorite = favoritesList.find((f: FavoriteOffer) => f.offerId === this.job?.id);

      if (existingFavorite) {
        return;
      }

      const favorite: FavoriteOffer = {
        userId: this.currentUserId!,
        offerId: this.job!.id,
        title: this.job!.title,
        company: this.job!.company,
        location: this.job!.location
      };
      this.store.dispatch(FavoritesActions.addFavorite({ favorite }));
    });
  }

  trackApplication(): void {
    if (!this.job || !this.currentUserId) {
      return;
    }

    this.store.select(ApplicationsSelectors.selectApplications).pipe(take(1)).subscribe(applications => {
      const existingApplication = applications.find(app => app.offerId === this.job?.id);

      if (existingApplication) {
        return; // Already tracked
      }

      const application: Application = {
        userId: this.currentUserId!,
        offerId: this.job!.id,
        apiSource: 'USAJobs',
        title: this.job!.title,
        company: this.job!.company,
        location: this.job!.location,
        url: this.job!.url || '',
        status: ApplicationStatus.PENDING,
        notes: '',
        dateAdded: new Date().toISOString()
      };
      this.store.dispatch(ApplicationsActions.addApplication({ application }));
    });
  }

  onApplyClick(): void {
    // Automatically track the application when user clicks Apply Now
    this.trackApplication();
  }
}
