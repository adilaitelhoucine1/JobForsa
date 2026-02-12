import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApplicationsService } from '../../services/applicationsService';
import * as ApplicationsActions from './actions.applications';

@Injectable()
export class ApplicationsEffects {
  private actions$ = inject(Actions);
  private applicationsService = inject(ApplicationsService);

  // Load Applications
  loadApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.loadApplications),
      switchMap(({ userId }) =>
        this.applicationsService.getApplications(userId).pipe(
          map((applications) => ApplicationsActions.loadApplicationsSuccess({ applications })),
          catchError((error) =>
            of(ApplicationsActions.loadApplicationsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Add Application
  addApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.addApplication),
      switchMap(({ application }) =>
        this.applicationsService.addApplication(application).pipe(
          map((application) => ApplicationsActions.addApplicationSuccess({ application })),
          catchError((error) =>
            of(ApplicationsActions.addApplicationFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update Application Notes
  updateApplicationNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.updateApplicationNotes),
      switchMap(({ id, notes }) =>
        this.applicationsService.updateApplicationNotes(id, notes).pipe(
          map((application) => ApplicationsActions.updateApplicationNotesSuccess({ application })),
          catchError((error) =>
            of(ApplicationsActions.updateApplicationNotesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update Application Status
  updateApplicationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.updateApplicationStatus),
      switchMap(({ id, status }) =>
        this.applicationsService.updateApplicationStatus(id, status).pipe(
          map((application) => ApplicationsActions.updateApplicationStatusSuccess({ application })),
          catchError((error) =>
            of(ApplicationsActions.updateApplicationStatusFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Remove Application
  removeApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.removeApplication),
      switchMap(({ id }) =>
        this.applicationsService.removeApplication(id).pipe(
          map(() => ApplicationsActions.removeApplicationSuccess({ id })),
          catchError((error) =>
            of(ApplicationsActions.removeApplicationFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

