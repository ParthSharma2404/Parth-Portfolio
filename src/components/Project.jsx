import { useState } from "react";

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "AI Requirements Analyzer",
      description: "An AI-powered tool that analyzes software requirement documents and extracts structured insights using LLMs.",
      problem: "Manually analyzing large SRS documents is time consuming and error-prone.",
      tech: ["Django", "Python", "MongoDB", "NLP", "Llama 3"],
      video: "/videos/ai.mp4",
      live: "#",
      github: "https://github.com/ParthSharma2404/AI-PARSER-AND-TEST-CASE-GENERATOR"
    },
    {
      title: "Blogo",
      description: "A modern blogging platform with authentication and scalable backend architecture.",
      problem: "Many blogging platforms lack simplicity and scalability.",
      tech: ["React", "Node", "Express", "MongoDB", "JWT"],
      video: "/videos/blogo.mp4",
      live: "#",
      github: "https://github.com/ParthSharma2404/Blogo.---Not-Your-Average-Blogging-buddy-"
    },
    {
      title: "NITS Construction",
      description: "A responsive website built for a UK-based construction company.",
      problem: "The company lacked a modern digital presence.",
      tech: ["HTML", "TailwindCSS", "JavaScript", "PHP"],
      video: "/videos/nits.mp4",
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <div className="bg-zinc-900 border border-zinc-800 max-w-2xl w-full p-8 rounded-3xl relative animate-in fade-in zoom-in duration-300">
            <button
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="aspect-video bg-zinc-950 rounded-2xl mb-8 flex items-center justify-center overflow-hidden border border-zinc-800">
               <p className="text-zinc-600 font-medium">Video preview coming soon</p>
            </div>

            <h3 className="text-3xl font-display font-bold text-white mb-4">
              {selectedProject.title}
            </h3>

            <p className="text-zinc-400 mb-6 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-sm">
                <span className="text-white font-bold block mb-1">Challenge</span>
                <span className="text-zinc-400">{selectedProject.problem}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href={selectedProject.live}
                className="flex-1 bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors"
              >
                Live Demo
              </a>
              <a
                href={selectedProject.github}
                className="flex-1 border border-zinc-800 text-white text-center py-3 rounded-xl font-bold hover:bg-zinc-800 transition-colors"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Project;
