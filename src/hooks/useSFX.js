import { useCallback, useRef } from 'react';
import { Howl } from 'howler';

export const useSFX = () => {
  const soundsRef = useRef(null);

  const getSounds = useCallback(() => {
    if (!soundsRef.current) {
      soundsRef.current = {
        hover: new Howl({ src: ['/portofolio/sounds/hover.mp3'], volume: 0.1 }),
        click: new Howl({ src: ['/portofolio/sounds/click.mp3'], volume: 0.2 }),
      };
    }
    return soundsRef.current;
  }, []);

  const playHover = useCallback(() => getSounds().hover.play(), [getSounds]);
  const playClick = useCallback(() => getSounds().click.play(), [getSounds]);

  return { playHover, playClick };
};

export default useSFX;
