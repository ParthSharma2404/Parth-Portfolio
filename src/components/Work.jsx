function Work() {
  const experiences = [
    {
      role: "Full Stack Web Developer",
      company: "NITS Construction Ltd",
      location: "London",
      period: "2023",
      description: "Developed and deployed a responsive business website for a UK-based construction company with modern UI and optimized performance.",
      tech: ["HTML", "TailwindCSS", "JavaScript", "PHP"],
      live: "https://nitsconstructionltd.co.uk/"
    },
    {
      role: "Web Developer",
      company: "SS Enterprises",
      location: "Gurgaon",
      period: "2022",
      description: "Built a responsive telecom service website showcasing company services while improving performance and user experience.",
      tech: ["HTML", "CSS", "JavaScript", "PHP"],
      live: "https://wesse.in/"
    }
  ];

  return (
    <section className="min-h-screen px-6 py-24 flex flex-col items-center" id="work">

      <div className="w-full max-w-4xl text-left mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight reveal">
          Experience<span className="text-accent">.</span>
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className={`group relative bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl card-hover overflow-hidden reveal reveal-delay-${(index + 1) * 150}`}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  {exp.role}
                </h3>
                <p className="text-zinc-400 font-medium">
                  {exp.company} <span className="text-zinc-600 mx-2">—</span> {exp.location}
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full w-fit">
                {exp.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
              {exp.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="text-xs font-semibold text-zinc-500 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800/50 group-hover:text-accent transition-colors duration-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Live Button */}
              <a 
                href={exp.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit px-6 py-3 bg-zinc-800 text-[#86bd22] font-bold text-sm rounded-xl hover:bg-white hover:text-black transition-all duration-300 transform group-hover:scale-105 border border-zinc-700 hover:border-white"
              >
                Visit Site
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
              </a>
            </div>

            {/* Accent Blur */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
          </div>
        ))}
      </div>

    </section>
  );
}

export default Work;
