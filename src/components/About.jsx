import { useState, useEffect } from "react";

function About() {
  const [activeTab, setActiveTab] = useState("about.md");
  const [isInteracting, setIsInteracting] = useState(false);

  // Auto-cycle tabs to show interactivity
  useEffect(() => {
    if (isInteracting) return;
    
    const tabs = ["about.md", "focus.json", "certifications.yml"];
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        return tabs[(currentIndex + 1) % tabs.length];
      });
    }, 4000); // Change tab every 4 seconds

    return () => clearInterval(interval);
  }, [isInteracting]);

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

  return (
    <section className="relative min-h-screen max-w-5xl mx-auto px-6 py-24 flex flex-col justify-center overflow-hidden" id="about">
      
      {/* Decorative Blobs */}
      <div className="bg-mesh-blob w-[400px] h-[400px] bg-accent/10 top-[-10%] left-[-10%] animate-pulse" />
      <div className="bg-mesh-blob w-[300px] h-[300px] bg-white/5 bottom-[10%] right-[-5%] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          About Me<span className="text-accent">.</span>
        </h2>
        <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-8 mb-4"></div>
      </div>

      {/* Interactive IDE Window */}
      <div 
        className="w-full rounded-xl bg-[#0d1117] border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden flex flex-col relative z-10 reveal"
        onMouseEnter={() => setIsInteracting(true)}
        onClick={() => setIsInteracting(true)}
      >
        
        {/* macOS Header */}
        <div className="h-12 bg-[#161b22] border-b border-zinc-800 flex items-center px-4 gap-2 relative select-none">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 cursor-pointer" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 cursor-pointer" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 cursor-pointer" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-zinc-400 text-xs font-mono font-medium tracking-wider">parth-sharma — portfolio-ide</span>
          </div>
        </div>

        {/* IDE Body */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-56 bg-[#161b22] border-r border-zinc-800 flex flex-col p-4 gap-1 select-none">
             <span className="text-[10px] font-mono text-zinc-500 mb-3 uppercase tracking-widest font-bold px-2">Explorer</span>
             
             {["about.md", "focus.json", "certifications.yml"].map(tab => (
               <button 
                 key={tab}
                 onClick={() => {
                   setActiveTab(tab);
                   setIsInteracting(true);
                 }}
                 className={`text-left px-3 py-2 rounded-lg font-mono text-sm transition-all duration-200 flex items-center justify-between group
                   ${activeTab === tab 
                     ? 'bg-[#0d1117] text-accent border border-zinc-800/50' 
                     : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border border-transparent'}`}
               >
                 <div className="flex items-center gap-3">
                   <span className="text-lg group-hover:scale-110 transition-transform">
                     {tab.endsWith('.md') ? '📝' : tab.endsWith('.json') ? '📋' : '📑'}
                   </span>
                   {tab}
                 </div>
                 {/* Visual hint that it's clickable */}
                 {activeTab !== tab && !isInteracting && (
                   <span className="w-2 h-2 rounded-full bg-accent animate-ping opacity-75"></span>
                 )}
               </button>
             ))}
          </div>

          {/* Editor Area */}
          <div className="flex-1 p-6 md:p-10 bg-[#0d1117] font-mono text-sm md:text-[15px] leading-relaxed overflow-x-auto relative">
            
            {/* Line Numbers Decoration */}
            <div className="hidden md:flex flex-col text-zinc-700 absolute left-4 top-10 select-none text-right w-6">
              {[...Array(15)].map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            <div className="md:pl-8">
              {/* Render about.md */}
              {activeTab === 'about.md' && (
                <div className="text-zinc-300 space-y-6 animate-fade-in">
                  <p>
                    <span className="text-blue-400">#</span> <span className="font-bold text-white text-2xl tracking-tight">Hello, World!</span>
                  </p>
                  <p className="text-zinc-400">
                    My journey in development started with curiosity about how software works behind the scenes.
                  </p>
                  <p className="text-zinc-400">
                    Today, that curiosity has evolved into building <span className="text-green-400 font-medium">full-stack applications</span>, 
                    <span className="text-yellow-400 font-medium"> AI-driven tools</span>, and 
                    <span className="text-purple-400 font-medium"> real-world products</span>. 
                  </p>
                  <p className="text-zinc-500 italic mt-8">
                    {"/*"} I enjoy turning complex ideas into scalable digital solutions using modern technologies. {"*/"}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-8 text-accent animate-pulse">
                    <span className="text-xl">█</span>
                  </div>
                </div>
              )}

              {/* Render focus.json */}
              {activeTab === 'focus.json' && (
                <div className="text-zinc-300 animate-fade-in">
                  <p className="text-yellow-300">{"{"}</p>
                  <div className="pl-4 md:pl-8 border-l border-zinc-800">
                    <p className="text-purple-400">"current_focus"<span className="text-zinc-300">: [</span></p>
                    <div className="pl-4 md:pl-8 border-l border-zinc-800 mt-2 mb-2 space-y-4">
                      {focusAreas.map((area, i) => (
                        <div key={i} className="group cursor-default hover:bg-zinc-800/30 p-2 -ml-2 rounded transition-colors">
                          <span className="text-yellow-300">{"{"}</span>
                          <div className="pl-4 md:pl-8">
                            <p>
                              <span className="text-blue-400">"title"</span>: <span className="text-green-400">"{area.title}"</span>,
                            </p>
                            <p>
                              <span className="text-blue-400">"description"</span>: <span className="text-orange-300">"{area.description}"</span>
                            </p>
                          </div>
                          <span className="text-yellow-300">{"}"}{i !== focusAreas.length - 1 ? ',' : ''}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-zinc-300">{"]"}</p>
                  </div>
                  <p className="text-yellow-300">{"}"}</p>
                </div>
              )}

              {/* Render certifications.yml */}
              {activeTab === 'certifications.yml' && (
                <div className="text-zinc-300 animate-fade-in">
                  <p className="text-zinc-500 italic mb-8"># Click the certificate names to view credentials</p>
                  <div className="space-y-6">
                    {certificates.map((cert, i) => (
                      <div key={i} className="group">
                        <p className="text-pink-400 flex items-center gap-2">
                          - <a 
                              href={cert.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 font-bold hover:text-accent hover:underline decoration-accent transition-colors"
                            >
                              "{cert.name}"
                            </a>
                        </p>
                        <div className="pl-4 md:pl-8 border-l border-zinc-800/50 mt-1 space-y-1">
                          <p className="text-zinc-400">issuer: <span className="text-yellow-300">"{cert.issuer}"</span></p>
                          <p className="text-zinc-400">verified: <span className="text-orange-400">true</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;