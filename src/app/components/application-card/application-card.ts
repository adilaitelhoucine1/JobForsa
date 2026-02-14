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

}
