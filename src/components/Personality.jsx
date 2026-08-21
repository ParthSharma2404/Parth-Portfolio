import { useRef } from "react";

function Personality() {
  const containerRef = useRef(null);

  const traits = [
    {
      icon: "🧠",
      tag: "Problem Solver",
      title: "First-Principles Thinker",
      description:
        "I find genuine satisfaction in breaking down complex challenges into simple, elegant components. Whether optimizing algorithms or system architecture, I focus on clarity and scalability."
    },
    {
      icon: "✨",
      tag: "Design & Craft",
      title: "Obsessed with Details",
      description:
        "To me, great engineering is incomplete without intuitive design. I care deeply about fluid micro-animations, silky 60fps responsiveness, and crafting experiences that feel delightful."
    },
    {
      icon: "🎧",
      tag: "Mindset & Growth",
      title: "Curious & Composed",
      description:
        "Whether deep in a late-night debugging session with lofi tracks or exploring emerging AI workflows, I approach every challenge with calm focus, consistency, and an eagerness to learn."
    }
  ];

  return (
    <section 
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 overflow-hidden" 
      id="philosophy"
      ref={containerRef}
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10 reveal">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs font-mono font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>BEYOND THE CODE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
          Who I am behind the screen<span className="text-accent">.</span>
        </h2>
        
        <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
          Driven by curiosity, fueled by discipline, and passionate about turning ambitious ideas into tangible digital products.
        </p>
      </div>

      {/* 3 Pillars / Traits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 reveal reveal-delay-200">
        {traits.map((trait, index) => (
          <div
            key={index}
            className="group relative bg-zinc-900/40 border border-zinc-800/60 hover:border-accent/40 rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between"
          >
            {/* Top Row: Icon & Tag */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl p-3 bg-zinc-950/60 rounded-2xl border border-zinc-800/80 group-hover:scale-110 transition-transform duration-300">
                  {trait.icon}
                </span>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-accent transition-colors duration-300">
                  {trait.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                {trait.title}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-[15px] leading-relaxed font-light">
                {trait.description}
              </p>
            </div>

            {/* Bottom Subtle Accent Indicator */}
            <div className="mt-6 pt-4 border-t border-zinc-800/40 flex items-center justify-between text-zinc-600 text-xs font-mono">
              <span>0{index + 1}</span>
              <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Quote Banner */}
      <div className="mt-8 relative z-10 reveal reveal-delay-300">
        <div className="bg-gradient-to-r from-zinc-900/60 via-zinc-900/30 to-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-3xl hidden sm:inline-block">💡</span>
            <div>
              <p className="text-zinc-200 font-medium text-sm sm:text-base">
                "I believe great software is built at the intersection of logical rigor and creative intuition."
              </p>
              <p className="text-zinc-500 text-xs mt-1 font-mono">
                — Parth Sharma
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 bg-white text-zinc-950 hover:bg-accent hover:text-black font-semibold text-xs rounded-xl transition-all duration-300 shadow-md cursor-pointer"
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Personality;
