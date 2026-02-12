import { Component, OnInit } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { JobService } from '../../services/jobService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {JobOffer} from '../../model/offer';

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

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
