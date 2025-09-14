import { useState, useEffect, RefObject, useRef } from "react";

export function useVolume(videoRef: RefObject<HTMLVideoElement | null>) {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);
  const preMuteVolumeRef = useRef(50);
  
  const updateVolume = (v: number) => {
    setVolume(v);
    setMuted(v === 0);
    if (v > 0) {
      preMuteVolumeRef.current = v;
    }
  };
  
  const toggleMuted = () => {
    setMuted((prevMuted) => {
      if (prevMuted) {
        const restoredVolume = preMuteVolumeRef.current || 50;
        setVolume(restoredVolume);
        return false;
      } else {
        if (volume > 0) preMuteVolumeRef.current = volume;
        setVolume(0);
        return true;
      }
    });
  };
  
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume / 100;
    videoRef.current.muted = muted;
  }, [volume, muted, videoRef]);
  
  return {
    volume,
    muted,
    updateVolume,
    toggleMuted,
  };
}
