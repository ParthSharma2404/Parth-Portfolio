import ParticleBackground from './ParticleBackground';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      
      {/* Animated Background Mesh */}
      <div className="bg-mesh-container">
        <div className="mesh-blob mesh-blob-1"></div>
        <div className="mesh-blob mesh-blob-2"></div>
        <div className="mesh-blob mesh-blob-3"></div>
      </div>

      {/* Live Particle Background */}
      <ParticleBackground />

      <div className="relative text-center max-w-4xl z-10">

        {/* Role */}
        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-semibold opacity-70">
          Product Engineer & Full-Stack Developer
        </p>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold mb-8 tracking-tighter leading-none text-white">
          PARTH SHARMA<span className="text-accent">.</span>
        </h1>

        {/* Tagline */}
        <p className="text-zinc-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Crafting high-performance web experiences with code and creative strategy.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 md:gap-8">
          <a
            href="/CV/Parth Sharma CV.pdf"
            download="Parth Sharma CV.pdf"
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10"
          >
            Download Resume
          </a>

          <a
            href="#contact"
            className="border border-zinc-700 bg-zinc-900/50 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

      </div>

    </section>
  );
}

export default Hero;
