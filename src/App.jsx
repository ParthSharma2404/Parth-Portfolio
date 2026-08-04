import React, { useEffect, Suspense, lazy } from "react";
import NavigationBar from "./components/Navigation_bar";
import Hero from "./components/Hero";
import CursorFollower from "./components/CursorFollower";
import MusicPlayer from "./components/MusicPlayer";

const About = lazy(() => import("./components/About"));
const Work = lazy(() => import("./components/Work"));
const Project = lazy(() => import("./components/Project"));
const Contact = lazy(() => import("./components/Contact"));
const Skills = lazy(() => import("./components/Skills"));
const CodingStats = lazy(() => import("./components/CodingStats"));
const Internship = lazy(() => import("./components/Internship"));


import './App.css'

function App() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    // Observe changes to the DOM (for dynamic content)
    const mutationObserver = new MutationObserver(() => {
      const currentRevealElements = document.querySelectorAll(".reveal:not(.reveal-visible)");
      currentRevealElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <main className="bg-zinc-950 text-white selection:bg-white selection:text-black">
      <MusicPlayer />
      <CursorFollower />
      <NavigationBar />
      <div id="hero">
        <Hero />
      </div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center text-zinc-700 animate-pulse">Loading section...</div>}>
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="stats">
          <CodingStats />
        </div>
        <div id="internship">
          <Internship />
        </div>
        <div id="work">
          <Work />
        </div>
        <div id="projects">
          <Project />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </Suspense>
    </main>
  );
}

export default App;
