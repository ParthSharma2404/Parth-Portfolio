import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const hasStarted = useRef(false);

  const trackUrl = "https://soundcloud.com/c-nguy-n-520304333/nst-doremon-tru-mu-a-h-c-2k1";
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;

  useEffect(() => {
    // Load SoundCloud Widget API
    const script = document.createElement('script');
    script.src = "https://w.soundcloud.com/player/api.js";
    script.onload = () => {
      if (window.SC) {
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        widget.bind(window.SC.Widget.Events.READY, () => {
          setIsReady(true);
        });
        widget.bind(window.SC.Widget.Events.FINISH, () => {
          setIsPlaying(false);
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleMusic = () => {
    if (!widgetRef.current || !isReady) return;

    if (isPlaying) {
      widgetRef.current.pause();
    } else {
      widgetRef.current.setVolume(50);
      widgetRef.current.play();

      // Skip silence immediately on first play for minimal lag
      if (!hasStarted.current) {
        widgetRef.current.seekTo(1800);
        hasStarted.current = true;
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-center gap-4 group">
      {/* Hidden SoundCloud Player for API Control */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        width="0"
        height="0"
        className="hidden pointer-events-none opacity-0"
        allow="autoplay; encrypted-media"
      />
      
      <button 
        onClick={toggleMusic}
        disabled={!isReady}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:border-accent/40 transition-all duration-300 shadow-2xl overflow-hidden ${!isReady ? 'opacity-50 cursor-wait' : ''}`}
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
        {isReady ? 'Doraemon Mode' : 'Loading Audio...'}
      </div>
    </div>
  );
};

export default MusicPlayer;
