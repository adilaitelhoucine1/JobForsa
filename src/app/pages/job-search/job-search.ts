import { Component } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';

@Component({
  selector: 'app-job-search',
  imports: [JobCard],
  templateUrl: './job-search.html',
  styleUrl: './job-search.css'
})
export class JobSearch {}
