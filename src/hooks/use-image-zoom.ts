'use client';

import { useRef } from 'react';

const useImageZoom = () => {
  const handleMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.transform = 'scale(2.4)';
    target.style.cursor = 'zoom-in';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.transform = 'scale(1)';
    target.style.transformOrigin = 'center center';
    target.style.cursor = 'default';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPercent = (offsetX / offsetWidth) * 100;
    const yPercent = (offsetY / offsetHeight) * 100;

    target.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  };

  return {
    handleMouseMove,
    handleMouseOut,
    handleMouseOver
  };
};

export default useImageZoom;
