import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, Github, Download } from 'lucide-react';

const AnimatedLogo = ({ className = 'w-40 h-34' }) => (
  <motion.div
    className={className}
    viewBox="0 0 120 60"
    fill="none"
    initial={{ rotate: 0 }}
    animate={{ rotate: 180 }}
    transition={{ repeat: 3, duration: 12, ease: 'linear' }}
  >
    <img src="https://cdn.simpleicons.org/opensourceinitiative " />
  </motion.div>
);

const AnimatedAvatar = ({ className = 'w-full h-80 md:h-96' }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div className={className + ' rounded-2xl overflow-hidden border border-gray-700/40'}
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: [0.98, 1.02, 0.98], opacity: 1 }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {!imgError ? (
        <img
          // use relative path since Vite copies public/* to build root
          src="./avatar.jpeg"
          alt="Urvish Rana"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-tr from-gray-900 to-gray-800 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-36 h-36">
            <defs>
              <linearGradient id="a1" x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="40" r="30" fill="url(#a1)" />
            <text x="50%" y="80%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fill="#cbd5e1" fontFamily="Inter, sans-serif">UR</text>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

const HeaderLogo = ({ className = 'w-9 h-9' }) => (
  <motion.svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" whileHover={{ scale: 1.06 }}>
    <defs>
      <linearGradient id="hl" x1="0" x2="1">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="46" height="46" rx="10" fill="url(#hl)" opacity="0.12" stroke="rgba(255,255,255,0.06)" />
    <circle cx="16" cy="18" r="6" fill="#0ea5a4" />
    <text x="32" y="30" textAnchor="middle" fontSize="14" fill="#cbd5e1" fontFamily="Inter, sans-serif">UR</text>
  </motion.svg>
);

const App = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const [selectedProject, setSelectedProject] = useState(null);

  // modal: lock scroll and close on Escape
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelectedProject(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedProject]);

  const heroFade = useTransform(scrollY, [0, 200], [1, 0]);
  const reveal = useTransform(scrollY, [180, 600], [0, 1]);

  return (
    <div ref={containerRef} className="min-h-screen w-screen bg-black text-white overflow-x-hidden">
      {/* Top nav */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center bg-gray-900/40 backdrop-blur-md rounded-full px-3 py-2 border border-white/6 shadow-sm">
          <a href="#" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'})}} className="flex items-center gap-3 no-underline">
            <HeaderLogo />
            <span className="hidden sm:inline text-white font-semibold">Urvish Rana</span>
          </a>

          <div className="flex items-center gap-4">
            <a href="#projects" className="text-sm text-gray-300 hover:text-white px-3 py-1 rounded-md transition">Projects</a>
            <a href="#experience" className="text-sm text-gray-300 hover:text-white px-3 py-1 rounded-md transition">Experience</a>
            <a href="#tech" className="text-sm text-gray-300 hover:text-white px-3 py-1 rounded-md transition">Tech</a>
            <a href="#contact" className="text-sm text-gray-300 hover:text-white px-3 py-1 rounded-md transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="h-screen flex items-center" style={{ opacity: heroFade }}>
        <div className="max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-extralight leading-tight mb-4">Urvish Rana</h1>
            <p className="text-xl text-blue-300 font-light mb-6">Full Stack DevOps Engineer — cloud-native systems, automation, and observability.</p>
            <div className="flex gap-3 items-center">
              <a href="#projects" className="px-5 py-3 border border-gray-700 hover:bg-gray-900 rounded-md">View Projects</a>
              <a href="/resume.pdf" className="px-4 py-3 border border-gray-700 hover:bg-gray-900 rounded-md">Resume</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative">
            {/* Decorative mockup -> animated avatar */}
            <AnimatedAvatar />
          </motion.div>
        </div>
        {/* Experience */}
      
      </header>
      <section id="experience" className="pb-20 bg-transparent" style={{opacity: reveal}}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Experience</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-lg border-l-4 border-green-500 bg-gray-900/30">
              <h4 className="text-xl font-semibold text-green-300">Software Developer — Nokia</h4>
              <p className="text-gray-400">2022 - Present · Cloud infra, deployment pipelines, observability and platform tooling.</p>
            </div>
            <div className="p-6 rounded-lg border-l-4 border-cyan-500 bg-gray-900/30">
              <h4 className="text-xl font-semibold text-cyan-300">Associate Engineer — Volansys</h4>
              <p className="text-gray-400">2017 - 2019 · Mobile Application Development & CI/CD.</p>
            </div>
          </div>
        </div>
      </section>

      <main id="projects" className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.button onClick={() => setSelectedProject('homelab')} whileHover={{ scale: 1.01 }} className="p-6 rounded-lg bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-700/40 text-left">
              <div className="flex gap-4 items-start">
                <AnimatedLogo className="w-28 h-18" />
                <div>
                  <h3 className="text-xl font-semibold text-orange-300">HomeLab Infrastructure</h3>
                  <p className="text-gray-400 mt-2">Built and automated a home Kubernetes cluster with monitoring, CI/CD and IaC.</p>
                </div>
              </div>
            </motion.button>

            <motion.button onClick={() => setSelectedProject('security')} whileHover={{ scale: 1.01 }} className="p-6 rounded-lg bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-700/40 text-left">
              <div className="flex gap-4 items-start">
                  <AnimatedLogo className="w-28 h-18" />
                <div>
                  <h3 className="text-xl font-semibold text-orange-300">Security Monitoring System</h3>
                  <p className="text-gray-400 mt-2">Real-time monitoring stack with alerting and log aggregation for security telemetry.</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </main>

      {/* Tech & Tools */}
      <section id="tech" className="py-16 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Tech & Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 colours">
            {[
              { name: 'Java', icon: 'openjdk' },
              { name: 'Python', icon: 'python' },
              { name: 'C', icon: 'c' },
              { name: 'C++', icon: 'cplusplus' },
              { name: 'JavaScript', icon: 'javascript' },
              { name: 'Kubernetes', icon: 'kubernetes' },
              { name: 'Docker', icon: 'docker' },
              { name: 'Jenkins', icon: 'jenkins' },
              { name: 'GitLab CI', icon: 'gitlab' },
              { name: 'Ansible', icon: 'ansible' },
              { name: 'Spring', icon: 'spring' },
              { name: 'Hibernate', icon: 'hibernate' },
              { name: 'PostgreSQL', icon: 'postgresql' },
              { name: 'MySQL', icon: 'mysql' },
              { name: 'MQTT', icon: 'mqtt' },
            ].map((s) => (
              <div key={s.name} className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-tr from-gray-900/20 to-gray-800/10 border border-gray-700/30">
                <img
                  src={`https://cdn.simpleicons.org/${s.icon}`}
                  alt={s.name}
                  className="w-12 h-12 mb-2 object-contain opacity-80"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  
                />
                <div className="text-sm text-gray-300">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects (detailed) */}
      

      

      {/* Contact / Footer */}
      <footer id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-light mb-4">Let's work together</h3>
          <p className="text-gray-400 mb-6">Reach out to discuss a project or opportunity.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="mailto:urvishrana3728@gmail.com" className="px-6 py-3 border border-gray-700 rounded-md">Email me</a>
            <a href="/resume.pdf" className="px-4 py-3 border border-gray-700 rounded-md">Download resume</a>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <a href="https://github.com/urvishjarvis1" target="_blank" rel="noreferrer" className="p-3 border border-gray-700 rounded-md hover:border-white"><Github size={20} /></a>
            <a href="https://linkedin.com/in/urvishrana" target="_blank" rel="noreferrer" className="p-3 border border-gray-700 rounded-md hover:border-white"><Linkedin size={20} /></a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="p-3 border border-gray-700 rounded-md hover:border-white"><Download size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Project detail modal */}
      {selectedProject && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 flex items-center justify-center bg-black/70">
          <div onClick={() => setSelectedProject(null)} className="absolute inset-0" />
          <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-70 max-w-3xl mx-4 md:mx-0 w-full bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-semibold">{selectedProject === 'homelab' ? 'HomeLab Infrastructure' : 'Security Monitoring System'}</h3>
                <p className="text-gray-400 mt-2">{selectedProject === 'homelab' ? 'Detailed overview of HomeLab: Kubernetes, Terraform, Prometheus, Grafana, CI/CD.' : 'Detailed overview of monitoring: ELK/Prometheus, alerting, log aggregation and dashboards.'}</p>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-gray-300 px-3 py-2 border border-gray-700 rounded-md">Close</button>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-md bg-gradient-to-tr from-gray-800 to-gray-900 p-3">
                <AnimatedLogo className="w-full h-full" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-blue-300">Highlights</h4>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                  <li>Infrastructure-as-Code with Terraform and Ansible</li>
                  <li>Kubernetes cluster running on local VMs with MetalLB</li>
                  <li>Prometheus + Grafana monitoring and alerting rules</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
 