import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: AuthRequest = { email: '', password: '' };

  loading = signal(false);
  errorMsg = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMsg.set('');
    this.loading.set(true);

    this.authService.login(this.form).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/artworks']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? err.error ?? 'Email ou mot de passe incorrect.');
      }
    });
  }
}