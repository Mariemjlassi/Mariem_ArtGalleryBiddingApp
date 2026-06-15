
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtworkService } from '../services/artwork.service';

@Component({
  selector: 'app-artwork-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './artwork-form.component.html',
  styleUrl: './artwork-form.component.css'
})
export class ArtworkFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  isEditMode = false;
  artworkId!: number;
  errorMsg = '';

  tagOptions = ['painting', 'wall art', 'digital', 'sketch'];

  constructor(
    private fb: FormBuilder,
    private artworkService: ArtworkService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  
  private toLocal(d: Date): string {
    return d.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    const now      = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    this.form = this.fb.group({
      title:         ['', Validators.required],
      imageUrl:      ['', Validators.required],
      tags:          [[]],
      startingPrice: [1, [Validators.required, Validators.min(1)]],
      
      auctionStart:  [this.toLocal(now)],
      auctionEnd:    [this.toLocal(tomorrow)]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.artworkId = +id;
      this.artworkService.getById(this.artworkId).subscribe({
        next: (data) => this.form.patchValue({
          ...data,
          
          auctionStart: data.auctionStart ? data.auctionStart.slice(0, 16) : '',
          auctionEnd:   data.auctionEnd   ? data.auctionEnd.slice(0, 16)   : ''
        }),
        error: () => this.router.navigate(['/artworks'])
      });
    }
  }

  get title() { return this.form.get('title')!; }
  get imageUrl() { return this.form.get('imageUrl')!; }
  get startingPrice() { return this.form.get('startingPrice')!; }

  isTagSelected(tag: string): boolean {
    return (this.form.get('tags')!.value as string[]).includes(tag);
  }

  toggleTag(tag: string): void {
    const current: string[] = this.form.get('tags')!.value;
    const updated = current.includes(tag)
      ? current.filter(t => t !== tag)
      : [...current, tag];
    this.form.get('tags')!.setValue(updated);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.loading = true;
    const request$ = this.isEditMode
      ? this.artworkService.update(this.artworkId, this.form.value)
      : this.artworkService.create(this.form.value);

    request$.subscribe({
      next: () => this.router.navigate(['/artworks']),
      error: () => { this.errorMsg = 'Erreur opération'; this.loading = false; }
    });
  }
}