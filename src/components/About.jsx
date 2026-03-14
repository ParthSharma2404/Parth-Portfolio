import { useRef } from "react";

function About() {
  const containerRef = useRef(null);

  const focusAreas = [
    { title: "DSA", description: "Problem solving and algorithmic thinking." },
    { title: "Building Solutions", description: "End-to-end web & software development." },
    { title: "Full-Stack", description: "Modern MERN and Django architectures." },
    { title: "UI/UX", description: "Creating user-centric and responsive designs." }
  ];

  const certificates = [
    { name: "Build a Full Website using WordPress", issuer: "Coursera", link: "https://www.coursera.org/account/accomplishments/verify/PZMNXKPKVARF" },
    { name: "Responsive Web Design", issuer: "freeCodeCamp", link: "https://freecodecamp.org/certification/fcc1d64f4a0-b8b6-4df6-9d01-d99ac9a022d8/responsive-web-design" },
    { name: "React", issuer: "Meta", link: "https://www.coursera.org/account/accomplishments/certificate/D6KJV454CS4C" },
    { name: "Programming with JavaScript", issuer: "Meta", link: "https://www.coursera.org/account/accomplishments/certificate/MR63NXSPJ8B4" },
    { name: "Python Data Structures", issuer: "University of Michigan", link: "https://www.coursera.org/account/accomplishments/certificate/M847JMJT65ZV" },
    { name: "5 Star C++ Rating", issuer: "HackerRank", link: "https://www.hackerrank.com/profile/ps4033907" }
  ];

  const handleMouseMove = (e, type) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (type === 'glow') {
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    } else if (type === 'tilt') {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = (e, type) => {
    if (type === 'tilt') {
      e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <section className="relative min-h-screen max-w-6xl mx-auto px-6 py-24 flex flex-col justify-center overflow-hidden" id="about" ref={containerRef}>
      
      {/* Decorative Blobs */}
      <div className="bg-mesh-blob w-[400px] h-[400px] bg-accent/10 top-[-10%] left-[-10%] animate-pulse" />
      <div className="bg-mesh-blob w-[300px] h-[300px] bg-white/5 bottom-[10%] right-[-5%] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          About Me<span className="text-accent">.</span>
        </h2>
        <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-8 mb-4"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
        
        {/* Intro & Focus */}
        <div className="space-y-12">
          <div className="space-y-6 reveal">
            <p className="text-xl text-zinc-300 leading-relaxed font-medium">
              My journey in development started with curiosity about how software works behind the scenes.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Today, that curiosity has evolved into building <span className="text-white font-semibold italic">full-stack applications</span>, 
              <span className="text-white font-semibold italic"> AI-driven tools</span>, and 
              <span className="text-white font-semibold italic"> real-world products</span>. 
              I enjoy turning complex ideas into scalable digital solutions using modern technologies.
            </p>
          </div>

          <div className="reveal">
            <h3 className="text-sm font-display font-bold text-zinc-500 uppercase tracking-widest mb-6 border-l-2 border-accent pl-4">
              Current Focus
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {focusAreas.map((area, index) => (
                <div 
                  key={area.title}
                  onMouseMove={(e) => handleMouseMove(e, 'tilt')}
                  onMouseLeave={(e) => handleMouseLeave(e, 'tilt')}
                  className="tilt-card bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl hover:border-accent/40 transition-colors group cursor-default shadow-xl shadow-black/20"
                >
                  <div className="tilt-content">
                    <h4 className="text-white font-bold mb-1 group-hover:text-accent transition-colors">{area.title}</h4>
                    <p className="text-zinc-500 text-sm leading-snug">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="reveal reveal-delay-200">
          <h3 className="text-sm font-display font-bold text-zinc-500 uppercase tracking-widest mb-6 border-l-2 border-accent pl-4">
            Certifications
          </h3>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <a 
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={(e) => handleMouseMove(e, 'glow')}
                className="glow-card group flex flex-col p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-800/30 hover:border-accent/30 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between gap-4 relative z-10">
                  <span className="text-zinc-200 font-medium group-hover:text-white transition-colors">
                    {cert.name}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1 relative z-10">
                  {cert.issuer}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

export default About;