import { useState } from 'react';

export const useToggle = (intitial: boolean) => {
  const [toggleIsOn, setToggleIsOn] = useState(intitial);
  const toggle = () => setToggleIsOn(!toggleIsOn);
  return { toggleIsOn, toggle };
};
