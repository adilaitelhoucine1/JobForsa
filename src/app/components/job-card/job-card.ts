import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JobOffer} from '../../model/offer';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css'
})
export class JobCard {
  @Input() job?: JobOffer;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggled = new EventEmitter<JobOffer>();
  @Output() applyClicked = new EventEmitter<JobOffer>();

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
    if (this.job) {
      this.favoriteToggled.emit(this.job);
    }
  }

  onApply(): void {
    if (this.job) {
      this.applyClicked.emit(this.job);
    }
  }
}
