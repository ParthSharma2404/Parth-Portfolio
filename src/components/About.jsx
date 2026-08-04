import { useRef } from "react";

function About() {
  const containerRef = useRef(null);

  const focusAreas = [
    { title: "DSA", description: "Problem solving and algorithmic thinking.", icon: "🧠" },
    { title: "Building Solutions", description: "End-to-end web & software development.", icon: "🏗️" },
    { title: "Full-Stack", description: "Modern MERN and Django architectures.", icon: "⚡" },
    { title: "UI/UX", description: "Creating user-centric and responsive designs.", icon: "✨" }
  ];

  const certificates = [
    { name: "Build a Full Website using WordPress", issuer: "Coursera", link: "https://www.coursera.org/account/accomplishments/verify/PZMNXKPKVARF" },
    { name: "Responsive Web Design", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/fcc1d64f4a0-b8b6-4df6-9d01-d99ac9a022d8/responsive-web-design" },
    { name: "React", issuer: "Meta", link: "https://www.coursera.org/account/accomplishments/certificate/D6KJV454CS4C" },
    { name: "Programming with JavaScript", issuer: "Meta", link: "https://www.coursera.org/account/accomplishments/certificate/MR63NXSPJ8B4" },
    { name: "Python Data Structures", issuer: "University of Michigan", link: "https://www.coursera.org/account/accomplishments/certificate/M847JMJT65ZV" },
    { name: "5 Star C++ Rating", issuer: "HackerRank", link: "https://www.hackerrank.com/profile/ps4033907" }
  ];

  return (
    <section className="relative min-h-screen max-w-6xl mx-auto px-6 py-24 flex flex-col justify-center overflow-hidden" id="about" ref={containerRef}>
      
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative z-10 reveal">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          About Me<span className="text-accent">.</span>
        </h2>
        <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-8 mb-4"></div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 reveal reveal-delay-200">
        
        {/* Intro Tile (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-zinc-900/40 rounded-[2.5rem] p-8 md:p-12 border border-zinc-800/50 backdrop-blur-xl group hover:border-accent/30 transition-all duration-500 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-10 -mt-10 group-hover:bg-accent/20 transition-all duration-700 pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">Hello, I'm Parth.</h3>
          <div className="space-y-6 text-lg md:text-xl text-zinc-400 leading-relaxed font-medium max-w-2xl">
            <p>
              My journey in development started with curiosity about how software works behind the scenes. 
            </p>
            <p>
              Today, that curiosity has evolved into building <span className="text-white">full-stack applications</span>, 
              <span className="text-accent"> AI-driven tools</span>, and 
              <span className="text-white"> real-world products</span>. I enjoy turning complex ideas into scalable digital solutions using modern technologies.
            </p>
          </div>
        </div>

        {/* First Focus Tile */}
        <div className="bg-zinc-900/40 rounded-[2.5rem] p-8 border border-zinc-800/50 backdrop-blur-xl group hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-500 flex flex-col justify-center shadow-xl">
          <span className="text-5xl mb-6 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">{focusAreas[0].icon}</span>
          <h4 className="text-xl font-bold text-white mb-2">{focusAreas[0].title}</h4>
          <p className="text-zinc-500 text-sm leading-relaxed">{focusAreas[0].description}</p>
        </div>

        {/* Remaining Focus Tiles */}
        {focusAreas.slice(1).map((area, i) => (
          <div key={i} className="bg-zinc-900/40 rounded-[2.5rem] p-8 border border-zinc-800/50 backdrop-blur-xl group hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-500 flex flex-col justify-center shadow-xl">
            <span className="text-5xl mb-6 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">{area.icon}</span>
            <h4 className="text-xl font-bold text-white mb-2">{area.title}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">{area.description}</p>
          </div>
        ))}

        {/* Certifications Tile (Spans full width) */}
        <div className="md:col-span-2 lg:col-span-3 bg-zinc-900/40 rounded-[2.5rem] p-8 md:p-10 border border-zinc-800/50 backdrop-blur-xl overflow-hidden relative shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm font-display font-bold text-zinc-500 uppercase tracking-widest">
              Certifications
            </h3>
            <div className="h-px flex-1 bg-zinc-800"></div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {certificates.map((cert, i) => (
              <a 
                key={i} 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/cert px-6 py-4 bg-zinc-950/50 rounded-2xl border border-zinc-800 hover:border-accent hover:bg-zinc-900 transition-all flex flex-col gap-1 shadow-inner"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-zinc-200 font-medium text-sm group-hover/cert:text-white transition-colors">{cert.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover/cert:text-accent group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5 transition-all">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest group-hover/cert:text-zinc-400 transition-colors">{cert.issuer}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;