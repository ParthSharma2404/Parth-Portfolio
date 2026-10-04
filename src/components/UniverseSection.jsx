import React, { useState, useRef, useEffect } from "react";

const UniverseSection = () => {
  const [activeMedia, setActiveMedia] = useState("banner"); // 'banner' | 'video'
  const videoRef = useRef(null);

  useEffect(() => {
    if (activeMedia === "video" && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => console.log("Video autoplay prevented:", err));
    }
  }, [activeMedia]);

  const metrics = [
    {
      value: "2,240+",
      label: "Active Users Served",
      description: "Validated during live campus pilot with real-time student ordering concurrency."
    },
    {
      value: "< 80ms",
      label: "Socket.io Event Sync",
      description: "Bidirectional WebSocket latency powering instant kitchen display state transitions."
    },
    {
      value: "100%",
      label: "Automated Payouts",
      description: "Fault-tolerant Razorpay webhook architecture with instant refund & settlement queues."
    },
    {
      value: "99.9%",
      label: "Production Uptime",
      description: "High concurrency reliability throughout heavy lunch rush dining peaks."
    }
  ];

  const architectureHighlights = [
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-Time Event Orchestration",
      description: "Engineered WebSocket channels with Socket.io syncing customer mobile clients, kitchen POS terminals, and instant Telegram alert bots in real time."
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Idempotent Financial Pipelines",
      description: "Integrated Razorpay payment gateways with webhook idempotency keys to eliminate double-charges, handling automated vendor splits and refund workflows."
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Multi-Role Dashboards & Telemetry",
      description: "Role-based access separating Super-Admins, Vendor Kitchens, and Students with interactive Recharts analytics and Groq AI order insights."
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 4h16M8 4v4" />
        </svg>
      ),
      title: "Relational Data Integrity (PERN)",
      description: "Structured PostgreSQL relational schema with connection pooling, index optimization, and strict ACID transaction guarantees under load."
    }
  ];

  const techStack = [
    "PERN Stack",
    "React.js (Vite)",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "AWS EC2",
    "AWS RDS",
    "AWS VPC",
    "AWS S3",
    "Socket.io",
    "Razorpay",
    "Groq AI",
    "Tailwind CSS"
  ];

  return (
    <section className="relative px-6 py-28 md:py-36 bg-zinc-950 overflow-hidden" id="universe">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[180px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/10 blur-[160px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Top Header Pill */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Flagship Startup &bull; Shipped 0 to 1
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Live in Production: <a href="https://food.universeorder.co.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent underline transition-colors">food.universeorder.co.in</a>
            </span>
          </div>
        </div>

        {/* 2-Column Split Hero Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20">
          
          {/* Left Column: Product Info & Engineering Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tighter leading-tight mb-4">
                UniVerse<span className="text-orange-500">.</span>
              </h2>
              <p className="text-xl md:text-2xl text-zinc-200 font-display font-medium">
                Next-Gen Campus Dining & Multi-Vendor OS
              </p>
            </div>

            <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
              Architected and built as <span className="text-white font-medium">Founding Full-Stack Engineer</span>. 
              UniVerse completely eliminates campus dining lines with instantaneous QR ordering, live kitchen display dispatching, and automated vendor settlements.
            </p>

            {/* Quick Specs Pill Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium rounded-full hover:border-orange-500/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://food.universeorder.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-zinc-950 font-bold text-sm tracking-wide hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>Visit Live Platform</span>
                <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <button
                onClick={() => setActiveMedia(activeMedia === "video" ? "banner" : "video")}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold text-sm hover:bg-zinc-800 hover:text-white transition-all duration-300 cursor-pointer"
              >
                {activeMedia === "video" ? (
                  <>
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>View Graphic Banner</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Play Video Demo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Natural Showcase Card without ugly cropping */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-zinc-800/80 to-zinc-900/50 border border-zinc-800 shadow-2xl overflow-hidden group">
              
              {/* Media Switcher Pill Overlay */}
              <div className="absolute top-4 right-4 z-20 flex gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setActiveMedia("banner")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeMedia === "banner"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Graphic
                </button>
                <button
                  onClick={() => setActiveMedia("video")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeMedia === "video"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Video Demo
                </button>
              </div>

              {/* Media Container (Natural 16:9 ratio, clean rounded corners) */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 flex items-center justify-center">
                {activeMedia === "banner" ? (
                  <img
                    src="/images/universe_banner.png"
                    alt="UniVerse Vendor OS - Run Your Food Business With Ease"
                    className="w-full h-full object-contain bg-white"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src="/videos/universe_video copy.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Hard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-orange-500/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">
                {metric.value}
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-zinc-200 mb-2">
                {metric.label}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enterprise Cloud Architecture & Systems Solved */}
        <div className="rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800/80 p-8 md:p-12">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400 mb-2">
              Engineering Deep-Dive
            </div>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
              Production Architecture & Core Systems Solved
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {architectureHighlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
              >
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 shrink-0 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated AWS Cloud & Security Stack */}
          <div className="p-6 md:p-8 rounded-2xl bg-zinc-950/90 border border-zinc-800/90">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Production AWS Cloud & Security Topology
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="text-xs font-mono font-bold text-orange-400 mb-1">AWS EC2</div>
                <div className="text-white font-semibold text-sm mb-1">Full-Stack Compute</div>
                <p className="text-zinc-400 text-xs font-light">Hosts the React SPA frontend and Node/Express backend with reverse proxy routing.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="text-xs font-mono font-bold text-blue-400 mb-1">AWS RDS (PostgreSQL)</div>
                <div className="text-white font-semibold text-sm mb-1">Managed Relational DB</div>
                <p className="text-zinc-400 text-xs font-light">ACID-compliant relational schema, indexed order pipelines, and transaction integrity.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="text-xs font-mono font-bold text-emerald-400 mb-1">AWS VPC</div>
                <div className="text-white font-semibold text-sm mb-1">Isolated Security Layer</div>
                <p className="text-zinc-400 text-xs font-light">Private cloud network boundary shielding internal databases from public exposure.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="text-xs font-mono font-bold text-yellow-400 mb-1">AWS S3</div>
                <div className="text-white font-semibold text-sm mb-1">Object Storage</div>
                <p className="text-zinc-400 text-xs font-light">Scalable, secure storage for vendor catalog images, assets, and receipts.</p>
              </div>
            </div>
          </div>

          {/* Bottom Live Link Action */}
          <div className="mt-10 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm text-zinc-300 font-medium">
                Live Deployment Active at <span className="text-white font-mono font-bold">food.universeorder.co.in</span>
              </span>
            </div>

            <a
              href="https://food.universeorder.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-orange-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-zinc-950 transition-colors duration-300"
            >
              Launch Live App &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default UniverseSection;
