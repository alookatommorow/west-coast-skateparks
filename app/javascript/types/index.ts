export type Skatepark = {
  slug: string;
  name: string;
  city: string;
  state: 'california' | 'oregon' | 'washington';
  latitude?: number;
  longitude?: number;
  map_photo?: string;
  neighbor_parks?: Skatepark[];
  rating?: number;
  id?: number;
};
