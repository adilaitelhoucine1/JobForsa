import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Application } from '../../model/application';
import * as ApplicationsActions from '../../store/applications/actions.applications';

@Component({
  selector: 'app-application-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})
export class ApplicationCard {
  @Input() application?: Application;

  private store = inject(Store);

  getCompanyInitial(): string {
    return this.application?.company?.charAt(0).toUpperCase() || 'C';
  }

  getDaysAgo(): string {
    if (!this.application?.dateAdded) return '0 days ago';
    const addedDate = new Date(this.application.dateAdded);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - addedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  }

  onStatusChange(status: string) {
    if (this.application?.id) {
      this.store.dispatch(ApplicationsActions.updateApplicationStatus({
        id: this.application.id,
        status
      }));
    }
  }

  onNotesBlur(notes: string) {
    if (this.application?.id) {
      this.store.dispatch(ApplicationsActions.updateApplicationNotes({
        id: this.application.id,
        notes
      }));
    }
  }

  onRemove() {
    if (this.application?.id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature de votre suivi ?')) {
        this.store.dispatch(ApplicationsActions.removeApplication({
          id: this.application.id
        }));
      }
    }
  }

  getStatusColor(): string {
    switch (this.application?.status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'APPLIED': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'INTERVIEW': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-300';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  getStatusIcon(): string {
    switch (this.application?.status) {
      case 'PENDING': return '⏳';
      case 'APPLIED': return '📤';
      case 'INTERVIEW': return '💼';
      case 'ACCEPTED': return '✅';
      case 'REJECTED': return '❌';
      default: return '📋';
    }
  }
}
