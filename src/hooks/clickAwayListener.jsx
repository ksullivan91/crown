import React, { useEffect, useRef } from 'react';

const ClickAwayListener = ({ children, onClickAway, isOpen }) => {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickAway();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
  }, [isOpen, handleClickOutside]);

  if (!isOpen) {
    return null;
  }

  return <div ref={ref}>{children}</div>;
};

export default ClickAwayListener;
