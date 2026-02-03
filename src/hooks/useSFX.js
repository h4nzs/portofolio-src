import React from 'react';
import useSound from 'use-sound';

// Hook to provide sound effects
export const useSFX = () => {
  const [playHover] = useSound('/portofolio/sounds/hover.mp3', { volume: 0.1 }); // Low volume for subtlety
  const [playClick] = useSound('/portofolio/sounds/click.mp3', { volume: 0.2 });

  return { playHover, playClick };
};

export default useSFX;
