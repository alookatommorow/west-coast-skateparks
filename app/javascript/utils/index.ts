export const titleize = (str: string) => {
  return str.replace(new RegExp('(?:\\b|_)([a-z])', 'g'), function (char) {
    return char.toUpperCase();
  });
};

export const findMatchIndices = (str: string, searchStr: string) => {
  const regex = new RegExp(searchStr, 'gi');
  const matches = str.matchAll(regex);
  const indices = [];
  for (const match of matches) {
    if (match.index !== undefined) {
      indices.push(match.index);
    }
  }

  return indices;
};
