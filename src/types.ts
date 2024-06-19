export interface Influencer {
  id: number;
  name: string;
  rating: number;
  cost: number;
  follower: number;
  availability: boolean;
  gender: 'male' | 'female';
}

export interface State {
  costRange: [number, number];
  ratingRange: [number, number];
  selectedFollowers: string;
  selectedGenders: string;
}

export type Action =
  | { type: 'COST_RANGE'; payload: [number, number] }
  | { type: 'RATING_RANGE'; payload: [number, number] }
  | { type: 'SELECTED_FOLLOWERS'; payload: string }
  | { type: 'SELECTED_GENDER'; payload: string };
