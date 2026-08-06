"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    id: "01",
    year: "NOW",
    name: "0xEngine",
    type: "Systems project / multi-language build",
    stack: ["Go", "Python", "JavaScript"],
    note: "01 // A systems project built across Go, Python, and JavaScript. Work in progress, built in the open.",
    href: "https://github.com/0xkhush/0xEngine",
  },
  {
    id: "02",
    year: "2026",
    name: "Focus",
    type: "Chrome extension / distraction control",
    stack: ["JavaScript", "Chrome API", "DOM"],
    note: "02 // Rewired YouTube’s interface to remove distraction at the point of attention.",
    href: "https://github.com/0xkhush/focus",
  },
  {
    id: "03",
    year: "2026",
    name: "yt-filter-api",
    type: "ML classifier / productivity infra",
    stack: ["Python", "ML", "API"],
    note: "03 // A lean classifier for deciding whether a YouTube video earns the next click.",
    href: "https://github.com/0xkhush/yt-filter-api",
  },
  {
    id: "04",
    year: "NOW",
    name: "Open Source",
    type: "Public work / engineering in the open",
    stack: ["GitHub", "Community", "Shipping"],
    note: "04 // Experiments, contributions, and the unglamorous iteration that makes systems better.",
    href: "https://github.com/0xkhush",
  },
  {
    id: "05",
    year: "2026",
    name: "0xkhush.in",
    type: "Portfolio / interface experiment",
    stack: ["React", "TypeScript", "CSS"],
    note: "05 // This site: a signal, not a résumé. Built to move, inspect, and evolve.",
    href: "https://0xkhush.in",
  },
];

const links = [
  ["GH", "GitHub", "https://github.com/0xkhush"],
  ["IN", "LinkedIn", "https://www.linkedin.com/in/khushvendra-singh/"],
  ["CF", "Codeforces", "https://codeforces.com/profile/0xkhush"],
] as const;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  useEffect(() => {
    const changeProject = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      setActiveIndex((current) =>
        event.key === "ArrowDown"
          ? (current + 1) % projects.length
          : (current - 1 + projects.length) % projects.length,
      );
    };
    window.addEventListener("keydown", changeProject);
    return () => window.removeEventListener("keydown", changeProject);
  }, []);

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="0xkhush home"><span>_</span>0xkhush<span>_</span></a>
        <p className="system-state"><i /> SYSTEM / ONLINE</p>
        <a className="mail-link" href="mailto:0xkhush@gmail.com">EMAIL ↗</a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-kicker">[ KHV-001 ] // SOFTWARE DEVELOPER + BACKEND AI ENGINEER</div>
        <h1 id="hero-title">CODE<br />IN <em>MOTION</em><span className="title-block" /></h1>
        <div className="hero-sidecopy">
          <p>Khushvendra Singh builds backend systems, useful tools, and experiments that ship.</p>
          <a href="#work">EXPLORE WORK <b>↓</b></a>
        </div>
        <div className="coordinates">28.6139° N<br />77.2090° E<br /><span>INDIA / REMOTE</span></div>
        <div className="hero-mark" aria-hidden="true">✳</div>
      </section>

      <section className="manifesto" aria-label="Core skills">
        <p>// FIELD NOTES</p>
        <div className="statement">SYSTEMS THAT <span>THINK.</span><br />TOOLS THAT <span>MOVE.</span></div>
        <div className="skill-grid">
          {["Python", "Go", "C++", "Weaviate", "REST APIs", "LLM / RAG", "MongoDB", "Linux"].map((skill, index) => (
            <span key={skill}><b>{String(index + 1).padStart(2, "0")}</b>{skill}</span>
          ))}
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-line"><span>SELECTED WORK</span><span>05 PROJECTS / 2026</span></div>
        <div className="work-layout">
          <div>
            <h2 id="work-title">PROJECT<br /><em>ROSTER</em></h2>
            <p className="key-hint">USE ↑ ↓ KEYS / OR SELECT A SIGNAL</p>
          </div>
          <div className="project-list" role="tablist" aria-label="Portfolio projects">
            {projects.map((item, index) => (
              <button
                key={item.id}
                className={index === activeIndex ? "project-row active" : "project-row"}
                onClick={() => setActiveIndex(index)}
                role="tab"
                aria-selected={index === activeIndex}
              >
                <span>{item.id}</span><strong>{item.name}</strong><i>{item.year}</i><b>↗</b>
              </button>
            ))}
          </div>
        </div>
        <article className="project-detail" aria-live="polite">
          <div className="detail-meta"><span>ACTIVE_SIGNAL / {project.id}</span><span>{project.type}</span></div>
          <p>{project.note}</p>
          <div className="detail-bottom"><div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">OPEN PROJECT ↗</a></div>
        </article>
      </section>

      <section className="terminal" aria-label="Current focus">
        <div className="terminal-bar"><span>0xkhush@terminal:~</span><span>● ● ●</span></div>
        <p><i>$</i> current_focus <b>_</b></p>
        <div className="terminal-output">building better interfaces for attention.<br />studying systems, shipping in public, learning by doing.</div>
      </section>

      <footer>
        <div className="footer-intro"><p>EST. 2026 / DELHI, IN</p><h2>LET&apos;S BUILD<br /><em>SOMETHING</em>.</h2></div>
        <div className="socials">
          <a href="mailto:0xkhush@gmail.com">0xkhush@gmail.com ↗</a>
          {links.map(([short, label, href]) => <a key={short} href={href} target="_blank" rel="noreferrer"><span>{short}</span>{label} ↗</a>)}
        </div>
        <p className="footer-code">// NO TEMPLATES. NO NOISE.<br />JUST WORK IN MOTION.</p>
      </footer>
    </main>
  );
}
