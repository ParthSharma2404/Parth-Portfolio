import React, { useRef, useEffect, useState } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Standard HTML5 Audio implementation for instant response
    // Use the user's provided Google Drive song (Direct link conversion)
    const audio = new Audio('https://drive.google.com/uc?export=download&id=1_SDYqffP6lCB3sACuxeIbgBsaXFWoy0b');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto'; // Force browser to start loading immediately
    
    // Use onloadeddata for a faster "ready" state than oncanplaythrough
    audio.onloadeddata = () => {
      setIsReady(true);
    };

    audio.onended = () => {
      setIsPlaying(false);
    };

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Skip the silent/beat-only intro on first play for the large remix file
      if (!hasStarted.current) {
        audioRef.current.currentTime = 1.5; // Skip first 2.6s of silence/intro
        hasStarted.current = true;
      }

      // Native audio play() is near-instant
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-center gap-4 group">
      <button 
        onClick={toggleMusic}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:border-accent/40 transition-all duration-300 shadow-2xl overflow-hidden ${!isReady ? 'opacity-70 cursor-wait' : ''}`}
      >
        {/* Fill Background on Hover */}
        <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-all duration-300" />
        
        {/* Sound Bars Animation */}
        <div className="relative z-10 flex items-end gap-[2px] h-3">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`w-[1px] bg-accent/60 transition-all duration-300 ${isPlaying ? 'animate-music-bar' : 'h-1'}`}
              style={{ 
                animationDelay: `${i * 0.15}s`,
                height: isPlaying ? '100%' : '3px'
              }}
            />
          ))}
        </div>
      </button>

      {/* Label */}
      <div className={`text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500/80 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
        {isReady || isPlaying ? 'Doraemon Mode' : 'Loading Audio...'}
      </div>
    </div>
  );
};

export default MusicPlayer;
