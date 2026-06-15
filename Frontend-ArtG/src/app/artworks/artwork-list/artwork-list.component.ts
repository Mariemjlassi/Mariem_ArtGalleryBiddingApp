import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ArtworkService } from '../services/artwork.service';
import { Artwork } from '../models/artwork';


@Component({
  selector: 'app-artwork-list',
  imports: [CommonModule, RouterModule],
  providers: [],
  standalone: true,
  templateUrl: './artwork-list.component.html',
  styleUrl: './artwork-list.component.css'
})
export class ArtworkListComponent implements OnInit {

  artworks = signal<Artwork[]>([]);
  loading = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  constructor(
    private artworkService: ArtworkService,
    private router: Router
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
