import { Application } from '../../model/application';

export interface ApplicationsState {
  applications: Application[];
  loading: boolean;
  error: string | null;
}

