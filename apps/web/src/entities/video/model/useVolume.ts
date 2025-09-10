import { useState, useEffect, RefObject } from "react";

export function useVolume(videoRef: RefObject<HTMLVideoElement | null>) {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  const updateVolume = (v: number) => {
    setVolume(v);
    setMuted(v === 0);
    if (videoRef.current) {
      videoRef.current.volume = v / 100;
      videoRef.current.muted = v === 0;
    }
  };

  const toggleMuted = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    const fallbackVolume = volume === 0 ? 50 : volume;

    if (videoRef.current) {
      videoRef.current.muted = newMuted;
      videoRef.current.volume = newMuted ? 0 : fallbackVolume / 100;
    }

    if (newMuted) {
      setVolume(0);
    } else {
      setVolume(fallbackVolume);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = muted;
    }
  }, [videoRef]);

  return {
    volume, muted, updateVolume, toggleMuted,
  };
}
