import React, { useEffect, useState, AnimationEvent } from 'react';
import { classNames } from '../../utils/styles';

type FlashCategory = 'alert' | 'error' | 'notice' | 'success';

type FlashProps = {
  type?: FlashCategory | null;
  message?: string | null;
  onClose?: () => void;
};

const OPENING_ANIMATION = 'fly-in-left';
const CLOSING_ANIMATION = 'fly-out-left';

export const Flash = ({ type, message, onClose }: FlashProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === CLOSING_ANIMATION) {
      setIsVisible(false);
      setIsClosing(false);
      onClose?.();
    }
  };

  const animate = () => {
    setIsVisible(true);
    setTimeout(() => setIsClosing(true), 2000);
  };

  useEffect(() => {
    if (message && message.length > 0) {
      animate();
    }
  }, [message]);

  return (
    isVisible && (
      <div
        className={classNames(`flashes message ${type}`, {
          visible: isVisible,
          [OPENING_ANIMATION]: isVisible,
          [CLOSING_ANIMATION]: isClosing,
        })}
        onAnimationEnd={handleAnimationEnd}
      >
        <p className="header">{message}</p>
      </div>
    )
  );
};
