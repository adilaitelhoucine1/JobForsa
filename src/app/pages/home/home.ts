import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobCard } from '../../components/job-card/job-card';
import { JobService } from '../../services/jobService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {JobOffer} from '../../model/offer';
import * as FavoritesActions from '../../store/favorites/actions.favorites';
import * as ApplicationsActions from '../../store/applications/actions.applications';
import * as AuthSelectors from '../../store/auth/selectors.auth';

@Component({
  selector: 'app-home',
  imports: [JobCard, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featuredJobs: JobOffer[] = [];
  loading: boolean = false;
  searchKeyword: string = '';
  searchLocation: string = '';

  private store = inject(Store);

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.store.select(AuthSelectors.selectCurrentUser).pipe(take(1)).subscribe(user => {
      if (user?.id) {
        const userId = Number(user.id);
        this.store.dispatch(FavoritesActions.loadFavorites({ userId }));
        this.store.dispatch(ApplicationsActions.loadApplications({ userId }));
      }
    });

    this.loadFeaturedJobs();
  }

  loadFeaturedJobs(): void {
    this.loading = true;
    this.jobService.searchJobs({
      resultsPerPage: 6
    }).subscribe({
      next: (result) => {
        this.featuredJobs = result.jobs.slice(0, 6);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading featured jobs:', err);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    // Navigate to job-search page with query params
    this.router.navigate(['/jobs'], {
      queryParams: {
        keyword: this.searchKeyword || undefined,
        location: this.searchLocation || undefined
      }
    });
  }
}
