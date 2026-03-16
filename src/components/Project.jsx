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
      video: null, // Removed broken path to trigger fallback
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

  return (
    <section className="px-6 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-white tracking-tight text-center">
          Selected Projects<span className="text-accent">.</span>
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl card-hover flex flex-col justify-between reveal reveal-delay-${(index + 1) * 100}`}
            >
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800/50 group-hover:text-accent transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-700 transition-all duration-300"
                  >
                    Details
                  </button>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#86bd22] text-black text-center px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Live
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6.354 11.354a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 0 1H2.707l3.647 3.646a.5.5 0 0 1 0 .708z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 md:p-6 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 max-w-3xl w-full p-6 md:p-10 rounded-3xl relative animate-in fade-in zoom-in duration-300 my-auto">
            {/* Header with Title and Close */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/30 bg-accent/5 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-full transition-all duration-300 shadow-xl border border-zinc-700"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Visual & Links */}
              <div className="space-y-6">
                <div className="aspect-video bg-zinc-950 rounded-2xl flex items-center justify-center overflow-hidden border border-zinc-800 relative shadow-2xl">
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
                    <div className="text-center p-6">
                      <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                        <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-zinc-500 font-medium text-sm italic">Video preview coming soon</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black text-center py-3.5 rounded-xl font-bold hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-zinc-800 text-white text-center py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Source Code
                  </a>
                </div>
              </div>

              {/* Right Column: Detailed Info */}
              <div className="space-y-8 h-full flex flex-col">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                       <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
                       The Challenge
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                       <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
                       Key Features
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.features?.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                          <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
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
