function Internship() {
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

  return (
    <section className="min-h-screen px-6 py-24 flex flex-col items-center bg-zinc-950" id="internship">

      <div className="w-full max-w-4xl text-left mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight reveal">
          Internships<span className="text-accent">.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {internships.map((intern, index) => (
          <div 
            key={index} 
            className={`group relative bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl card-hover overflow-hidden reveal reveal-delay-${(index + 1) * 150}`}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  {intern.role}
                </h3>
                <p className="text-zinc-400 font-medium">
                  {intern.company} <span className="text-zinc-600 mx-2">—</span> {intern.location}
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full w-fit">
                {intern.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
              {intern.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {intern.tech.map((t) => (
                  <span key={t} className="text-xs font-semibold text-zinc-500 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800/50 group-hover:text-accent transition-colors duration-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Certificate Button */}
              <a 
                href={intern.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit px-6 py-3 bg-accent text-zinc-950 font-bold text-sm rounded-xl hover:bg-white transition-all duration-300 transform group-hover:scale-105"
              >
                View Certificate
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                  <path d="M4.5 11h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0-2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0-2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
                </svg>
              </a>
            </div>

            {/* Accent Blur */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-colors" />
          </div>
        ))}
      </div>

    </section>
  );
}

export default Internship;
