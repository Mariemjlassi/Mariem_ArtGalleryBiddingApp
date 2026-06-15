
export interface Artwork {
  id: number;
  title: string;
  imageUrl: string;
  tags: string[];
  startingPrice: number;
  ownerId: number;
  createdAt: string;
}

export interface ArtworkRequest {
  title: string;
  imageUrl: string;
  tags: string[];
  startingPrice: number;
  ownerId: number;
}