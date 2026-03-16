import { useState } from "react";

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
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

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="relative px-6 py-24 min-h-screen bg-zinc-950 overflow-hidden" id="projects">
      
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight reveal">
            Selected Lab Projects<span className="text-accent">.</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto reveal reveal-delay-100">
            A showcase of my recent work in AI agents, full-stack applications, and performant web products.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseMove={handleMouseMove}
              className={`glow-card group bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-[2.5rem] flex flex-col justify-between transition-all duration-300 reveal reveal-delay-${(index + 1) * 100} hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2`}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                  <svg className="w-6 h-6 text-zinc-500 group-hover:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     {index === 0 ? (
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                     ) : index === 1 ? (
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 2v4h4" />
                     ) : (
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                     )}
                  </svg>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800/50 group-hover:border-accent/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 bg-zinc-800/80 text-white px-4 py-3 rounded-xl text-xs font-bold hover:bg-white hover:text-zinc-950 transition-all duration-300 cursor-pointer"
                >
                  DETAILS
                </button>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-accent text-zinc-950 text-center px-4 py-3 rounded-xl text-xs font-bold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent/10"
                >
                  LIVE SITE
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 md:p-6 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 max-w-4xl w-full p-6 md:p-10 rounded-[3rem] relative animate-in fade-in zoom-in duration-300 my-auto shadow-2xl">
            {/* Header with Title and Close */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/30 bg-accent/10 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="p-3 bg-zinc-800 hover:bg-white text-zinc-400 hover:text-zinc-950 rounded-full transition-all duration-300 shadow-xl border border-zinc-700 hover:border-white cursor-pointer"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Visual & Links */}
              <div className="lg:col-span-7 space-y-6">
                <div className="aspect-video bg-zinc-950 rounded-[2rem] flex items-center justify-center overflow-hidden border border-zinc-800 relative shadow-inner">
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
                      <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zinc-800 shadow-xl">
                        <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-zinc-500 font-medium text-sm italic tracking-wide">Detailed documentation and preview coming soon</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-zinc-950 text-center py-4 rounded-2xl font-bold hover:bg-accent hover:text-zinc-950 transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-lg"
                  >
                    VISIT LIVE SITE
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-zinc-800 text-white text-center py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all duration-500 hover:scale-[1.02] active:scale-95"
                  >
                    REPOSITORY
                  </a>
                </div>
              </div>

              {/* Right Column: Detailed Info */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                       Project Context
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       Core Architecture
                    </h4>
                    <ul className="space-y-4">
                      {selectedProject.features?.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-zinc-400 group/feature">
                          <div className="w-5 h-5 rounded flex-shrink-0 mt-0.5 border border-accent/20 flex items-center justify-center group-hover/feature:bg-accent/10 transition-colors">
                            <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-light leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Project;
