import { useState } from 'react';

const useToggle = intitial => {
  const [toggleIsOn, setToggleIsOn] = useState(intitial);
  const toggle = () => setToggleIsOn(!toggleIsOn);
  return { toggleIsOn, toggle };
};

export default useToggle;
