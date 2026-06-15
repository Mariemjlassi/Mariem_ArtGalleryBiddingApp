
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtworkService } from '../services/artwork.service';
import { SubscriptionService } from '../services/subscription.service';
import { AuthService } from '../../auth/services/auth.service';
import { Artwork } from '../models/artwork';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artwork-detail.component.html',
  styleUrl: './artwork-detail.component.css'
})
export class ArtworkDetailComponent implements OnInit {

  artwork      = signal<Artwork | null>(null);
  loading      = signal(false);
  subscribed   = signal(false);   
  subLoading   = signal(false);   

  constructor(
    private artworkService:      ArtworkService,
    private subscriptionService: SubscriptionService,
    public  authService:         AuthService,
    private route:               ActivatedRoute,
    private router:              Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading.set(true);
    this.artworkService.getById(+id).subscribe({
      next: (data) => {
        this.artwork.set(data);
        this.loading.set(false);

        
        if (this.authService.isLoggedIn()) {
          this.subscriptionService.isSubscribed(+id).subscribe({
            next: (status) => this.subscribed.set(status),
            error: () => {}  
          });
        }
      },
      error: () => this.router.navigate(['/artworks'])
    });
  }

  
  toggleSubscription(): void {
    const art = this.artwork();
    if (!art) return;

    this.subLoading.set(true);

    if (this.subscribed()) {
      this.subscriptionService.unsubscribe(art.id).subscribe({
        next: () => { this.subscribed.set(false); this.subLoading.set(false); },
        error: () => this.subLoading.set(false)
      });
    } else {
      this.subscriptionService.subscribe(art.id).subscribe({
        next: () => { this.subscribed.set(true); this.subLoading.set(false); },
        error: () => this.subLoading.set(false)
      });
    }
  }

  
  isOwner(): boolean {
    return this.authService.getCurrentUserId() === this.artwork()?.ownerId;
  }
}
