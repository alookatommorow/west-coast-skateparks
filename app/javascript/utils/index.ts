export const titleize = (str: string) => {
  return str.replace(new RegExp('(?:\\b|_)([a-z])', 'g'), function (char) {
    return char.toUpperCase();
  });
};
