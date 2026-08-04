import { useState, useRef, useEffect } from "react";

const BackgroundVideo = ({ src, className }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
};

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "StudySync 2.0",
      description: "A real-time gamified study platform with WebRTC video rooms and RPG leveling.",
      problem: "Traditional study tools often lack engagement and feel monotonous. StudySync introduces gamification and interactive elements to make learning a more enjoyable and rewarding experience.",
      features: [
        "Real-time WebRTC Infrastructure: Powered by LiveKit for seamless, low-latency video and audio streaming within interactive study rooms.",
        "Scalable Gamification Engine: Node.js backend integrated with PostgreSQL (Neon) to handle complex state management for RPG leveling and streaks.",
        "Component-Driven UI Architecture: React-based SPA utilizing modern design patterns for animated micro-interactions and a dynamic Bento Grid layout.",
        "Secure Data Handling: Robust JWT authentication and efficient database querying ensuring transparent data security and high performance."
      ],
      tech: ["React.js", "Vite", "Node.js", "Express.js", "PostgreSQL", "LiveKit (WebRTC)", "Socket.io", "JWT", "Recharts"],
      video: "/videos/studysync.webp", 
      live: "https://studysync.fun",
      github: "#",
      colSpan: "md:col-span-2 lg:col-span-2", // Bento sizing
    },
    {
      title: "AI Requirements Analyzer",
      description: "LLM-powered tool to automate SRS document analysis and generate test cases.",
      problem: "Software Requirement Specification (SRS) documents are often hundreds of pages long. Manually extracting specific requirements, functional constraints, and test scenarios is labor-intensive, prone to human oversight, and significantly delays the development lifecycle.",
      features: [
        "Automated extraction of functional and non-functional requirements using Llama 3.",
        "Generation of comprehensive test cases based on identified requirements.",
        "Relationship mapping between different project modules.",
        "Exportable structured reports in JSON format for development teams."
      ],
      tech: ["Django", "MongoDB", "PyPDF2", "python-docx", "Regex", "NLP", "Llama 3 (Ollama)"],
      video: null, 
      live: "#",
      github: "https://github.com/ParthSharma2404/AI-PARSER-AND-TEST-CASE-GENERATOR",
      colSpan: "md:col-span-1 lg:col-span-1",
    },
    {
      title: "Blogo",
      description: "A high-performance blogging platform for modern storytellers with rich text editing.",
      problem: "Many blogging platforms are either too complex for casual users or lack the scalability and security required for professional creators. Existing solutions often struggle with slow content delivery and rigid formatting options.",
      features: [
        "Secure JWT-based authentication system for user data protection.",
        "Rich text editor for creating and formatting dynamic blog posts.",
        "Scalable MongoDB schema for high-performance content delivery.",
        "Responsive creator dashboard for managing profiles and engagement."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      video: "/videos/blogo.webp",
      live: "https://blogo-not-your-average-blogging-bud-nine.vercel.app/",
      github: "https://github.com/ParthSharma2404/Blogo.---Not-Your-Average-Blogging-buddy-",
      colSpan: "md:col-span-1 lg:col-span-1",
    },
    {
      title: "UNIVERSE",
      description: "A comprehensive MERN food ordering platform with QR-based ordering and real-time vendor dashboards.",
      problem: "Campus and large-scale venue food ordering is often chaotic, leading to long queues and inefficient vendor management. There's a need for a unified system handling real-time order tracking and automated financial settlements.",
      features: [
        "Real-Time Operations: Built with Socket.io for instantaneous order updates and WebSocket/Telegram notifications.",
        "Automated Financial Workflows: Deep Razorpay integration handling payments, refunds, and automated settlement workflows.",
        "Scalable Architecture: MERN stack deployment handling high concurrency, validated by a live pilot with 2,243+ users.",
        "Smart Analytics: Role-based dashboards with Recharts for visual data representation and Groq AI for insights."
      ],
      tech: ["React.js (Vite)", "Node.js", "Express.js", "MongoDB", "Socket.io", "Razorpay", "Groq AI", "JWT", "Recharts", "Vercel"],
      video: "/videos/universe_video copy.mp4", 
      live: "#",
      github: "#",
      colSpan: "md:col-span-2 lg:col-span-2",
    },
    {
      title: "NITS Construction",
      description: "Premium digital home for a UK construction company, optimized for lead conversion.",
      problem: "Traditional construction businesses often lack a digital presence that reflects their craftsmanship. A slow, outdated website can lead to loss of potential high-value clients and fails to showcase the company's portfolio effectively.",
      features: [
        "Performance-optimized architecture with sub-1s page load times.",
        "Interactive high-resolution project gallery with category filtering.",
        "Streamlined consultation booking system to capture quality leads.",
        "SEO-friendly structure optimized for local market search dominance."
      ],
      tech: ["HTML5", "Tailwind CSS", "JavaScript", "PHP", "Responsive Design", "SEO"],
      video: "/videos/nits.webp",
      live: "https://nitsconstructionltd.co.uk/",
      github: "#",
      colSpan: "md:col-span-2 lg:col-span-3", // Full width bottom row
    }
  ];

  return (
    <>
      <section className="relative px-6 py-32 min-h-screen bg-zinc-950 overflow-hidden" id="projects">
        
        {/* Deep background ambient glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Minimalist Premium Header */}
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter leading-tight mb-6">
                Selected Work<span className="text-accent">.</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                A curated collection of my most impactful projects spanning AI engineering, real-time systems, and scalable full-stack applications.
              </p>
            </div>
            <div className="hidden md:flex gap-2 items-center text-zinc-500 text-sm tracking-widest uppercase font-bold">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              Explore the grid
            </div>
          </div>

          {/* Premium Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800/80 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 ${project.colSpan}`}
              >
                
                {/* Background Visual */}
                {project.video ? (
                  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    {/\.(webp|png|jpg|jpeg)$/.test(project.video) ? (
                      <img 
                        src={project.video} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <BackgroundVideo 
                        src={project.video} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-zinc-800/50 to-zinc-950 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                    <svg className="w-32 h-32 text-zinc-800 transform group-hover:scale-110 transition-transform duration-700 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                )}

                {/* Heavy Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent group-hover:via-zinc-950/60 transition-colors duration-500" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl group-hover:text-zinc-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Top-Right Arrow Indicator */}
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 transform translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <svg className="w-5 h-5 text-white transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Premium Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-zinc-950 border border-zinc-800 max-w-5xl w-full p-6 md:p-12 rounded-[3rem] relative animate-in zoom-in-95 duration-300 my-auto shadow-2xl">
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
                className="p-4 bg-zinc-900 hover:bg-white text-zinc-400 hover:text-zinc-950 rounded-full transition-all duration-300 shadow-xl border border-zinc-800 hover:border-white cursor-pointer group shrink-0 ml-4"
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
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
                <div className="aspect-video lg:aspect-square bg-zinc-900 rounded-[2rem] flex items-center justify-center overflow-hidden border border-zinc-800 relative shadow-inner">
                  {selectedProject.video ? (
                    /\.(webp|png|jpg|jpeg)$/.test(selectedProject.video) ? (
                      <img 
                        src={selectedProject.video} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BackgroundVideo 
                        src={selectedProject.video} 
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
