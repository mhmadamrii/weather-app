import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultStates = [
  {
    name: 'Bogor',
    country: 'ID',
    state: 'Bogor',
    lat: -6.96256425,
    lon: 112.0276531475989,
  },
  {
    name: 'London',
    country: 'GB',
    state: 'England',
    lat: 51.5074,
    lon: 0.1278,
  },
  {
    name: 'New York',
    country: 'US',
    state: 'New York',
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: 'Sydney',
    country: 'AU',
    state: 'New South Wales',
    lat: -33.8688197,
    lon: 151.2092955,
  },
  {
    name: 'Barcelona',
    country: 'ES',
    state: 'Catalonia',
    lat: 41.3828939,
    lon: 2.1774322,
  },
];
