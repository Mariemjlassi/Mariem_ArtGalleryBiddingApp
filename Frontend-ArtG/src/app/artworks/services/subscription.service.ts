import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

  private readonly API = 'http://localhost:9090/api/subscriptions';
  private http = inject(HttpClient);

  // S'abonner à une enchère
  subscribe(artworkId: number): Observable<string> {
    return this.http.post(`${this.API}/${artworkId}`, {}, { responseType: 'text' });
  }

  // Se désabonner
  unsubscribe(artworkId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${artworkId}`);
  }

  // Vérifier si l'utilisateur est déjà abonné
  isSubscribed(artworkId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.API}/${artworkId}/status`);
  }
}
