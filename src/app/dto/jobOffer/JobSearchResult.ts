import {JobOffer} from '../../model/offer';

export interface JobSearchResult {
  jobs: JobOffer[];
  totalCount: number;
}
