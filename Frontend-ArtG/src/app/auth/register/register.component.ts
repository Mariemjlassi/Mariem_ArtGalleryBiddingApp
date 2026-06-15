import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: RegisterRequest = { name: '', email: '', password: '' };

  loading = signal(false);
  errorMsg = signal('');
  successMsg = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMsg.set('');
    this.successMsg.set('');
    this.loading.set(true);

    this.authService.register(this.form).subscribe({
      next: (msg) => {
        this.loading.set(false);
        this.successMsg.set(msg); 
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? err.error ?? 'Une erreur est survenue.');
      }
    });
  }
}