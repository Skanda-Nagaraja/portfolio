/* global React, ReactDOM */

const THEME = {
  bg: '#0A0908',
  surface: '#22333B',
  text: '#EAE0D5',
  accent: '#C6AC8F',
  muted: '#5E503F'
};

const PDF_PATH = encodeURI('Skanda_Nagaraja_Resume copy.pdf');

const defaultProfile = {
  name: 'Skanda Nagaraja',
  roles: ['Software Engineer', 'Full-Stack Developer', 'Data Scientist', 'Machine Learning Engineer'],
  summary: 'High-velocity CS senior leveraging stats + AI to build impactful software and drive innovation in real-world engineering teams.',
  location: 'Austin, TX',
  email: 'mailto:skannagaraja@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Skanda-Nagaraja' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/skanda-nagaraja-84b9471a6/' },
  ],
  experience: [
    {
      company: 'Nike',
      role: 'Machine Learning Engineer Intern',
      period: 'Summer 2025 — Beaverton, OR',
      bullets: [
        'Built backend microservices on AWS SageMaker and Databricks to serve model-optimization endpoints for real‑time product analytics.',
        'Prototyped text‑to‑image workflows and refined prompt engineering + RAG pipelines to power an AI design tool for shoe designers in Slack.'
      ],
      tech: ['AWS SageMaker', 'Databricks', 'Python', 'RAG', 'GenAI', 'Slack']
    },
    {
      company: 'Fluke (Fortive)',
      role: 'Software Engineering & Architecture Intern',
      period: 'Summer 2024 — Everett, WA',
      bullets: [
        'Led refactors and migrations across 5+ cross‑functional projects to modernize enterprise architecture and improve long‑term scalability.',
        'Orchestrated Oracle report parsing with PySpark and Azure DevOps, accelerating CRM data updates by 30%.'
      ],
      tech: ['PySpark', 'Azure DevOps', 'Oracle', 'Python', 'Architecture']
    },
    {
      company: 'Sanofi',
      role: 'Data Science & Deep Learning Intern',
      period: 'Summer 2023 — Bridgewater, NJ',
      bullets: [
        'Automated ingestion from 3 disparate sources into Snowflake, enabling real‑time market insights for a 20‑member cross‑functional team.',
        'Built an ML pipeline to analyze pharmaceutical sales, identified profitability drivers, and presented actions that addressed major budget overruns.'
      ],
      tech: ['Python', 'Snowflake', 'ETL', 'ML']
    }
  ],
  projects: [
    {
      name: 'SHIELDS — L3 Harris Capstone',
      description: 'Agentic remediation framework that autonomously triages and patches system vulns; improved closure rates by 65%. Designed LLM‑driven flows integrating Nessus and OpenSCAP via Pydantic schemas and FastAPI microservices; architecture later featured in a peer‑reviewed AI paper.',
      tech: ['Python', 'FastAPI', 'Pydantic', 'Nessus', 'OpenSCAP', 'OpenRouter', 'RAG'],
      links: [{ label: 'Overview', href: '#' }]
    },
    {
      name: 'Panda Express POS System',
      description: 'Customer‑facing kiosk + real‑time manager dashboard. Processed ~15 orders/hr, driving a 20% lift in order volume; full‑stack PostgreSQL APIs for orders, staffing, and sales reporting; led agile sprints for a 5‑person team.',
      tech: ['Next.js', 'React', 'shadcn/ui', 'PostgreSQL'],
      links: [{ label: 'Demo', href: '#' }]
    },
    {
      name: 'Quant Wise',
      description: 'Flask backtesting engine on Yahoo Finance data enabling 10+ years of simulations; 30+ TA‑Lib indicators in a React dashboard; automated daily signal ingestion with Python + CRON.',
      tech: ['Next.js', 'Flask', 'TradingView', 'TA‑Lib', 'Python', 'CRON'],
      links: [{ label: 'Demo', href: '#' }]
    },
    {
      name: 'MoneyMind',
      description: 'Gamified financial education platform using generative AI. Next.js frontend with interactive learning flows; OpenAI‑powered personalized quizzes and guidance; MongoDB persistence.',
      tech: ['Next.js', 'MongoDB', 'React', 'OpenAI'],
      links: [{ label: 'Overview', href: '#' }]
    }
  ],
  skills: {
    Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C/C++', 'SQL', 'x86 Assembly'],
    'Frameworks & Libraries': ['React', 'Next.js', 'Flask', 'PyTorch', 'HuggingFace', 'TA-Lib'],
    Databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Snowflake'],
    Tools: ['Docker', 'Azure DevOps', 'Power Automate', 'Git', 'Agile/Scrum', 'Databricks', 'Wireshark'],
    Other: ['REST APIs', 'Power BI', 'TradingView', 'AWS', 'Project Management', 'Security Penetration Testing', 'OWASP Top 10']
  },
  awards: [
    { name: 'Meloy Entrepreneurial Fellow', desc: 'MEIEP recognition for high‑potential Aggie leaders; speaker series + industry mentorship.' },
    { name: "Dean's Honor Roll", desc: 'Awarded for cumulative GPA of 3.7+.' }
  ],
  interests: ['Formula 1', 'Cooking', 'Music', 'Mountain biking']
};

function useScrollReveal() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useTypewriter(text, speed = 40, startDelay = 0) {
  const [display, setDisplay] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    let timer = 0;
    let startTimer = setTimeout(step, startDelay);
    function step() {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i += 1;
        timer = window.setTimeout(step, speed);
      }
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(startTimer);
    };
  }, [text, speed, startDelay]);
  return display;
}

function BackgroundCanvas() {
  React.useEffect(() => {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));
    const stroke = 'rgba(198,172,143,0.35)';
    const fill = 'rgba(198,172,143,0.8)';

    function step() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      // connections
      ctx.strokeStyle = stroke;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 140 * 140) {
            ctx.globalAlpha = 1 - dist2 / (140 * 140);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      // dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = innerWidth + 10;
        if (p.x > innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = innerHeight + 10;
        if (p.y > innerHeight + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return null;
}

function Navbar({ name, email, socials }) {
  const navRef = React.useRef(null);
  const toggle = () => {
    const nav = navRef.current;
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
  };
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label={`${name} home`}>
          <span className="brand-badge">SN</span>
          <span className="brand-text">{name}</span>
        </a>
        <nav className="site-nav" aria-label="Primary" ref={navRef} aria-expanded="false">
          <button className="nav-toggle" aria-label="Toggle navigation" onClick={toggle}>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </button>
          <ul id="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#awards">Awards</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero({ name, roles, summary }) {
  const [roleIdx, setRoleIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);
  const GREETING = "Hi, I'm ";
  const greetingTyped = useTypewriter(GREETING, 28, 150);
  const nameDelay = 150 + GREETING.length * 28 + 120;
  const nameTyped = useTypewriter(name, 38, nameDelay);
  return (
    <section className="hero container" id="home">
      <h1 className="headline type-line" aria-live="polite">
        <span className="greeting">{greetingTyped}</span>
        <span className="name">
          {nameTyped}
          <span className="caret" aria-hidden="true"></span>
        </span>
      </h1>
      <p className="subheadline" aria-live="polite">{roles[roleIdx]}</p>
      <div className="cta-row">
        <a className="btn primary" href={PDF_PATH} download>Download Resume</a>
        <a className="btn ghost" href="#projects">Explore Projects</a>
      </div>
    </section>
  );
}

function About({ profile }) {
  useScrollReveal();
  return (
    <section id="about" className="section container">
      <h2 className="section-title">About</h2>
      <div className="about-grid reveal">
        <div className="about-card">
          <p>{profile.summary}</p>
          <p><strong>Location:</strong> {profile.location || '—'}</p>
          <p><strong>Interests:</strong> {profile.interests?.join(' • ')}</p>
        </div>
        <div className="about-card">
          <p><strong>Currently:</strong> Open to impactful new graduate opportunities.</p>
          <p><strong>Focus:</strong> Software development, data science, and machine learning.</p>
        </div>
      </div>
    </section>
  );
}

function Experience({ experience }) {
  useScrollReveal();
  return (
    <section id="experience" className="section container">
      <h2 className="section-title">Experience</h2>
      <ol className="timeline reveal">
        {experience.map((job, i) => (
          <li className="timeline-item" key={i}>
            <div>
              <div className="role">{job.role}</div>
              <div className="period">{job.period}</div>
              <div className="company" style={{ opacity: .85 }}>{job.company}</div>
            </div>
            <div>
              <ul>
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <div style={{ marginTop: 8 }}>
                {job.tech.map((t, j) => <span className="chip" key={j}>{t}</span>)}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects({ projects }) {
  useScrollReveal();
  return (
    <section id="projects" className="section container">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid reveal">
        {projects.map((p, i) => (
          <article className="project-card" key={i}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div style={{ margin: '8px 0' }}>
              {p.tech.map((t, j) => <span className="chip" key={j}>{t}</span>)}
            </div>
            <div className="project-links">
              {p.links.map((l, j) => (
                <a key={j} className="btn" href={l.href} target="_blank" rel="noopener">{l.label}</a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills({ skills }) {
  useScrollReveal();
  return (
    <section id="skills" className="section container">
      <h2 className="section-title">Skills</h2>
      <div className="skills-list reveal">
        {Object.entries(skills).map(([group, items]) => (
          <div className="skill-group" key={group}>
            <h4>{group}</h4>
            <div className="skill-tags">
              {items.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Awards({ awards }) {
  useScrollReveal();
  if (!awards || awards.length === 0) return null;
  return (
    <section id="awards" className="section container">
      <h2 className="section-title">Awards</h2>
      <div className="reveal">
        {awards.map((a, i) => (
          <div key={i} className="about-card" style={{ marginBottom: 12 }}>
            <strong>{a.name}</strong>
            {a.org ? <> — <span style={{ opacity: .9 }}>{a.org}</span></> : null}
            {a.period ? <div className="period" style={{ opacity: .8 }}>{a.period}</div> : null}
            {a.desc ? <div style={{ marginTop: 4, opacity: .9 }}>{a.desc}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Resume() {
  useScrollReveal();
  return (
    <section id="resume" className="section container">
      <h2 className="section-title">Resume</h2>
      <div className="resume-embed reveal" style={{ display: 'grid', gap: 10 }}>
        <p style={{ margin: 0, opacity: .9 }}>Prefer a copy? Download the PDF below.</p>
        <div className="cta-row">
          <a className="btn primary" href={PDF_PATH} download>Download Resume (PDF)</a>
        </div>
      </div>
    </section>
  );
}

function Contact({ email, socials }) {
  useScrollReveal();
  const handleDownload = () => {
    const json = JSON.stringify(defaultProfile, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  return (
    <section id="contact" className="section container">
      <h2 className="section-title">Contact</h2>
      <div className="contact-card reveal">
        <p>Want to collaborate or have an opportunity in mind?</p>
        <div className="cta-row">
          <a className="btn primary" href={email}>Email Me</a>
          <button className="btn ghost" onClick={handleDownload}>Download Profile JSON</button>
        </div>
        <div className="socials" style={{ marginTop: 8 }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener">{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ name }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <div className="socials">
          <a href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [profile, setProfile] = React.useState(defaultProfile);
  React.useEffect(() => {
    for (const [k, v] of Object.entries(THEME)) {
      document.documentElement.style.setProperty(`--theme-${k}`, v);
    }
    // Try to fetch an external profile.json; silently fall back to default
    fetch('./profile.json')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setProfile({ ...defaultProfile, ...data }))
      .catch(() => {});
  }, []);
  return (
    <>
      <BackgroundCanvas />
      <Navbar name={profile.name} email={profile.email} socials={profile.socials} />
      <main className="site-main">
        <Hero name={profile.name} roles={profile.roles} summary={profile.summary} />
        <About profile={profile} />
        <Experience experience={profile.experience} />
        <Projects projects={profile.projects} />
        <Skills skills={profile.skills} />
        <Awards awards={profile.awards} />
        <Resume />
        <Contact email={profile.email} socials={profile.socials} />
      </main>
      <Footer name={profile.name} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);


