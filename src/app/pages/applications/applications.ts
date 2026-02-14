import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Application } from '../../model/application';
import { ApplicationCard } from '../../components/application-card/application-card';
import { PageHeader } from '../../components/page-header/page-header';
import * as ApplicationsActions from '../../store/applications/actions.applications';
import * as ApplicationsSelectors from '../../store/applications/selectors.applications';
import * as AuthSelectors from '../../store/auth/selectors.auth';

@Component({
  selector: 'app-applications',
  imports: [CommonModule, ApplicationCard, PageHeader],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications implements OnInit {
  private store = inject(Store);

  applications$: Observable<Application[]> = this.store.select(ApplicationsSelectors.selectApplications);
  loading$: Observable<boolean> = this.store.select(ApplicationsSelectors.selectApplicationsLoading);
  error$: Observable<string | null> = this.store.select(ApplicationsSelectors.selectApplicationsError);

  ngOnInit() {
    this.store.select(AuthSelectors.selectCurrentUser).pipe(take(1)).subscribe(user => {
      if (user?.id) {
        this.store.dispatch(ApplicationsActions.loadApplications({ userId: Number(user.id) }));
      }
    });
  }
}

