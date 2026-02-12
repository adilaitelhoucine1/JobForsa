import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../model/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private apiUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  // Get all applications for a user
  getApplications(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Add new application (Suivre cette candidature)
  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  // Update application notes
  updateApplicationNotes(id: number, notes: string): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}`, { notes });
  }

  // Update application status
  updateApplicationStatus(id: number, status: string): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}`, { status });
  }

  // Remove application from tracking
  removeApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

