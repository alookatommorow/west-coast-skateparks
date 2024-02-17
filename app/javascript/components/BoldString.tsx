import React from 'react';
import { titleize } from '../utils';

type BoldStringPops = {
  length: number;
  matchIndex: number;
  string: string;
};

export const BoldString = ({ string, matchIndex, length }: BoldStringPops) => {
  if (string === 'Garucha 67') {
    console.log('fuckingggggg');
  }
  const output = titleize(string);
  const first = output.slice(0, matchIndex);
  const bold = output.slice(matchIndex, matchIndex + length);
  const last = output.slice(matchIndex + length);

  return (
    <span>
      {first}
      <span className="orange">{bold}</span>
      {last}
    </span>
  );
};
