import { useRef, useEffect } from 'react';
import { Howl } from 'howler';

interface AudioHook {
  play: (src: string) => void;
  stop: (src?: string) => void;
  pauseAll: () => void;
  resumeAll: () => void;
}

const useAudio = (): AudioHook => {
  const audioRefs = useRef<Map<string, Howl>>(new Map());

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      audioRefs.current.forEach((sound) => {
        sound.stop();
      });
      audioRefs.current.clear();
    };
  }, []);

  const play = (src: string) => {
    if (!src) return;
    
    // Reuse existing Howl instance if it exists
    if (audioRefs.current.has(src)) {
      const sound = audioRefs.current.get(src)!;
      if (sound.playing()) {
        sound.stop();
      }
      sound.play();
    } else {
      // Create a new Howl instance
      const sound = new Howl({
        src: [src],
        html5: true,
        preload: true,
      });
      
      audioRefs.current.set(src, sound);
      sound.play();
    }
  };

  const stop = (src?: string) => {
    if (src) {
      // Stop specific sound
      const sound = audioRefs.current.get(src);
      if (sound) {
        sound.stop();
      }
    } else {
      // Stop all sounds
      audioRefs.current.forEach((sound) => {
        sound.stop();
      });
    }
  };

  const pauseAll = () => {
    audioRefs.current.forEach((sound) => {
      sound.pause();
    });
  };

  const resumeAll = () => {
    audioRefs.current.forEach((sound) => {
      if (!sound.playing()) {
        sound.play();
      }
    });
  };

  return { play, stop, pauseAll, resumeAll };
};

export default useAudio;