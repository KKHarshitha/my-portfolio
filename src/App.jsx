import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ArrowUp,
  FileText,
  Instagram,
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function MotionSection({ id, children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function App() {
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("");
  const sectionRefs = useRef({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    "about",
    "experience",
    "projects",
    "skills",
    "education",
    "contact",
  ];
  
<nav className="mt-8 flex flex-col gap-2 relative">
  {sections.map((s) => (
    <nav className="mt-8 flex flex-col gap-3 relative">
  {sections.map((s) => (
    <motion.button
      key={s}
      onClick={() => handleNavClick(s)}
      whileHover={{
        scale: 1.08,
        color: "#ffffff",
        transition: { type: "spring", stiffness: 200, damping: 20 },
      }}
      whileTap={{ scale: 0 }}
      animate={
        active === s
          ? { scale: 0.1, color: "#ffffff", fontWeight: 700, opacity: 0 }
          : { scale: 0.1, color: "#8892b0", fontWeight: 400, opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
        mass: 0.7,
      }}
      className="relative text-left text-[1rem] tracking-wide cursor-pointer select-none"
    >
      {/* Smooth glowing indicator bar */}
      {active === s && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#64ffda]/80 rounded-full shadow-[0_0_10px_#64ffda]"
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
          }}
        />
      )}
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </motion.button>
  ))}
</nav>

  ))}
</nav>

  // Register refs for sections
  useEffect(() => {
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionRefs.current[id] = el;
    });
  }, []);

  // 🌿 Smooth scroll to section
  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80, // offset for header height
        behavior: "smooth", // <-- smooth scroll
      });
    }
  };

  // 🌿 Track which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // midpoint reference
      let currentSection = "";

      for (const id of sections) {
        const el = sectionRefs.current[id];
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = id;
            break;
          }
        }
      }

      setActive(currentSection);
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Scroll detection for Back to Top
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle click navigation
  const handleNavClick = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Moving Glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 80 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 80 });
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="relative h-screen bg-gradient-to-b from-[#0a192f] via-[#0b1a2c] to-[#091529] text-[#ccd6f6] font-[Calibre,Inter,sans-serif] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ✨ Ambient glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#64ffff]/10 blur-[100px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* ⭐ Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-[#0a192f]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#64ffda]">Harshitha.dev</h1>

        {/* Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>
      {/* ⭐ Animated Mobile Slide Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={mobileMenuOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`lg:hidden fixed left-0 w-full bg-[#112240] text-white px-6 py-6 space-y-6 z-40 shadow-xl rounded-b-2xl
          ${mobileMenuOpen ? "top-16" : "-top-96 pointer-events-none"}`}
      >
        {sections.map((s) => (
          <motion.button
            key={s}
            onClick={() => {
              setMobileMenuOpen(false);
              handleNavClick(s);
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="block w-full text-left text-lg py-2 border-b border-white/10"
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* LAYOUT */}
      <div className="flex h-full pt-4 sm:pt-6 lg:pt-8">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:flex flex-col justify-between w-[380px] h-[calc(100vh-5rem)] px-10 pt-0 fixed top-10 left-4 lg:left-[3cm]">
          <div className="mt-14">
            <h1 className="text-3xl font-extrabold text-white mb-10">
              K.K. Harshitha
            </h1>
            <p className="text-sm text-[#a8b2d1]">
              Machine Learning Engineer | Cloud Developer
            </p>
            <p className="text-xs text-[#8892b0] mt-2">
              Turning data into impactful systems.
            </p>

          {/* fixed resume button */}
          <div class="mt-12">
            <a
              class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold group/link text-base"
              href="/Kukkala_Komala_Harshitha_Resume.pdf"
              target="_blank"
              download="Kukkala_Komala_Harshitha_Resume.pdf"
              aria-label="Download Full Résumé (opens in a new tab)"
            >
              Download Resume
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20"
                   fill="currentColor"
                   class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 ml-1 translate-y-px"
                   aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clip-rule="evenodd">
                </path>
              </svg>
            </a>
          </div>

            {/* NAV LINKS */}
            <nav className="mt-10 flex flex-col gap-3">
              {sections.map((s) => (
                <motion.button
                  key={s}
                  onClick={() => handleNavClick(s)}
                  animate={
                    active === s
                      ? { scale: 1.15, color: "#ffffff", fontWeight: 700 }
                      : { scale: 1, color: "#a8b2d1", fontWeight: 400 }
                  }
                  whileHover={{ scale: 1.08, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-left text-[15px] tracking-wide transition-all"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Circular icons */}
          <div className="flex gap-4 justify-center mb-20 lg:mb-25 lg:mr-40">
            <a class="block hover:text-slate-200" href="mailto:komalaharshitha72@gmail.com" 
               aria-label="Gmail (opens email)" title="Gmail">
                <span class="sr-only">Gmail</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                     class="h-7 w-7" aria-hidden="true">
                    <path d="M20.5 4h-17A1.5 1.5 0 002 5.5v13A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0020.5 4zm-1.03 2l-7.47 5.44L3.53 6h15.94zM4 17v-9.26l7.23 5.27a1.5 1.5 0 001.54 0L20 7.74V17H4z"/>
                </svg>
            </a>
            <a class="block hover:text-slate-200" href="https://www.linkedin.com/in/k-harshitha-1495b7267/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
            <span class="sr-only">LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6" aria-hidden="true">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            </a>
            <a class="block hover:text-slate-200" href="https://github.com/KKHarshitha" target="_blank" rel="noreferrer noopener" aria-label="GitHub (opens in a new tab)" title="GitHub">
            <span class="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-6 w-6" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
            <a class="block hover:text-slate-200" href="https://instagram.com/k.k.harshitha" target="_blank" rel="noreferrer noopener" aria-label="Instagram (opens in a new tab)" title="Instagram"> 
            <span class="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="currentColor" class="h-6 w-6" aria-hidden="true">
              <path d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34"></path>
              </svg>
            </a>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="ml-0 lg:ml-[380px] mr-4 lg:mr-[3cm] flex-1 overflow-y-auto px-4 sm:px-6 lg:px-30 pb-16 space-y-10 h-[calc(100vh-5rem)] scroll-smooth">
          {/* HERO */}
          <MotionSection id="hero" className="max-w-5xl mx-auto pt-10 lg:pt-17">
            <p className="text-[#64ffda] mb-3">Hi, my name is</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              Kukkala Komala Harshitha.
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-[#8892b0] mb-6">
              I build ML-powered apps & deploy cloud-ready systems.
            </h2>
            <p className="max-w-2xl text-[#8892b0] text-lg leading-relaxed">
              2025 CSE graduate focused on Machine Learning, AWS cloud, and
              full-stack development. I like turning data into useful, accessible
              products.
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <a
                href="mailto:komalaharshitha72@gmail.com"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-4 py-2 rounded hover:bg-white/10 transition"
              >
                <Mail size={18} /> Contact Me
              </a>
              <a
                href="https://github.com/KKHarshitha"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-4 py-2 rounded hover:bg-white/10 transition"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/k-harshitha-1495b7267/"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-4 py-2 rounded hover:bg-white/10 transition"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </MotionSection>

          {/* ABOUT */}
          <section id="about" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-[#8892b0] leading-7">
              I am a high-achieving Computer Science student (CGPA: 8.6 ) at Vishnu Institute of Technology , 
              specializing in the intersection of Machine Learning and Full-Stack development. I possess hands-on 
              experience in building and deploying complete applications—from robust web UIs (React/Flutter) to 
              scalable backend logic and ML pipelines (Python, AWS SageMaker). My commitment is to deliver high-quality, 
              measurable results, exemplified by projects like my crime mapping model, which achieved 93.2% accuracy.
            </p>
            <p className="text-[#8892b0] leading-7 mt-4">
              Outside code, I love drawing and quiet nature spots.
            </p>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-6 py-0">
            <h2 className="text-3xl font-bold mb-8">Experience</h2>
            <div className="border-l border-[#64ffda] pl-6 space-y-10">
              <div>
                <h3 className="text-xl font-semibold">AWS AI/ML Virtual Intern</h3>
                <p className="text-sm text-[#64ffda] mb-3">May 2023 – Jul 2023</p>
                <h4><b>Responsibilities & Achievements:</b></h4>
                <ul className="list-disc ml-5 text-[#8892b0] space-y-2">
                  <li>ML Deployment: Trained and deployed a text classification model using AWS SageMaker to categorize user feedback, providing actionable insights from unstructured data.</li>
                  <li>Automation: Developed a Python script to automate the data cleaning and preprocessing pipeline for incoming datasets, reducing manual effort and task completion time by 20%.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <article className="bg-[#112240] p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Location-Based Alarm App (Travel Alarm)</h3>
                <p className="text-sm text-[#64ffda] mb-4">Dart, Flutter, Platform Channels</p>
                <ul className="list-disc ml-5 text-[#8892b0] space-y-2 text-sm">
                  <li>Goal: Engineered a reliable, cross-platform (Android/iOS) Mobile Application to function as a "Travel Alarm," alerting users upon reaching a set destination.</li>
                  <li>Core Feature Development: Developed key UI features that allow users to select a destination on a map and visually set a target for future Geofence tracking.</li>
                  <li>Architecture: Orchestrated a modular widget architecture within the Flutter application, which enhanced code reusability by 30% and enabled faster feature onboarding.</li>
                  <li>System Integration: Initiated development of Background Location Services and Local Persistence, laying the critical foundation to ensure the alarm reliably fires with a notification even when the app is closed.</li>
                </ul>
              </article>

              <article className="bg-[#112240] p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2">ML-Powered Crime Hotspots Mapping and Safety Insights</h3>
                <p className="text-sm text-[#64ffda] mb-4">Python, Scikit-learn, Streamlit</p>
                <ul className="list-disc ml-5 text-[#8892b0] space-y-2 text-sm">
                  <li>Goal: To accurately predict and visualize high-risk urban zones by analyzing historical crime data and social media sentiment.</li>
                  <li>ML Implementation: Implemented a robust Machine Learning pipeline to analyze over 5,000 crime records. Utilized Random Forest for classification and DBSCAN for geospatial hotspot clustering.</li>
                  <li>Result: Achieved a 93.2% prediction accuracy on a holdout test set.</li>
                  <li>Deployment: Deployed the trained model as an interactive web application using Streamlit, allowing users to visualize crime severity and hotspots on a real-time map.</li>
                  <li>Professional Recognition: Authored a formal research paper on the methodology and findings, which was selected by the review committee for Taylor & Francis.</li>
                </ul>
              </article>

              <article className="bg-[#112240] p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Project Trivia (Realtime)</h3>
                <p className="text-sm text-[#64ffda] mb-4">React, Firebase</p>
                <ul className="list-disc ml-5 text-[#8892b0] space-y-2 text-sm">
                  <li>Goal: Architected and built a high-performance, real-time multiplayer trivia game.</li>
                  <li>Backend Engineering: Leveraged Firebase Realtime Database to synchronize game state across all clients with an average latency of under 200ms.</li>
                  <li>Frontend Design: Designed a responsive user interface in React, which led to a 25% increase in average user session length compared to the previous version.</li>
                </ul>
              </article>

              <article className="bg-[#112240] p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Weather Chatbot</h3>
                <p className="text-sm text-[#64ffda] mb-4">JavaScript, API</p>
                <ul className="list-disc ml-5 text-[#8892b0] space-y-2 text-sm">
                  <li>Built a weather chatbot that provides real-time weather data by integrating the OpenWeatherMap REST API.</li>
                  <li>Imposed a client-side caching mechanism to store recent search results, reducing redundant API calls and decreasing average data retrieval time by 30%.</li>
                </ul>
              </article>
            </div>

          </section>

          {/* SKILLS */}
          <section id="skills" className="max-w-5xl mx-auto px-6 py-6">
            <h2 className="text-3xl font-bold mb-6">Skills</h2>          
            <div className="bg-[#112240] p-6 rounded-xl space-y-2">
              <p>
                <span className="font-bold text-white">Programming Languages: </span>
                <span className="text-[#8892b0]">Python, Java, JavaScript, SQL</span>
              </p>
              <p>
                <span className="font-bold text-white">Frameworks / Libraries: </span>
                <span className="text-[#8892b0]">React, Flutter, Streamlit, Pandas, Scikit-learn</span>
              </p>
              <p>
                <span className="font-bold text-white">Cloud / DevOps: </span>
                <span className="text-[#8892b0]">AWS (EC2, S3, IAM, SageMaker, Redshift), Git, GitHub Actions, YAML</span>
              </p>
              <p>
                <span className="font-bold text-white">Databases: </span>
                <span className="text-[#8892b0]">Snowflake, Firebase Realtime Database, DBMS</span>
              </p>
            </div>
          </section>
          {/* EDUCATIO    N */}
          <section id="education" className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <h2 className="text-3xl font-bold mb-6">Education</h2>
            <div className="bg-[#112240] p-6 rounded-xl">
              <h3 className="text-lg font-semibold">B.Tech in Computer Science · Oct 2021 – Sep 2025 · CGPA: 8.6</h3>
              <p className="text-sm text-[#64ffda]">Vishnu Institute of Technology</p>
              <p className="text-sm text-[#8892b0] mt-1">Bhimavaram, Andhra Pradesh</p>
            </div>
          </section>

          {/* CONTACT */}
          <MotionSection id="contact" className="max-w-5xl mx-auto pb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
            <p className="text-[#a8b2d1] mb-6">
              I’m open to internships or full-time roles in ML, cloud, and
              full-stack. Feel free to reach out.
            </p>
            <div className="flex flex-wrap gap-5 text-sm">
              <a
                href="mailto:komalaharshitha72@gmail.com"
                className="inline-flex items-center gap-2"
              >
                <Mail size={16} /> komalaharshitha72@gmail.com
              </a>
              <span className="inline-flex items-center gap-2">
                <Phone size={16} /> +91 63022 84302
              </span>
              <a href="https://github.com/KKHarshitha" className="inline-flex items-center gap-2">
                <Github size={16} /> GitHub
              </a>
              <a href="https://linkedin.com/in/k-harshitha-1495b7267" className="inline-flex items-center gap-2">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="https://www.instagram.com/your_instagram/" className="inline-flex items-center gap-2">
                <Instagram size={16} /> Instagram
              </a>
            </div>
          </MotionSection>
        </main>
      </div>

      {/* BACK TO TOP */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
        >
          <ArrowUp />
        </button>
      )}
    </div>
  );
}
