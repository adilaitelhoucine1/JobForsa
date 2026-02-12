import { Component, OnInit, inject } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { JobService } from '../../services/jobService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {JobOffer} from '../../model/offer';
import * as FavoritesActions from '../../store/favorites/actions.favorites';
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
    // Load user favorites
    this.store.select(AuthSelectors.selectCurrentUser).subscribe(user => {
      if (user?.id) {
        const userId = Number(user.id);
        console.log('Home: Loading favorites for user:', userId);
        this.store.dispatch(FavoritesActions.loadFavorites({ userId }));
      } else {
        console.log('Home: No user logged in');
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
        this.featuredJobs = result.jobs.slice(0, 6); // Show first 6 jobs
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
