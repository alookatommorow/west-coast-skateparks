import { Attr } from '.';

type AttrMap = {
  name: Attr;
  text: string;
};

export const SKATEPARK_ATTRS: Array<AttrMap> = [
  {
    name: 'name',
    text: 'Name',
  },
  {
    name: 'city',
    text: 'City',
  },
  {
    name: 'state',
    text: 'State',
  },
  {
    name: 'stars',
    text: 'Rating',
  },
  {
    name: 'obstacles',
    text: 'Obstacles',
  },
];
