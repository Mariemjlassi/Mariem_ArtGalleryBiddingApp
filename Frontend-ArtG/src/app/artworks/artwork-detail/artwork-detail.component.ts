
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtworkService } from '../services/artwork.service';
import { Artwork } from '../models/artwork';


@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artwork-detail.component.html',
  styleUrl: './artwork-detail.component.css'
})
export class ArtworkDetailComponent implements OnInit {

  artwork = signal<Artwork | null>(null);
  loading = signal(false);

  constructor(
    private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading.set(true);
      this.artworkService.getById(+id).subscribe({
        next: (data) => { this.artwork.set(data); this.loading.set(false); },
        error: () => this.router.navigate(['/artworks'])
      });
    }
  }
}