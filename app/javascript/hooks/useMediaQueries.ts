import { useMediaQuery } from './useMediaQuery';

// see _variables.scss
const MOBILE = 768;
const TABLET = 1025;

export const useMediaQueries = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE}px)`);
  const isTablet = useMediaQuery(`(max-width: ${TABLET}px)`);

  return { isMobile, isTablet };
};
