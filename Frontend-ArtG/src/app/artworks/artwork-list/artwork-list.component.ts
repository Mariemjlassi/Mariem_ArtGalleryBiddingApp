import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ArtworkService } from '../services/artwork.service';
import { Artwork } from '../models/artwork';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-artwork-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './artwork-list.component.html',
  styleUrl: './artwork-list.component.css'
})
export class ArtworkListComponent implements OnInit {

  artworks = signal<Artwork[]>([]);
  loading = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  
  searchQuery = signal('');
  selectedTag = signal('');
  maxPrice = signal<number | null>(null);

  tagOptions = ['painting', 'wall art', 'digital', 'sketch'];

  
  filteredArtworks = computed(() => {
    let result = this.artworks();

    
    if (this.searchQuery()) {
      result = result.filter(a =>
        a.title.toLowerCase().includes(this.searchQuery().toLowerCase())
      );
    }

    
    if (this.selectedTag()) {
      result = result.filter(a =>
        a.tags.includes(this.selectedTag())
      );
    }

    
    if (this.maxPrice() !== null) {
      result = result.filter(a =>
        a.startingPrice <= this.maxPrice()!
      );
    }

    return result;
  });

  constructor(
    private artworkService: ArtworkService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.artworkService.getAll().subscribe({
      next: (data) => { this.artworks.set(data); this.loading.set(false); },
      error: () => { this.errorMsg.set('Erreur chargement'); this.loading.set(false); }
    });
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onTagChange(tag: string): void {
    this.selectedTag.set(this.selectedTag() === tag ? '' : tag);
  }

  onMaxPriceChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.maxPrice.set(val ? +val : null);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedTag.set('');
    this.maxPrice.set(null);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/artworks', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/artworks/edit', id]);
  }

  delete(id: number): void {
    if (!confirm('Supprimer cet artwork ?')) return;
    this.artworkService.delete(id).subscribe({
      next: () => {
        this.artworks.update(list => list.filter(a => a.id !== id));
        this.successMsg.set('Artwork supprimé !');
        setTimeout(() => this.successMsg.set(''), 3000);
      },
      error: () => this.errorMsg.set('Erreur suppression')
    });
  }
}