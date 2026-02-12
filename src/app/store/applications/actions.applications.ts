import { createAction, props } from '@ngrx/store';
import { Application } from '../../model/application';

 export const loadApplications = createAction(
  '[Applications] Load Applications',
  props<{ userId: number }>()
);

export const loadApplicationsSuccess = createAction(
  '[Applications] Load Applications Success',
  props<{ applications: Application[] }>()
);

export const loadApplicationsFailure = createAction(
  '[Applications] Load Applications Failure',
  props<{ error: string }>()
);

// Add Application (Suivre cette candidature)
export const addApplication = createAction(
  '[Applications] Add Application',
  props<{ application: Application }>()
);

export const addApplicationSuccess = createAction(
  '[Applications] Add Application Success',
  props<{ application: Application }>()
);

export const addApplicationFailure = createAction(
  '[Applications] Add Application Failure',
  props<{ error: string }>()
);

 export const updateApplicationNotes = createAction(
  '[Applications] Update Application Notes',
  props<{ id: number; notes: string }>()
);

export const updateApplicationNotesSuccess = createAction(
  '[Applications] Update Application Notes Success',
  props<{ application: Application }>()
);

export const updateApplicationNotesFailure = createAction(
  '[Applications] Update Application Notes Failure',
  props<{ error: string }>()
);

 export const updateApplicationStatus = createAction(
  '[Applications] Update Application Status',
  props<{ id: number; status: string }>()
);

export const updateApplicationStatusSuccess = createAction(
  '[Applications] Update Application Status Success',
  props<{ application: Application }>()
);

export const updateApplicationStatusFailure = createAction(
  '[Applications] Update Application Status Failure',
  props<{ error: string }>()
);

 export const removeApplication = createAction(
  '[Applications] Remove Application',
  props<{ id: number }>()
);

export const removeApplicationSuccess = createAction(
  '[Applications] Remove Application Success',
  props<{ id: number }>()
);

export const removeApplicationFailure = createAction(
  '[Applications] Remove Application Failure',
  props<{ error: string }>()
);

