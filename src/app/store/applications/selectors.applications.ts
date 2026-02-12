import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationsState } from './state.applications';
import { Application } from '../../model/application';

export const selectApplicationsState = createFeatureSelector<ApplicationsState>('applications');

export const selectApplications = createSelector(
  selectApplicationsState,
  (state): Application[] => state?.applications || []
);

export const selectApplicationsLoading = createSelector(
  selectApplicationsState,
  (state): boolean => state?.loading || false
);

export const selectApplicationsError = createSelector(
  selectApplicationsState,
  (state): string | null => state?.error || null
);

// Select applications by status
export const selectApplicationsByStatus = (status: string) => createSelector(
  selectApplications,
  (applications) => applications.filter(app => app.status === status)
);

// Select application by ID
export const selectApplicationById = (id: number) => createSelector(
  selectApplications,
  (applications) => applications.find(app => app.id === id)
);

// Count total applications
export const selectApplicationsCount = createSelector(
  selectApplications,
  (applications) => applications.length
);

