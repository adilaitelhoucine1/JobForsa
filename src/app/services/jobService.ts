import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {JobSearchResult} from '../dto/jobOffer/JobSearchResult';
import {JobSearchParams} from '../dto/jobOffer/JobSearchParams';
import {JobOffer} from '../model/offer';
import {UsaJobsResponse} from '../dto/jobOffer/UsaJobsResponse';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://data.usajobs.gov/api/Search';

  constructor(private http: HttpClient) {}


  searchJobs(searchParams: JobSearchParams = {}): Observable<JobSearchResult> {
     let params = new HttpParams();

    if (searchParams.keyword) {
      params = params.set('Keyword', searchParams.keyword);
    }

    if (searchParams.location) {
      params = params.set('LocationName', searchParams.location);
    }

     const page = searchParams.page ?? 1;
    params = params.set('Page', page.toString());
     const resultsPerPage = searchParams.resultsPerPage ?? 4;
    params = params.set('ResultsPerPage', resultsPerPage.toString());

    return this.http.get<UsaJobsResponse>(this.apiUrl, { params }).pipe(
      map((data) => {
        const items = data?.SearchResult?.SearchResultItems ?? [];
        const totalCount = data?.SearchResult?.SearchResultCountAll ?? 0;

        const jobs: JobOffer[] = items.map((item) => {
          const d = item.MatchedObjectDescriptor;
          const pay = d.PositionRemuneration?.[0];
          const salary = pay
            ? `$${pay.MinimumRange} - $${pay.MaximumRange} ${pay.Description}`.trim()
            : undefined;

          return {
            id: item.MatchedObjectId,
            title: d.PositionTitle ?? '',
            company: d.OrganizationName ?? '',
            location: d.PositionLocationDisplay ?? '',
            date: d.PublicationStartDate ?? '',
            description: d.UserArea?.Details?.JobSummary ?? d.QualificationSummary ?? '',
            salary,
            url: d.PositionURI ?? d.ApplyURI?.[0] ?? '',
          };
        });
        return { jobs, totalCount };
      })
    );
  }

}

