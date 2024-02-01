import React from 'react';

type BoldStringPops = {
  length: number,
  matchIndex: number,
  string: string,
};

export const BoldString = ({ string, matchIndex, length }: BoldStringPops) => {
  const output = titleize(string);
  const first = output.slice(0, matchIndex);
  const bold = output.slice(matchIndex, matchIndex + length);
  const last = output.slice(matchIndex + length);

  return <span>{first}<span className="orange">{bold}</span>{last}</span>;
};
