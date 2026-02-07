import { Component } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';

@Component({
  selector: 'app-home',
  imports: [JobCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
