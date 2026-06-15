// artworks/services/artwork.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artwork, ArtworkRequest } from '../models/artwork';


@Injectable({ providedIn: 'root' })
export class ArtworkService {

  private apiUrl = 'http://localhost:9090/api/artworks';

  private http = inject(HttpClient);

  getAll(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.apiUrl);
  }

  getById(id: number): Observable<Artwork> {
    return this.http.get<Artwork>(`${this.apiUrl}/${id}`);
  }

  create(data: ArtworkRequest): Observable<Artwork> {
    return this.http.post<Artwork>(this.apiUrl, data);
  }

  update(id: number, data: ArtworkRequest): Observable<Artwork> {
    return this.http.put<Artwork>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}