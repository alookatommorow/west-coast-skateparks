export type Photo = {
  url: string;
};

export type Skatepark = {
  slug: string;
  name: string;
  city: string;
  state: 'california' | 'oregon' | 'washington';
  location?: string;
  latitude?: number;
  longitude?: number;
  map_photo?: string;
  neighbor_parks?: Skatepark[];
  stars?: number;
  id?: number;
  obstacles?: string;
  address?: string;
  hours?: string;
  material?: string;
  designer?: string;
  builder?: string;
  opened?: string;
  size?: string;
  lights?: string;
  info?: string;
  average_rating?: number;
  status?: 'open' | 'closed';
  photos?: Photo[];
  ratings?: Rating[];
};

export type SkateparkAttr = keyof Skatepark;

export type Rating = {
  author: string;
  author_id: number;
  avatar?: string;
  created_at: string;
  new_average: number;
  review: string;
  stars: number;
};

export type User = {
  username: string;
  email: string;
  avatar?: string;
  created_at: string;
  name?: string;
  id: number;
};
