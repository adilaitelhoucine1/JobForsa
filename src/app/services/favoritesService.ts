import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteOffer } from '../model/favorite-offer';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/favoritesOffers';

  constructor(private http: HttpClient) {}

  getFavorites(userId: number): Observable<FavoriteOffer[]> {
    return this.http.get<FavoriteOffer[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addFavorite(favorite: FavoriteOffer): Observable<FavoriteOffer> {
    return this.http.post<FavoriteOffer>(this.apiUrl, favorite);
  }

  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

