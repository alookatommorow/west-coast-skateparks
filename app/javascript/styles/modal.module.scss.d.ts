export type Styles = {
  closeBtn: string;
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
  fullScreenMobile: string;
  mobileArrowLeftIcon: string;
  mobileTimesIcon: string;
  modalBody: string;
  modalContainer: string;
  modalContent: string;
  modalFooter: string;
  modalHeader: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
