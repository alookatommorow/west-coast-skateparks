import { Skatepark } from '../../types';

export type SkateparkReference = Record<string, Skatepark>;

export type ResourceName = 'user' | 'skatepark';

export type Resource = {
  nearby?: Skatepark[];
  favorite?: Skatepark[];
  visited?: Skatepark[];
  main?: Skatepark[];
  both?: SkateparkReference;
};

export type SkateparkType = keyof Resource;

export type SkateparkData = {
  isVisible: boolean;
  toggleEnabled: boolean;
  renderAsType?: SkateparkType;
  items: Skatepark[];
  type: SkateparkType;
};

export type MapData = Record<SkateparkType, SkateparkData>;

export type LatLng = {
  lat: number;
  lng: number;
};
