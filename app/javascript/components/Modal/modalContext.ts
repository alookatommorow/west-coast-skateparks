import { createContext } from 'react';

export type ModalContextProps = {
  onClose?: () => void;
  isVisible: boolean;
  className?: string;
  fullScreenMobile?: boolean;
};

export const ModalContext = createContext<ModalContextProps>({
  fullScreenMobile: false,
  isVisible: false,
});
