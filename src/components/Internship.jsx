import { useRef, useEffect, useState } from "react";

function Internship() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const internships = [
    {
      role: "Software Intern",
      company: "Total Shift Left",
      location: "Gurgaon",
      period: "2025",
      description: "Worked on backend development using Django and Python, implementing document processing systems and integrating AI-based tools for automated requirement extraction.",
      tech: ["Django", "Python", "MongoDB", "LLM APIs"],
      certificateUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7366006886845878272/?originTrackingId=SCMdsaNnbM8ua3q9XYIHTQ%3D%3D"
    },
    {
      role: "Full Stack Web Development Intern",
      company: "Business Web Solutions (BWS)",
      location: "Remote",
      period: "2023",
      description: "Successfully completed an intensive internship focusing on full-stack web technologies, building modern web applications and mastering front-end and back-end integration.",
      tech: ["React JS", "Django", "Python", "Bootstrap", "JQuery"],
      certificateUrl: "https://drive.google.com/file/d/1JOAqlXUmIYT9yUoyaqWie0yWU1gtvrkv/view?usp=sharing"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the container is visible/scrolled
      // 0 when top enters, 1 when bottom leaves
      const start = rect.top - viewportHeight;
      const end = rect.bottom;
      const total = end - start;
      const progress = Math.min(Math.max((0 - start) / total, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen px-6 py-32 flex flex-col items-center bg-zinc-950 overflow-hidden" 
      id="internship"
    >
      
      {/* Background Decorative Mesh */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-5xl text-left mb-24 relative z-10">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter reveal">
          Career Path<span className="text-accent">.</span>
        </h2>
        <p className="text-zinc-500 mt-6 text-lg max-w-2xl reveal reveal-delay-200 leading-relaxed font-light">
          A chronicle of my professional evolution, from foundational web development to advanced AI systems and backend architecture.
        </p>
      </div>

      <div className="relative w-full max-w-5xl flex flex-col gap-24">
        {/* Timeline Base Line (Background) */}
        <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-[2px] bg-zinc-900 hidden md:block opacity-50" />
        
        {/* Active Scroll Trace Line */}
        <div 
          className="absolute left-0 md:left-1/2 top-4 w-[2px] bg-gradient-to-b from-accent/0 via-accent to-accent/0 hidden md:block z-10 shadow-[0_0_15px_rgba(134,189,34,0.3)] transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {internships.map((intern, index) => (
          <div 
            key={index} 
            onMouseMove={handleMouseMove}
            data-cursor="CAREER"
            className={`group relative flex flex-col md:flex-row items-center gap-12 reveal reveal-delay-${(index + 1) * 200}`}
          >
            {/* Timeline Intersection Node */}
            <div 
              className={`absolute left-[-4px] md:left-1/2 md:translate-x-[-10px] w-5 h-5 rounded-full z-20 hidden md:flex items-center justify-center border-4 border-zinc-950 transition-all duration-500
                ${scrollProgress > (index / internships.length) ? 'bg-accent shadow-[0_0_20px_rgba(134,189,34,0.6)] scale-110' : 'bg-zinc-800 scale-90'}
              `}
            >
              <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
               <div className="glow-card bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/80 p-10 rounded-[2.5rem] transition-all duration-700 hover:border-accent/40 hover:shadow-[0_20px_80px_-20px_rgba(134,189,34,0.15)] group-hover:-translate-y-3 relative overflow-hidden">
                
                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
                      {intern.period}
                    </span>
                    <div className="flex items-center gap-2 text-zinc-500 font-medium text-xs">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {intern.location}
                    </div>
                  </div>

                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors duration-500 tracking-tight">
                    {intern.role}
                  </h3>
                  <p className="text-xl font-medium text-zinc-400 mb-6 flex items-center gap-2">
                    {intern.company}
                  </p>

                  <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-light">
                    {intern.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {intern.tech.map((t) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 group-hover:border-accent/30 transition-all duration-500">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={intern.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white text-zinc-950 font-bold text-xs rounded-2xl hover:bg-accent transition-all duration-500 shadow-xl group-hover:scale-[1.02] active:scale-95"
                  >
                    VIEW CREDENTIALS
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Internship;
