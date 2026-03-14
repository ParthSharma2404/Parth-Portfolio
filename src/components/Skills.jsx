import { useEffect, useState } from 'react';

const skills = [
  { name: "React", slug: "react" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", url: "https://simpleicons.org/icons/css.svg" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "MySQL", slug: "mysql" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Python", slug: "python" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C", slug: "c" },
  { name: "C++", slug: "cplusplus" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Firebase", slug: "firebase" },
  { name: "Netlify", slug: "netlify" },
];

const SkillIcon = ({ slug, name, index, url }) => {
  const randomDelay = (index % 5) * 0.5;
  const randomDuration = 4 + (index % 3);
  const iconUrl = url || `https://cdn.simpleicons.org/${slug}`;
  
  return (
    <div 
      className="relative group flex flex-col items-center justify-center p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:bg-zinc-800/60 animate-float"
      style={{
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        transform: `rotate(${(index % 3 - 1) * 5}deg)`
      }}
    >
      <img 
        src={iconUrl} 
        alt={name}
        className="w-12 h-12 md:w-16 md:h-16 object-contain brightness-0 invert opacity-60 group-hover:filter-none group-hover:opacity-100 transition-all duration-300 pointer-events-none"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${name}&background=18181b&color=ffffff&bold=true`;
          e.target.style.filter = 'none';
        }}
      />
      <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <span className="text-accent text-[10px] font-bold tracking-widest uppercase">{name}</span>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="skills">
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-20 text-center text-white reveal">
          Skills<span className="text-accent">.</span>
        </h2>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8 auto-rows-max items-center justify-items-center">
          {skills.map((skill, index) => (
            <div 
              key={skill.slug} 
              className={index % 2 === 0 ? "mt-12" : "mt-0"}
            >
              <SkillIcon {...skill} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
