export const classNames = function(baseClass, optionalClass) {
  let classes = baseClass;
  if (optionalClass) classes += ` ${optionalClass}`;
  return classes;
}