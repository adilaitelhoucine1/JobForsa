import {UsaJobsItem} from './UsaJobsItem';

export interface UsaJobsResponse {
  SearchResult: {
    SearchResultCount: number;
    SearchResultCountAll: number;
    SearchResultItems: UsaJobsItem[];
  };
}
