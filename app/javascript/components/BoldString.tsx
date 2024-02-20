import React from 'react';

type BoldStringPops = {
  length: number;
  matchIndices: number[];
  string: string;
};

type Chunk = {
  bold: boolean;
  str: string;
};

export const BoldString = ({
  string,
  matchIndices,
  length,
}: BoldStringPops) => {
  const chunks: Record<number, Chunk> = {};
  let cursor = 0;

  matchIndices.forEach((matchIndex, index) => {
    // grab the chunk preceding the match
    if (cursor < matchIndex) {
      chunks[cursor] = {
        bold: false,
        str: string.slice(cursor, matchIndex),
      };
    }

    chunks[matchIndex] = {
      bold: true,
      str: string.slice(matchIndex, matchIndex + length),
    };

    // if last item, add last chunk, else increment cursor
    if (index === matchIndices.length - 1) {
      chunks[matchIndex + length] = {
        bold: false,
        str: string.slice(matchIndex + length),
      };
    } else {
      cursor = matchIndex + length;
    }
  });

  return (
    <>
      <p>
        {Object.values(chunks).map((chunk, index) => {
          if (chunk.bold) {
            return (
              <span key={`chunk-${index}`} className="orange">
                {chunk.str}
              </span>
            );
          }
          return chunk.str;
        })}
      </p>
    </>
  );
};
