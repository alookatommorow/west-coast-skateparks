import { Skatepark } from '../../types';

export type SkateparkReference = Record<string, Skatepark>;

export type Resource = {
  nearby?: Skatepark[];
  favorite?: Skatepark[];
  visited?: Skatepark[];
  main?: Skatepark[];
  both?: SkateparkReference;
};

export type CollectionCategory = keyof Resource;

export type LatLng = {
  lat: number;
  lng: number;
};
