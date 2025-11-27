export interface Donation {
  id: string;
  name: string;
  amount: number;
  message: string;
  timestamp: Date;
  aiResponse?: string; // Personalized message from the Captain (AI)
}

export interface ShipStats {
  targetAmount: number;
  currentAmount: number;
  totalDonors: number;
  constructionPhase: string; // e.g., "Desain", "Lunas", "Lambung", "Tiang Layar"
}

export interface ConstructionMilestone {
  amount: number;
  label: string;
  description: string;
  reached: boolean;
}

export enum BuildingPhase {
  PLANNING = 'Perencanaan & Desain',
  KEEL_LAYING = 'Pemasangan Lunas',
  HULL = 'Pembangunan Lambung',
  DECKING = 'Pemasangan Dek',
  MASTING = 'Pemasangan Tiang & Layar',
  LAUNCH = 'Peluncuran'
}