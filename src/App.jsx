import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import './App.css'

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const NAV_ITEMS = [
  ['hero', 'Home'],
  ['domain', 'Domain'],
  ['milestones', 'Milestones'],
  ['documents', 'Documents'],
  ['presentations', 'Presentations'],
  ['team', 'About us'],
  ['contact', 'Contact us'],
]

const RESEARCH_PROBLEMS = [
  {
    label: 'Fragmentation',
    title: 'Fragmented Learning Tools',
    text: 'Current Sinhala learning tools are specialized and isolated, requiring parents to switch between multiple platforms. An integrated, unified system that delivers adaptive learning support in a single environment is missing.',
  },
  {
    label: 'Observation',
    title: 'Limited Learning Observation',
    text: 'Conventional assessments capture only final answers. Digital learning can also reveal the process — hesitation, correction, effort, speech and progress over time — yet most tools ignore these behavioral signals.',
  },
  {
    label: 'Adaptation',
    title: 'Static Learning Paths',
    text: 'Existing educational apps use one-size-fits-all content. Personalized, adaptive difficulty adjustment based on real-time behavioral telemetry and mastery state is still missing in Sinhala-first platforms.',
  },
  {
    label: 'Explainability',
    title: 'Opaque Model Decisions',
    text: 'Few child learning systems explain their analytical decisions. Parents and specialists need transparent, interpretable summaries of how the system assesses a child\'s learning patterns.',
  },
]

const RESEARCH_GAPS = [
  {
    icon: '🔬',
    title: 'Local Language Gap',
    text: 'Few AI-driven systems combine Sinhala learning content with behavioral telemetry, speech evidence, and real-time adaptation in one coherent workflow.',
  },
  {
    icon: '🧠',
    title: 'Multimodal Evidence Gap',
    text: 'Most systems analyze either behavioral or speech data independently. Fusing interaction patterns, voice analysis, and learning progression into interpretable signals remains underexplored.',
  },
  {
    icon: '🎮',
    title: 'Engagement Gap',
    text: 'Clinical assessment interrupts natural learning. A gamified experience that gathers evidence through joyful play while surfacing meaningful indicators is a key unmet need.',
  },
  {
    icon: '📊',
    title: 'Stakeholder Communication Gap',
    text: 'Parents and specialists have different information needs. Systems rarely provide role-appropriate, transparent summaries with model attribution and confidence levels.',
  },
]

const OBJECTIVES = [
  {
    title: 'Engage through adaptive play',
    text: 'Design focused, developmentally appropriate Sinhala activities with progressive difficulty for Grade 1 learners aged 6–7.',
  },
  {
    title: 'Capture multimodal signals',
    text: 'Study voice patterns, response timing, interaction behaviors and learning progression across repeated sessions to build rich learner profiles.',
  },
  {
    title: 'Fuse and explain patterns',
    text: 'Combine behavioral and speech features into interpretable learner-risk signals using XGBoost with SHAP-based feature attribution.',
  },
  {
    title: 'Adapt and communicate',
    text: 'Adjust task difficulty using item-response modelling and present clear, role-appropriate progress insights to parents and specialists.',
  },
]

const COMPONENTS = [
  {
    id: 'C1',
    title: 'Behavioral Telemetry',
    label: 'Interaction Intelligence',
    text: 'Captures response latency, first-attempt accuracy, retries, hesitation, touch patterns and fatigue proxies during natural play.',
    tags: ['Learning Analytics', 'Fatigue Proxy', 'Telemetry'],
    color: 'coral',
  },
  {
    id: 'C2',
    title: 'Sinhala Speech Monitoring',
    label: 'Voice & Fluency',
    text: 'Studies speech timing, pauses, voice onset, word error rate and acoustic quality across guided Sinhala reading tasks.',
    tags: ['Speech-to-Text', 'Acoustics', 'Fluency'],
    color: 'jade',
  },
  {
    id: 'C3',
    title: 'Explainable Pattern Fusion',
    label: 'Multimodal Analysis',
    text: 'Combines behavioral and speech features into interpretable learner-pattern signals, with SHAP-based feature attribution.',
    tags: ['XGBoost', 'SHAP', 'Explainable AI'],
    color: 'gold',
  },
  {
    id: 'C4',
    title: 'Adaptive Tutoring Engine',
    label: 'Personalized Progression',
    text: 'Uses item-response modelling and mastery state to select the next task, adjust challenge and introduce scaffolds when needed.',
    tags: ['Rasch / IRT', 'Mastery', 'Scaffolding'],
    color: 'blue',
  },
]

const METHODOLOGY_TEXT = `The field of early learning support has seen growing adoption of AI and behavioral analytics. Initial efforts utilized static assessment tools that evaluated only final answers, missing the rich process data generated during learning interactions.

With advances in deep learning and natural language processing, newer systems have begun analyzing speech patterns, interaction timing, and behavioral signals. Transfer learning and multimodal fusion have shown promise for building comprehensive learner profiles, though challenges remain for low-resource languages like Sinhala.

For speech monitoring, systems have employed voice onset time analysis, pause detection, and word error rate measurement. Behavioral telemetry approaches capture response latency, retry patterns, hesitation signals, and fatigue proxies during natural interaction.

Adaptive learning engines using item-response theory (IRT) and mastery-based progression have demonstrated effectiveness in personalizing difficulty levels. Explainable AI techniques such as SHAP (SHapley Additive exPlanations) enable transparent model decisions, critical for stakeholder trust in educational contexts.`

const LITERATURE_REFS = [
  'R. Baker and P. S. Inventado, "Educational Data Mining and Learning Analytics," in Learning Analytics, Springer, 2014.',
  'C. Romero and S. Ventura, "Data Mining in Education," WIREs Data Mining and Knowledge Discovery, 2013.',
  'T. Anderson et al., "Learning Analytics and Educational Data Mining," IRRODL, 2014.',
  'D. Rasch, "Probabilistic Models for Intelligence and Attainment Tests," University of Chicago Press, 1960.',
  'S. Lundberg and S. Lee, "A Unified Approach to Interpreting Model Predictions," NeurIPS, 2017.',
]

const TECHNOLOGIES = [
  ['Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'],
  ['Flutter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'],
  ['FastAPI', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'],
  ['MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'],
  ['TensorFlow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'],
  ['React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'],
  ['Firebase', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'],
  ['Azure', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg'],
  ['Dart', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg'],
]

const MILESTONES = [
  {
    date: 'August 2024',
    title: 'Project Proposal',
    detail: 'Problem framing, literature review, research gap identification, initial objectives and proposed system architecture.',
    marks: 6,
    color: 'cyan',
  },
  {
    date: 'December 2024',
    title: 'Progress Presentation I',
    detail: 'Flutter experience prototype, gamified activity design, synthetic-data models and database foundations.',
    marks: 15,
    color: 'amber',
  },
  {
    date: 'March 2025',
    title: 'Progress Presentation II',
    detail: 'FastAPI service integration, speech pipeline, adaptive engine and initial dashboard evidence.',
    marks: 18,
    color: 'emerald',
  },
  {
    date: 'March 2025',
    title: 'Research Paper',
    detail: 'Academic document presenting results from investigation into adaptive learning and behavioral telemetry.',
    marks: 10,
    color: 'violet',
  },
  {
    date: 'May 2025',
    title: 'Final Assessment & Viva',
    detail: 'Integrated prototype, parent and specialist dashboards, security review and end-to-end system evaluation.',
    marks: 19,
    color: 'rose',
  },
]

const DOCUMENTS = [
  { title: 'Topic Assessment', desc: 'Initial topic evaluation outlining relevance and feasibility.', date: '2024/05/13', type: 'Group' },
  { title: 'Proposal Document', desc: 'Explains project goals, timeline, and chosen technologies.', date: '2024/08/23', type: 'Individual' },
  { title: 'Individual Reports', desc: 'Detailed reports covering research, analysis, and outcomes.', date: '2025/04/11', type: 'Individual' },
  { title: 'Final Report', desc: 'Final group submission combining all project components.', date: '2025/04/11', type: 'Group' },
  { title: 'Research Paper', desc: 'The final product of the research.', date: '2025/03/30', type: 'Group' },
]

const PRESENTATIONS = [
  { title: 'Proposal Presentation', desc: 'Covers initial objectives, scope, and planned methodology for the project.', date: '2024/07/06', type: 'Group' },
  { title: 'Progress Presentation I', desc: 'Presents approximately 50% completion, showcasing key features and received feedback.', date: '2024/12/04', type: 'Group' },
  { title: 'Progress Presentation II', desc: 'Highlights around 90% project completion, refined design, and testing outcomes.', date: '2025/03/18', type: 'Group' },
  { title: 'Final Presentation', desc: 'Final project delivery with system demo, research findings, and overall conclusions.', date: '2025/05/07', type: 'Group' },
]

const SUPERVISORS = [
  { name: 'Ms. Thilini Jayalath', role: 'Supervisor', institution: 'SLIIT', department: 'Information Technology', image: './images/team/supervisor.jpg' },
  { name: 'Ms. Thilini Jayalath', role: 'Co-Supervisor', institution: 'SLIIT', department: 'Software Engineering', image: './images/team/co-supervisor.jpg' },
]

const STUDENTS = [
  { name: 'Research Member 01', role: 'Team Leader', component: 'C1 — Behavioral Telemetry', initials: 'M1', image: './images/team/leader.jpg' },
  { name: 'Research Member 02', role: 'Team Member', component: 'C2 — Speech Monitoring', initials: 'M2', image: './images/team/member2.jpg' },
  { name: 'Research Member 03', role: 'Team Member', component: 'C3 — Diagnostic Fusion', initials: 'M3', image: './images/team/member2-3.jpg' },
  { name: 'Research Member 04', role: 'Team Member', component: 'C4 — Adaptive Tutoring', initials: 'M4', image: './images/team/member4.jpg' },
]

/* ═══════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════ */

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  )
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="section-intro reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-copy">{children}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [resourceType, setResourceType] = useState('documents')
  const [formSent, setFormSent] = useState(false)

  const activeResources = useMemo(
    () => (resourceType === 'documents' ? DOCUMENTS : PRESENTATIONS),
    [resourceType],
  )

  // Scroll spy
  useEffect(() => {
    const sections = NAV_ITEMS.map(([id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Header scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    revealElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [resourceType])

  const jumpTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  const submitContact = (e) => {
    e.preventDefault()
    setFormSent(true)
    e.currentTarget.reset()
  }

  return (
    <div className="site-shell">
      {/* ── HEADER ── */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#hero" onClick={(e) => { e.preventDefault(); jumpTo('hero') }}>
          <img src="./images/logo.png" alt="Sipsara Logo" className="brand-logo" />
          <span>
            <b>Sipsara</b>
            <small>Research Initiative</small>
          </span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {NAV_ITEMS.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              className={activeSection === id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); jumpTo(id) }}
            >
              {label}
            </a>
          ))}
        </nav>
        <button className="header-cta" onClick={() => jumpTo('documents')}>
          Research Library <ArrowIcon />
        </button>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </header>

      <main>
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="hero" id="hero">
          <div className="hero-bg" />
          <div className="hero-grid-overlay" />
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="live-dot" />
              Undergraduate Research · SLIIT
            </div>
            <h1>
              Learning Signals,<br />
              <em>Made Meaningful.</em>
            </h1>
            <p className="hero-lead">
              An AI-assisted, adaptive Sinhala learning ecosystem that turns everyday play into
              clearer learning support for Grade 1 children.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => jumpTo('domain')}>
                Explore the Research <ArrowIcon />
              </button>
              <button className="btn-ghost" onClick={() => jumpTo('team')}>
                Meet the Team
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="./images/hero.jpg" alt="Child learning with AI" />
          </div>
          <div className="hero-metrics">
            <div><span>Research Focus</span><b>AI × Early Learning</b></div>
            <div><span>Primary Language</span><b>Sinhala</b></div>
            <div><span>Target Audience</span><b>Age 6–7 (Grade 1)</b></div>
            <div><span>Components</span><b>4 Integrated Systems</b></div>
          </div>
        </section>

        {/* ═══════════════ THESIS STRIP ═══════════════ */}
        <section className="thesis-strip">
          <div className="thesis-inner">
            <p className="thesis-sub">Our Research Question</p>
            <h2>
              Can a learning experience notice when a child needs support —{' '}
              <em>without making learning feel like a test?</em>
            </h2>
            <div className="strip-metrics">
              <div><b>04</b><span>Integrated research components</span></div>
              <div><b>10</b><span>Learning skill families</span></div>
              <div><b>1000</b><span>Progressive activity rounds</span></div>
              <div><b>02</b><span>Stakeholder dashboards</span></div>
            </div>
          </div>
        </section>

        {/* ═══════════════ DOMAIN: RESEARCH PROBLEMS ═══════════════ */}
        <section className="domain-section section-pad" id="domain">
          <div className="section-inner">
            <SectionIntro eyebrow="Research Problem" title={<>Challenges in <em>early learning support.</em></>}>
              Current AI tools are specialized and isolated. An integrated system combining behavioral
              telemetry, speech analysis, and adaptive learning in Sinhala remains an open challenge.
            </SectionIntro>
            <div className="domain-grid">
              {RESEARCH_PROBLEMS.map((item, i) => (
                <article className="domain-card reveal" key={item.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <p className="card-label">{`0${i + 1}. ${item.label}`}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ RESEARCH GAP ═══════════════ */}
        <section className="gap-section section-pad">
          <div className="section-inner">
            <SectionIntro eyebrow="Research Gap" title={<>Where current systems <em>fall short.</em></>}>
              Few child-friendly systems combine Sinhala learning content, behavioral telemetry, speech
              evidence and real-time adaptation in one coherent workflow.
            </SectionIntro>
            <div className="gap-grid">
              {RESEARCH_GAPS.map((item, i) => (
                <article className="gap-card reveal" key={item.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="gap-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ RESEARCH OBJECTIVES ═══════════════ */}
        <section className="objectives-section section-pad">
          <div className="section-inner">
            <SectionIntro eyebrow="Research Objectives" title={<>Four objectives <em>guide the work.</em></>}>
              Each objective addresses a distinct facet of the research question, from engaging young
              learners to communicating transparent insights.
            </SectionIntro>
            <div className="objectives-grid">
              {OBJECTIVES.map((obj, i) => (
                <div className="obj-card reveal" key={obj.title} style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className="obj-marker">{`0${i + 1}`}</div>
                  <div className="obj-body">
                    <h3>{obj.title}</h3>
                    <p>{obj.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ METHODOLOGY / COMPONENTS ═══════════════ */}
        <section className="components-section section-pad">
          <div className="section-inner">
            <SectionIntro
              eyebrow="Methodology"
              title={<>One Ecosystem. <em>Four lenses.</em></>}
            >
              Each component answers a different part of the research question. Together they create a
              continuous path from interaction to interpretable support.
            </SectionIntro>

            {/* Pipeline */}
            <div className="pipeline reveal">
              {[
                ['01', 'Experience', 'Flutter learning activities'],
                ['02', 'Capture', 'Voice + interaction telemetry'],
                ['03', 'Model', 'C1–C4 analytical services'],
                ['04', 'Respond', 'Adaptive task selection'],
                ['05', 'Communicate', 'Parent + specialist insight'],
              ].map(([num, title, text]) => (
                <div className="pipeline-item" key={num}>
                  <div className="pipe-num">{num}</div>
                  <b>{title}</b>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            {/* Component cards */}
            <div className="component-grid">
              {COMPONENTS.map((c, i) => (
                <article className={`component-card ${c.color} reveal`} key={c.id} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="component-top"><span>{c.id}</span></div>
                  <p className="component-label">{c.label}</p>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <div className="tag-row">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </article>
              ))}
            </div>

            {/* Architecture + Principles */}
            <div className="method-detail-grid" style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>
              <article className="architecture-card reveal">
                <p className="mini-kicker">System Architecture</p>
                <h3>Built as connected, testable services.</h3>
                <div className="architecture-layers">
                  <div><span>Experience</span><b>Flutter · Dart</b><i>Gamified mobile interface</i></div>
                  <div><span>API & Data</span><b>FastAPI · MongoDB</b><i>Secure role-based services</i></div>
                  <div><span>Intelligence</span><b>Python · ML Pipeline</b><i>Speech, fusion & adaptation</i></div>
                  <div><span>Cloud</span><b>Azure-ready</b><i>Deployment and monitoring</i></div>
                </div>
              </article>
              <article className="principles-card reveal delay-1">
                <p className="mini-kicker">Design Principles</p>
                <h3>Human-centered by design.</h3>
                <ul>
                  <li><span>01</span><div><b>Progress before labels</b><p>Communicate strengths, needs and change over time.</p></div></li>
                  <li><span>02</span><div><b>Explain the signal</b><p>Expose contributing features and model limitations.</p></div></li>
                  <li><span>03</span><div><b>Minimize the burden</b><p>Gather evidence through normal learning interactions.</p></div></li>
                  <li><span>04</span><div><b>Separate the audiences</b><p>Parents and specialists see role-appropriate information.</p></div></li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ═══════════════ LITERATURE SURVEY ═══════════════ */}
        <section className="literature-section section-pad">
          <div className="section-inner">
            <SectionIntro eyebrow="Literature Survey" title={<>Building on <em>existing knowledge.</em></>}>
              A synthesis of prior work in educational data mining, adaptive learning, speech analysis
              and explainable AI for child learning support.
            </SectionIntro>
            <div className="literature-content reveal">
              {METHODOLOGY_TEXT.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <div className="lit-refs">
                <h4>Key References</h4>
                <ol>
                  {LITERATURE_REFS.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ TECHNOLOGIES ═══════════════ */}
        <section className="tech-section section-pad">
          <div className="section-inner">
            <SectionIntro eyebrow="Technologies Used" title={<>Powered by <em>modern tools.</em></>} />
            <div className="tech-grid">
              {TECHNOLOGIES.map(([name, icon], i) => (
                <div className="tech-item reveal" key={name} style={{ transitionDelay: `${i * 0.05}s` }}>
                  <img src={icon} alt={name} loading="lazy" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ MILESTONES ═══════════════ */}
        <section className="milestone-section section-pad" id="milestones">
          <div className="section-inner">
            <SectionIntro eyebrow="Project Milestones" title={<>Built in evidence, <em>phase by phase.</em></>}>
              A timeline of key project milestones, deliverables, and assessments marking the research
              journey from proposal to final evaluation.
            </SectionIntro>
            <div className="milestone-timeline">
              {MILESTONES.map((m, i) => (
                <div className="milestone-item reveal" key={m.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="milestone-dot" />
                  <div className="milestone-card">
                    <span className="milestone-date">{m.date}</span>
                    <h3>{m.title}</h3>
                    <p>{m.detail}</p>
                    <div className="milestone-marks">
                      <span>Marks Allocated: {m.marks}</span>
                      <div className="marks-bar">
                        <div
                          className="marks-bar-fill"
                          style={{
                            width: `${m.marks}%`,
                            background: `var(--${m.color === 'cyan' ? 'cyan-500' : m.color === 'amber' ? 'amber-500' : m.color === 'emerald' ? 'emerald-500' : m.color === 'violet' ? 'violet-500' : 'rose-500'})`,
                          }}
                        />
                      </div>
                      <span className="marks-pct">{m.marks}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ DOCUMENTS ═══════════════ */}
        <section className="resources-section section-pad" id="documents">
          <div className="section-inner">
            <SectionIntro eyebrow="Documents" title={<>The work, <em>documented.</em></>}>
              All documents related to the academic project. Use the links to view or download submitted files.
            </SectionIntro>
            <div className="resource-grid">
              {DOCUMENTS.map((doc, i) => (
                <article className="resource-card reveal" key={doc.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className="file-badge">📄 PDF</span>
                  <h3>{doc.title}</h3>
                  <p className="res-desc">{doc.desc}</p>
                  <div className="res-meta">
                    <span>Submitted on {doc.date}</span>
                    <span className="res-type">{doc.type}</span>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <a href="#" className="download-link">Download ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ PRESENTATIONS ═══════════════ */}
        <section className="resources-section section-pad" id="presentations" style={{ background: 'var(--navy-800)' }}>
          <div className="section-inner">
            <SectionIntro eyebrow="Presentations" title={<>Research, <em>presented.</em></>}>
              All submitted presentation materials related to this project.
            </SectionIntro>
            <div className="resource-grid">
              {PRESENTATIONS.map((pres, i) => (
                <article className="resource-card reveal" key={pres.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className="file-badge">🎞️ SLIDES</span>
                  <h3>{pres.title}</h3>
                  <p className="res-desc">{pres.desc}</p>
                  <div className="res-meta">
                    <span>Submitted on {pres.date}</span>
                    <span className="res-type">{pres.type}</span>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <a href="#" className="download-link">View ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ TEAM ═══════════════ */}
        <section className="team-section section-pad" id="team">
          <div className="section-inner">
            <SectionIntro eyebrow="About Us" title={<>Meet our <em>team.</em></>}>
              Software Engineering undergraduates at SLIIT, working across human-centered design,
              data engineering, machine learning and mobile development.
            </SectionIntro>

            {/* Supervisors */}
            <h3 className="team-sub-heading reveal">Supervisors</h3>
            <div className="supervisor-showcase" style={{ marginBottom: 56 }}>
              {SUPERVISORS.map((sup, i) => (
                <article className={`supervisor-card ${sup.role === 'Supervisor' ? 'supervisor-main' : 'supervisor-co'} reveal`} key={sup.role} style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className="supervisor-card-glow" />
                  <div className="supervisor-photo-wrapper">
                    <div className="supervisor-photo-ring" />
                    <img src={sup.image} alt={sup.name} className="supervisor-photo" loading="lazy" />
                    <div className="supervisor-photo-overlay" />
                  </div>
                  <div className="supervisor-info">
                    <span className={`supervisor-badge ${sup.role === 'Supervisor' ? 'badge-primary' : 'badge-secondary'}`}>
                      {sup.role === 'Supervisor' ? '★ ' : ''}{sup.role}
                    </span>
                    <h3>{sup.name}</h3>
                    <p className="supervisor-institution">{sup.institution}</p>
                    <p className="supervisor-dept">Department of <em>{sup.department}</em></p>
                    <div className="team-links">
                      <a href="#" className="email-link">Email</a>
                      <a href="#" className="linkedin-link">LinkedIn</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Students */}
            <h3 className="team-sub-heading reveal">Student Team</h3>
            <div className="student-showcase">
              {STUDENTS.map((s, i) => (
                <article className={`student-card ${s.role === 'Team Leader' ? 'student-leader' : ''} reveal`} key={s.name} style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className="student-card-glow" />
                  <div className="student-photo-wrapper">
                    <div className="student-photo-ring" />
                    <img src={s.image} alt={s.name} className="student-photo" loading="lazy" />
                  </div>
                  <div className="student-info">
                    <span className={`student-badge ${s.role === 'Team Leader' ? 'badge-leader' : 'badge-member'}`}>
                      {s.role === 'Team Leader' ? '★ ' : ''}{s.role}
                    </span>
                    <h3>{s.name}</h3>
                    <p className="student-component">{s.component}</p>
                    <p className="student-institution">SLIIT — Faculty of Computing<br />Department: <em>Information Technology</em></p>
                    <div className="team-links">
                      <a href="#" className="email-link">Email</a>
                      <a href="#" className="linkedin-link">LinkedIn</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTACT ═══════════════ */}
        <section className="contact-section section-pad" id="contact">
          <div className="section-inner">
            <SectionIntro eyebrow="Contact Us" title={<>Let's talk about <em>better learning support.</em></>}>
              Got a question? Send us a message and we'll respond promptly.
            </SectionIntro>
            <div className="contact-layout">
              <div className="contact-copy">
                <h3>Contact Details</h3>
                <p>
                  For research collaboration, academic discussion or project enquiries,
                  leave the team a message.
                </p>
                <div className="contact-details">
                  <div>
                    <span>Institution</span>
                    <b>Sri Lanka Institute of Information Technology</b>
                  </div>
                  <div>
                    <span>Project</span>
                    <b>Sipsara Research Initiative</b>
                  </div>
                  <div>
                    <span>Email</span>
                    <a href="mailto:sipsara@example.com"><b>sipsara@example.com</b></a>
                  </div>
                </div>
              </div>
              <form className="contact-form" onSubmit={submitContact}>
                <div className="field-row">
                  <label>
                    Name
                    <input required name="name" placeholder="Your name" />
                  </label>
                  <label>
                    Email
                    <input required type="email" name="email" placeholder="you@example.com" />
                  </label>
                </div>
                <label>
                  Message
                  <textarea required name="message" rows="5" placeholder="Tell us about your enquiry…" />
                </label>
                <button className="btn-primary btn-submit" type="submit">
                  Send Message <ArrowIcon />
                </button>
                {formSent && (
                  <div className="form-success">
                    ✓ Thank you! Your message has been received. We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="./images/logo.png" alt="Sipsara Logo" className="brand-logo footer-logo" />
              <span>Sipsara</span>
            </div>
            <nav className="footer-nav">
              {NAV_ITEMS.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); jumpTo(id) }}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="footer-bottom">
            <p>AI-assisted adaptive learning research for Grade 1 Sinhala education.</p>
            <div>
              <a href="#hero" onClick={(e) => { e.preventDefault(); jumpTo('hero') }}>
                Back to top ↑
              </a>
              <span style={{ margin: '0 12px', color: 'var(--gray-700)' }}>·</span>
              <span style={{ color: 'var(--gray-600)', fontSize: 12 }}>© 2025 Sipsara Research Team</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
