// dont pass this anything other than a string or object
export const classNames = function(baseClass, ...optionalClasses) {
  let classes = baseClass;

  for (let i of optionalClasses) {
    if (i && typeof i === 'string') {
      classes += ` ${i}`;
    } else if (i) {
      for (let j of Object.keys(i)) {
        if (!!i[j]) {
          classes += ` ${j}`;
        }
      }
    }
  }

  return classes;
}