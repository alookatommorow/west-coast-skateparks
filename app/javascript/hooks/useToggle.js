import { useState } from 'react';

const useToggle = defaultIsShowing => {
  const [isShowing, setIsShowing] = useState(defaultIsShowing);
  const toggle = () => setIsShowing(!isShowing);
  return { isShowing, toggle };
};

export default useToggle;
