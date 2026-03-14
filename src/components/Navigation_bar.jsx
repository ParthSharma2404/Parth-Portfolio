function Navigation_bar() {
  const nav_items = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Internship", href: "#internship" },
    { name: "Projects", href: "#projects" },
    { name: "Work", href: "#work" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 md:px-12 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-2xl font-display font-bold tracking-tight text-white">
        Parth<span className="text-accent">.</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-10">
        {nav_items.map((item) => (
          <a 
            href={item.href} 
            key={item.name} 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Button */}
      <a 
        href="#contact"
        className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-zinc-200 transition-all duration-200"
      >
        Connect
      </a>

    </nav>
  );
}

export default Navigation_bar;