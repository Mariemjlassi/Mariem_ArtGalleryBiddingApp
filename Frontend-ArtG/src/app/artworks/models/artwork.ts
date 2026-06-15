
export interface Artwork {
  id: number;
  title: string;
  imageUrl: string;
  tags: string[];
  startingPrice: number;
  ownerId: number;
  createdAt: string;
  // Step 5 : champs d'enchère
  auctionStart: string | null;
  auctionEnd:   string | null;
  auctionStatus: 'PENDING' | 'ACTIVE' | 'ENDED' | null;
}

export interface ArtworkRequest {
  title: string;
  imageUrl: string;
  tags: string[];
  startingPrice: number;
  // Step 5 : optionnels
  auctionStart?: string | null;
  auctionEnd?:   string | null;
}