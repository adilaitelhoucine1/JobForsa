import {Component, OnInit, signal} from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';
import { JobService   } from '../../services/jobService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {JobOffer} from '../../model/offer';
import {JobSearchParams} from '../../dto/jobOffer/JobSearchParams';
import {sign} from 'node:crypto';
import * as fs from 'node:fs';

@Component({
  selector: 'app-job-search',
  imports: [JobCard, CommonModule, FormsModule],
  templateUrl: './job-search.html',
  styleUrl: './job-search.css'
})
export class JobSearch implements OnInit {
  jobs: JobOffer[] = [];
  totalCount: number = 0;
  loading  =signal(false);
  error: string | null = null;

   keyword: string = '';
  location: string = '';
  currentPage: number = 1;
  resultsPerPage: number = 10;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      if (params['keyword']) {
        this.keyword = params['keyword'];
      }
      if (params['location']) {
        this.location = params['location'];
      }
      this.searchJobs();
    });
  }

  searchJobs(): void {
    this.loading.set(true) ;
    this.error = null;

    const searchParams: JobSearchParams = {
      keyword: this.keyword,
      location: this.location,
      page: this.currentPage,
      resultsPerPage: this.resultsPerPage
    };

    this.jobService.searchJobs(searchParams).subscribe({
      next: (result) => {
        this.jobs = result.jobs;
        this.totalCount = result.totalCount;
        this.loading.set(false) ;
       },
      error: (err) => {
        this.error = 'Failed to load jobs. Please try again later.';
        this.loading.set(false) ;
        console.error('Error fetching jobs:', err);
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.searchJobs();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchJobs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.resultsPerPage);
  }
}
