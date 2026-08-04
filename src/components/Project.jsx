import { useState, useRef, useEffect } from "react";

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const targetRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const projects = [
    {
      title: "StudySync",
      description: "A gamified productivity platform with a unique sketchbook aesthetic, designed to keep users engaged through interactive features.",
      problem: "Traditional study tools often lack engagement and feel monotonous. StudySync introduces gamification and interactive elements to make learning a more enjoyable and rewarding experience.",
      features: [
        "Real-time WebRTC Infrastructure: Powered by LiveKit for seamless, low-latency video and audio streaming within interactive study rooms.",
        "Scalable Gamification Engine: Node.js backend integrated with PostgreSQL (Neon) to handle complex state management for RPG leveling and streaks.",
        "Component-Driven UI Architecture: React-based SPA utilizing modern design patterns for animated micro-interactions and a dynamic Bento Grid layout.",
        "Secure Data Handling: Robust JWT authentication and efficient database querying ensuring transparent data security and high performance."
      ],
      tech: ["React", "LiveKit", "Node", "PostgreSQL", "Neon", "TailwindCSS"],
      video: "/videos/studysync.webp", 
      live: "https://studysync.fun",
      github: "#"
    },
    {
      title: "AI Requirements Analyzer",
      description: "An AI-powered tool that leverages Large Language Models to automate the analysis of complex software requirement documents, transforming raw text into structured development insights.",
      problem: "Software Requirement Specification (SRS) documents are often hundreds of pages long. Manually extracting specific requirements, functional constraints, and test scenarios is labor-intensive, prone to human oversight, and significantly delays the development lifecycle.",
      features: [
        "Automated extraction of functional and non-functional requirements using Llama 3.",
        "Generation of comprehensive test cases based on identified requirements.",
        "Relationship mapping between different project modules.",
        "Exportable structured reports in JSON format for development teams."
      ],
      tech: ["Django", "Python", "MongoDB", "NLP", "Llama 3"],
      video: null, 
      live: "#",
      github: "https://github.com/ParthSharma2404/AI-PARSER-AND-TEST-CASE-GENERATOR"
    },
    {
      title: "Blogo",
      description: "A high-performance blogging platform designed for modern storytellers, featuring a scalable backend and a seamless user experience.",
      problem: "Many blogging platforms are either too complex for casual users or lack the scalability and security required for professional creators. Existing solutions often struggle with slow content delivery and rigid formatting options.",
      features: [
        "Secure JWT-based authentication system for user data protection.",
        "Rich text editor for creating and formatting dynamic blog posts.",
        "Scalable MongoDB schema for high-performance content delivery.",
        "Responsive creator dashboard for managing profiles and engagement."
      ],
      tech: ["React", "Node", "Express", "MongoDB", "JWT"],
      video: "/videos/blogo.webp",
      live: "https://blogo-not-your-average-blogging-bud-nine.vercel.app/",
      github: "https://github.com/ParthSharma2404/Blogo.---Not-Your-Average-Blogging-buddy-"
    },
    {
      title: "NITS Construction",
      description: "A premium, performance-optimized digital home for a leading UK-based construction company, focusing on conversion and visual excellence.",
      problem: "Traditional construction businesses often lack a digital presence that reflects their craftsmanship. A slow, outdated website can lead to loss of potential high-value clients and fails to showcase the company's portfolio effectively.",
      features: [
        "Performance-optimized architecture with sub-1s page load times.",
        "Interactive high-resolution project gallery with category filtering.",
        "Streamlined consultation booking system to capture quality leads.",
        "SEO-friendly structure optimized for local market search dominance."
      ],
      tech: ["HTML", "TailwindCSS", "JavaScript", "PHP"],
      video: "/videos/nits.webp",
      live: "https://nitsconstructionltd.co.uk/",
      github: "#"
    }
  ];

  // We have 1 Title Slide + 4 Project Slides = 5 Slides total
  const totalSlides = projects.length + 1; 
  // Max translation is based on total slides. For 5 slides, max is 80%.
  const maxTranslate = ((totalSlides - 1) / totalSlides) * 100;

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current || !scrollContainerRef.current) return;
      
      // On mobile (lg breakpoint is 1024px), we disable horizontal scroll
      if (window.innerWidth < 1024) {
        scrollContainerRef.current.style.transform = `translateX(0)`;
        return;
      }

      const { top, height } = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const maxScroll = height - windowHeight;
      let progress = -top / maxScroll;
      progress = Math.max(0, Math.min(1, progress)); // clamp between 0 and 1
      
      scrollContainerRef.current.style.transform = `translateX(-${progress * maxTranslate}%)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [maxTranslate]);

  return (
    <>
      <section 
        id="projects" 
        ref={targetRef} 
        className="relative bg-zinc-950 lg:h-[500vh]"
      >
        <div className="lg:sticky lg:top-0 lg:h-screen lg:w-full lg:overflow-hidden">
          
          <div 
            ref={scrollContainerRef} 
            className="flex flex-col lg:flex-row w-full lg:w-[500vw] lg:h-full will-change-transform"
          >
            
            {/* Slide 0: Title Slide */}
            <div className="w-full lg:w-[100vw] h-auto lg:h-full flex items-center justify-center p-6 py-24 lg:p-24 shrink-0 bg-zinc-950 border-b lg:border-b-0 border-zinc-900">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-tight mb-8">
                  Selected <br className="hidden md:block"/> <span className="text-accent">Lab Projects.</span>
                </h2>
                <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                  A showcase of my recent work spanning high-performance web applications, AI integrations, and real-time collaboration platforms.
                </p>
                <div className="mt-16 hidden lg:flex items-center justify-center gap-4 text-zinc-600 animate-pulse">
                  <span className="text-sm uppercase tracking-widest font-bold">Keep Scrolling</span>
                  <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Slides 1-4: Projects */}
            {projects.map((project, index) => (
              <div key={index} className="w-full lg:w-[100vw] h-auto lg:h-full flex flex-col justify-center p-6 py-24 lg:p-24 shrink-0 relative bg-zinc-950 border-b lg:border-b-0 lg:border-l border-zinc-900 overflow-hidden">
                
                {/* Huge Background Number */}
                <div className="absolute -top-10 -right-10 lg:top-10 lg:left-10 text-[12rem] lg:text-[20rem] font-bold text-zinc-900/30 z-0 leading-none pointer-events-none select-none">
                  0{index + 1}
                </div>

                <div className="flex flex-col-reverse lg:flex-row items-center w-full h-full max-w-7xl mx-auto gap-12 lg:gap-20 relative z-10">
                  
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-lg lg:text-2xl mb-10 leading-relaxed font-light">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-12">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-full text-xs font-bold text-accent tracking-widest uppercase backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => setSelectedProject(project)} 
                        className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-2xl hover:bg-accent transition-colors duration-300 text-center cursor-pointer"
                      >
                        Deep Dive Case Study
                      </button>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-8 py-4 bg-transparent border border-zinc-700 text-white font-bold rounded-2xl hover:border-accent hover:text-accent transition-colors duration-300 text-center"
                      >
                        Visit Live Site
                      </a>
                    </div>
                  </div>

                  {/* Visual/Image Content */}
                  <div className="w-full lg:w-1/2 h-[40vh] lg:h-[70vh] bg-zinc-900 rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl relative group">
                    {project.video ? (
                      /\.(webp|png|jpg|jpeg)$/.test(project.video) ? (
                        <img 
                          src={project.video} 
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <video 
                          src={project.video} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-zinc-900 to-zinc-950">
                        <div className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                          <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">Visuals Coming Soon</p>
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Modal logic untouched but polished */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 md:p-6 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 max-w-5xl w-full p-6 md:p-12 rounded-[3rem] relative animate-in fade-in zoom-in duration-300 my-auto shadow-2xl">
            {/* Header with Title and Close */}
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/30 bg-accent/10 px-4 py-1.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="p-4 bg-zinc-900 hover:bg-white text-zinc-400 hover:text-zinc-950 rounded-full transition-all duration-300 shadow-xl border border-zinc-800 hover:border-white cursor-pointer group"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Context & Arch */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                     <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                     Problem Statement
                  </h4>
                  <p className="text-zinc-400 text-lg leading-relaxed font-light">
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                     <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                     Key Achievements
                  </h4>
                  <ul className="space-y-6">
                    {selectedProject.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-5 text-zinc-300">
                        <div className="w-6 h-6 rounded-full mt-0.5 bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-light leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Visual & Links */}
              <div className="lg:col-span-5 space-y-6 sticky top-6">
                <div className="aspect-video lg:aspect-square bg-zinc-900 rounded-[2rem] flex items-center justify-center overflow-hidden border border-zinc-800 relative shadow-inner">
                  {selectedProject.video ? (
                    /\.(webp|png|jpg|jpeg)$/.test(selectedProject.video) ? (
                      <img 
                        src={selectedProject.video} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video 
                        src={selectedProject.video} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="text-center p-10">
                      <p className="text-zinc-600 font-medium text-xs tracking-widest uppercase">Visuals Pending</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-zinc-950 text-center py-5 rounded-2xl font-bold hover:bg-accent transition-colors duration-300"
                  >
                    VISIT LIVE SITE
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-zinc-800 text-white text-center py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-colors duration-300"
                  >
                    VIEW REPOSITORY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Project;
