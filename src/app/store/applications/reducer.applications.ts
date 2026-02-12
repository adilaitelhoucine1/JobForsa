import { createReducer, on } from '@ngrx/store';
import * as ApplicationsActions from './actions.applications';
import { ApplicationsState } from './state.applications';

export const initialState: ApplicationsState = {
  applications: [],
  loading: false,
  error: null
};

export const applicationsReducer = createReducer(
  initialState,

  // Load Applications
  on(ApplicationsActions.loadApplications, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ApplicationsActions.loadApplicationsSuccess, (state, { applications }) => ({
    ...state,
    applications,
    loading: false,
    error: null
  })),

  on(ApplicationsActions.loadApplicationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Application
  on(ApplicationsActions.addApplication, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ApplicationsActions.addApplicationSuccess, (state, { application }) => ({
    ...state,
    applications: [...state.applications, application],
    loading: false,
    error: null
  })),

  on(ApplicationsActions.addApplicationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Application Notes
  on(ApplicationsActions.updateApplicationNotes, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ApplicationsActions.updateApplicationNotesSuccess, (state, { application }) => ({
    ...state,
    applications: state.applications.map(app =>
      app.id === application.id ? application : app
    ),
    loading: false,
    error: null
  })),

  on(ApplicationsActions.updateApplicationNotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Application Status
  on(ApplicationsActions.updateApplicationStatus, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ApplicationsActions.updateApplicationStatusSuccess, (state, { application }) => ({
    ...state,
    applications: state.applications.map(app =>
      app.id === application.id ? application : app
    ),
    loading: false,
    error: null
  })),

  on(ApplicationsActions.updateApplicationStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Remove Application
  on(ApplicationsActions.removeApplication, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ApplicationsActions.removeApplicationSuccess, (state, { id }) => ({
    ...state,
    applications: state.applications.filter(app => app.id !== id),
    loading: false,
    error: null
  })),

  on(ApplicationsActions.removeApplicationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

