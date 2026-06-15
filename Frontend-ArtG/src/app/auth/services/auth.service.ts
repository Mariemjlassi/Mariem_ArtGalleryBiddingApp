import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthRequest, AuthResponse, RegisterRequest } from '../models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:9090/api/auth';
  private readonly TOKEN_KEY = 'jwt_token';

  // Reactive signals for current session
  currentUser = signal<{ id: number; name: string; wallet: number } | null>(this.loadSession());

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: RegisterRequest): Observable<string> {
    return this.http.post(`${this.API}/register`, payload, { responseType: 'text' });
  }

  login(payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, payload).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem('user_id', String(res.userId));
        localStorage.setItem('user_name', res.name);
        localStorage.setItem('user_wallet', String(res.wallet));
        this.currentUser.set({ id: res.userId, name: res.name, wallet: res.wallet });
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_wallet');
    this.currentUser.set(null);
    this.router.navigate(['/artworks']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUserId(): number | null {
    const id = localStorage.getItem('user_id');
    return id ? Number(id) : null;
  }

  private loadSession(): { id: number; name: string; wallet: number } | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const name = localStorage.getItem('user_name');
    if (!token || !name) return null;
    const id = Number(localStorage.getItem('user_id') ?? 0);
    const wallet = Number(localStorage.getItem('user_wallet') ?? 0);
    return { id, name, wallet };
  }
}