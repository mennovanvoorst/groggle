import { useEffect, useState } from 'react';

const useMousePressed = () => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) =>
      event.button === 0 && setIsPressed(true);
    const handleMouseUp = (event: MouseEvent) =>
      event.button === 0 && setIsPressed(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return isPressed;
};

export { useMousePressed };
