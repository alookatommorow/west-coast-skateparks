export const classNames = (
  baseClass: string,
  ...optionalClasses: (string | Record<string, boolean>)[]
) => {
  let classes = baseClass;

  for (const i of optionalClasses) {
    if (typeof i === 'string') {
      classes += ` ${i}`;
    } else if (typeof i === 'object') {
      for (const j of Object.keys(i)) {
        if (i[j]) {
          classes += ` ${j}`;
        }
      }
    }
  }

  return classes;
};
