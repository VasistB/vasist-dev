import React, { useEffect, useState } from 'react'
import {
  FileDown,
  Mail,
  Terminal,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Settings2,
  Code2,
  Briefcase,
  Layers,
  Smartphone,
  Zap,
  Waves,
  LayoutTemplate,
  Palette,
  Component,
  ShieldCheck,
  Database,
  CheckCircle,
  Cpu,
  Table,
  Image as ImageIcon,
  Globe,
  HardDrive,
  PlayCircle,
  Camera,
  MapPin,
  Calendar,
  TestTube,
  GitBranch,
  Box,
  FileCode,
  BookOpen,
  FileText,
  Menu,
  X,
  Check,
  ExternalLink,
  Sparkles,
  Tv,
  Activity,
  Gauge,
  BatteryCharging,
  Cast,
  Compass,
  Film,
  Lock,
  User
} from 'lucide-react'
import gsap from 'gsap'
import AOS from 'aos'
import GlassButton from './components/GlassButton'

export default function App() {
  const [activeNav, setActiveNav] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    // Initialize AOS safely
    try {
      AOS.init({
        once: true,
        duration: 800,
        offset: 60,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      })
    } catch (e) {
      console.warn('AOS initialization skipped:', e)
    }

    // Scroll Progress & Active Section Observer
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0

      const progressBar = document.getElementById('scroll-progress')
      if (progressBar) {
        progressBar.style.width = scrolled + '%'
      }

      const btt = document.getElementById('back-to-top')
      if (btt) {
        if (winScroll > 300) {
          btt.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none')
        } else {
          btt.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none')
        }
      }

      // Track active nav section
      const sections = ['work', 'experience', 'depth', 'philosophy', 'contact']
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveNav(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Hero Device Stack Animation with GSAP
    const devices = document.querySelectorAll('#hero-device-stack .pixel-frame')
    const stackLabel = document.getElementById('hero-stack-label')

    let heroTimeline
    if (devices.length > 0) {
      heroTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2.5 })

      gsap.set(devices, { opacity: 0, scale: 0.8, y: 50, x: 0, rotate: 0 })
      if (stackLabel) gsap.set(stackLabel, { opacity: 0, y: 10 })

      const updateLabel = (text) => {
        if (!stackLabel) return
        heroTimeline
          .to(stackLabel, { opacity: 0, y: 5, duration: 0.2 })
          .add(() => {
            stackLabel.textContent = text
          })
          .to(stackLabel, { opacity: 1, y: 0, duration: 0.3 })
      }

      // Pop-up Sequence
      // 1. GPS Camera (Back Left)
      heroTimeline.to(devices[0], { opacity: 1, x: -50, y: -40, rotate: -6, scale: 0.8, duration: 1, ease: 'back.out(1.5)' })
      updateLabel(devices[0].getAttribute('data-label'))

      // 2. VStream (Back Right)
      heroTimeline.to(devices[1], { opacity: 1, x: 50, y: -40, rotate: 6, scale: 0.8, duration: 1, ease: 'back.out(1.5)' }, '+=0.3')
      updateLabel(devices[1].getAttribute('data-label'))

      // 3. iPlay (Mid Left)
      heroTimeline.to(devices[2], { opacity: 1, x: -95, y: -10, rotate: -12, scale: 0.85, duration: 1, ease: 'back.out(1.5)' }, '+=0.3')
      updateLabel(devices[2].getAttribute('data-label'))

      // 4. Vitals (Mid Right)
      heroTimeline.to(devices[3], { opacity: 1, x: 95, y: -10, rotate: 12, scale: 0.85, duration: 1, ease: 'back.out(1.5)' }, '+=0.3')
      updateLabel(devices[3].getAttribute('data-label'))

      // 5. Play Store (Center Front - Main)
      heroTimeline.to(devices[4], { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.6, ease: 'elastic.out(1, 0.8)' }, '+=0.3')
      updateLabel(devices[4].getAttribute('data-label'))

      // Hold and then Collapse Out
      heroTimeline.to([devices, stackLabel], { opacity: 0, y: 30, duration: 0.8, delay: 9, ease: 'power2.in' })

      // Floating ambient motion
      gsap.to('#hero-device-stack', {
        y: -12,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (heroTimeline) heroTimeline.kill()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopyEmail = (e) => {
    if (e) e.preventDefault()
    navigator.clipboard.writeText('vasistvr@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 3000)
  }

  return (
    <div className="bg-grid min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <div id="scroll-progress" />
      <div className="bg-mesh" />

      {/* Copy Email Toast Notification */}
      {copiedEmail && (
        <div className="fixed bottom-24 right-6 z-50 bg-emerald-500/90 text-white font-mono text-xs px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 border border-emerald-400/40 animate-bounce">
          <Check className="w-4 h-4" /> Email copied to clipboard!
        </div>
      )}

      {/* Navigation Header */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <div className="glass-card rounded-full px-4 py-2.5 flex items-center justify-between w-full max-w-5xl bg-dark-950/90 backdrop-blur-xl border border-white/10 shadow-2xl">
          <a
            href="#"
            aria-label="Back to top"
            className="flex items-center gap-2.5 pl-1 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-dark-950 rounded-full flex items-center justify-center font-bold text-xs text-white">
                VB
              </div>
            </div>
            <span className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
              Vasist Vamsi <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5 text-xs font-medium">
            <a
              href="#work"
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeNav === 'work'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Work
            </a>
            <a
              href="#experience"
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeNav === 'experience'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Experience
            </a>
            <a
              href="#depth"
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeNav === 'depth'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Stack
            </a>
            <a
              href="#philosophy"
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeNav === 'philosophy'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Philosophy
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <GlassButton
              href="./assets/Vasist_Resume_updated.pdf"
              target="_blank"
              size="sm"
              variant="secondary"
              aria-label="Download Resume PDF"
              className="hidden sm:inline-flex"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-400" /> <span>Resume</span>
            </GlassButton>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" /> <span>Contact</span>
            </a>

            {/* Mobile Nav Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-4 bg-dark-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 text-sm font-medium flex items-center justify-between"
            >
              <span>Work</span> <Code2 className="w-4 h-4 text-blue-400" />
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 text-sm font-medium flex items-center justify-between"
            >
              <span>Experience</span> <Briefcase className="w-4 h-4 text-purple-400" />
            </a>
            <a
              href="#depth"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 text-sm font-medium flex items-center justify-between"
            >
              <span>Stack</span> <Layers className="w-4 h-4 text-emerald-400" />
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 text-sm font-medium flex items-center justify-between"
            >
              <span>Philosophy</span> <BookOpen className="w-4 h-4 text-amber-400" />
            </a>
            <div className="border-t border-white/10 pt-2 flex gap-2">
              <GlassButton
                href="./assets/Vasist_Resume_updated.pdf"
                target="_blank"
                size="sm"
                variant="outline"
                className="w-full justify-center"
              >
                <FileDown className="w-3.5 h-3.5 text-blue-400" /> <span>Resume PDF</span>
              </GlassButton>
            </div>
          </div>
        )}
      </header>

      <main className="w-full flex-grow pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-24 sm:space-y-36">
        {/* HERO SECTION */}
        <section
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 tracking-wider uppercase">
                <Terminal className="w-4 h-4" /> Android Software Engineer
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Building systems <br />
                that feel <span className="text-gradient">simple.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light">
              Senior-level native Android engineering focused on Kotlin, Compose, offline-first architectures, and high-performance Media3 streaming pipelines.
            </p>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-300">
              <span className="px-3 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                Kotlin Native
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                Jetpack Compose
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                Media3
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                Realm DB
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                Dagger Hilt
              </span>
            </div>

            {/* Credibility Metrics */}
            <div className="grid grid-cols-3 gap-4 font-mono text-[11px] text-slate-300 border-t border-white/10 pt-6">
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-lg sm:text-2xl">4+ YEARS</span>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Android Dev</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-4">
                <span className="text-white font-extrabold text-lg sm:text-2xl">4</span>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Production Apps</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-4">
                <span className="text-white font-extrabold text-lg sm:text-2xl">1</span>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Published on Play</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
              <GlassButton
                href="https://github.com/VasistB"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <img src="./assets/github.svg" className="w-4 h-4 opacity-90" alt="GitHub" />
                <span>GitHub</span>
              </GlassButton>
              <GlassButton
                href="https://www.linkedin.com/in/vasist-vamsi-bhukya-03304723a/"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <img src="./assets/linkedin.svg" className="w-4 h-4" alt="LinkedIn" />
                <span>LinkedIn</span>
              </GlassButton>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6 pt-4 lg:pt-0">
            <div className="device-stack" id="hero-device-stack">
              {/* GPS Camera: Back-Left */}
              <div
                className="pixel-frame ring-1 ring-white/10 shadow-2xl cursor-pointer"
                style={{ zIndex: 5 }}
                data-label="GCAM: Location Field Utility"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="./assets/gps-camera-screenshot.png"
                    alt="GPS Camera"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
              {/* VStream: Back-Right */}
              <div
                className="pixel-frame ring-1 ring-white/10 shadow-2xl cursor-pointer"
                style={{ zIndex: 6 }}
                data-label="VStream: Dual-Platform OTT"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="./assets/vstream-home.png"
                    alt="VStream"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
              {/* iPlay: Mid-Left */}
              <div
                className="pixel-frame ring-1 ring-white/15 shadow-2xl cursor-pointer"
                style={{ zIndex: 10 }}
                data-label="iPlay: Media3 Player"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="./assets/iplay-screenshot.png"
                    alt="iPlay"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
              {/* Vitals: Mid-Right */}
              <div
                className="pixel-frame ring-1 ring-white/15 shadow-2xl cursor-pointer"
                style={{ zIndex: 15 }}
                data-label="VITALS: System Diagnostics"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="./assets/vitals-screenshot.png"
                    alt="Vitals"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
              {/* Play Store: Center Front (Main) */}
              <div
                className="pixel-frame ring-1 ring-white/20 shadow-2xl cursor-pointer"
                style={{ zIndex: 20 }}
                data-label="Available on Google Play"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="./assets/play-store-screen.jpeg"
                    alt="Play Store"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Interactive Stack Label */}
            <div className="w-full flex justify-center">
              <div
                id="hero-stack-label"
                className="bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-full py-2 px-6 text-[10px] font-mono text-blue-400 tracking-wider uppercase opacity-0 shadow-lg"
              >
                Available on Google Play
              </div>
            </div>
          </div>
        </section>

        {/* ENGINEERING APPROACH */}
        <section id="engineering-approach" className="space-y-8" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <Settings2 className="w-4 h-4" /> Engineering Approach
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'Understand', desc: 'Lifecycle constraints & requirements.', color: 'border-t-slate-700 text-slate-500' },
              { step: '02', title: 'Model', desc: 'Explicit state & domain models.', color: 'border-t-blue-500 text-blue-400' },
              { step: '03', title: 'Architect', desc: 'Clean boundaries & DI patterns.', color: 'border-t-purple-500 text-purple-400' },
              { step: '04', title: 'Implement', desc: 'Native APIs & idiomatic Kotlin.', color: 'border-t-emerald-500 text-emerald-400' },
              { step: '05', title: 'Validate', desc: 'Profiling, tests & edge cases.', color: 'border-t-amber-500 text-amber-400' },
              { step: '06', title: 'Ship', desc: 'Play Console & CI/CD pipeline.', color: 'border-t-rose-500 text-rose-400' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`subtle-card p-5 rounded-2xl space-y-2 border-t-2 ${item.color.split(' ')[0]}`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className={`text-2xl font-black font-mono ${item.color.split(' ')[1]}`}>{item.step}</div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED WORK (Projects) */}
        <section id="work" className="space-y-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 uppercase tracking-wider">
              <Code2 className="w-4 h-4" /> Selected Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering <span className="text-gradient-accent">Case Studies</span>
            </h2>
          </div>

          {/* 01: iPlay Music Player */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 select-none pointer-events-none">
              01
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    LIVE PRODUCT
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">•</span>
                  <span className="text-xs text-slate-400 font-mono">Published Android Application</span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">•</span>
                  <span className="text-xs text-purple-400 font-mono">Zero-Copy Audio Engine</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">iPlay Music Player</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  High-Performance Local Audio Player with Realm Zero-Copy Indexing &amp; Media3 Architecture
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <GlassButton
                  href="https://play.google.com/store/apps/details?id=com.vasist.iplay"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                >
                  <span>View on Google Play</span> <ExternalLink className="w-4 h-4" />
                </GlassButton>
                <GlassButton
                  href="https://github.com/VasistB/Music-Play"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                >
                  <GitBranch className="w-4 h-4 text-purple-400" /> <span>Repository</span> <ExternalLink className="w-4 h-4" />
                </GlassButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Screenshots Column */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div
                  className="relative w-[230px] sm:w-[250px] aspect-[9/20] pixel-frame ring-1 ring-white/15 shadow-2xl group"
                >
                  <div className="pixel-camera"></div>
                  <div className="pixel-screen">
                    <img
                      src="./assets/iplay-screenshot.png"
                      alt="iPlay Music Player"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Engineering Copy Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* Core Engineering Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-blue-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" /> High-Parallelism Media Scanner
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Eliminated main-thread choking when indexing massive local audio collections by architecting a decoupled <strong className="text-white font-medium">Producer-Consumer pipeline</strong> using Kotlin Channels and structured Coroutines (4 concurrent worker threads parsing MediaStore cursors into a 500-capacity buffered channel with 50-track batch saves into Realm).
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-400" /> Realm Zero-Copy Persistence
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Selected <strong className="text-white font-medium">Realm Database</strong> over Room to eliminate Java/Kotlin object-copy allocation overhead for libraries with 10,000+ tracks. Maps database files directly to memory for instant 120 FPS scrolling and native reactive <code className="text-[11px] font-mono text-slate-200">Flow</code> stream bindings without SQL trigger boilerplate.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-purple-400" /> Media3 Core &amp; Google Cast
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Engineered the audio pipeline around <code className="text-[11px] font-mono text-slate-200">androidx.media3</code> MediaSession + MediaController, surviving Activity process death and configuration changes. Integrated Google Cast framework for seamless local-to-Chromecast audio stream handoff.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" /> Morphing UI &amp; Dynamic Palette
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Constructed a context-morphing Mini-to-Full player using <code className="text-[11px] font-mono text-slate-200">ConstraintLayout Compose</code> and <code className="text-[11px] font-mono text-slate-200">BoxWithConstraints</code> with zero hardcoded dimension dependencies. Integrated Android Palette API to extract vibrant artwork colors dynamically.
                    </p>
                  </div>
                </div>

                {/* Engineering Results & Impact */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                    Engineering Results &amp; Impact
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 4x faster library indexing via concurrent producer-consumer pipeline
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Zero UI thread jank or frame drops during fast scrolling (Realm zero-copy)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Playback and active queue survive Activity lifecycle transitions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Seamless local-to-Chromecast audio stream casting handoff
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Precision 5-band equalizer with custom presets and reactive audio feedback
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Dynamic palette color extraction from album art with smooth transitions
                    </li>
                  </ul>
                </div>

                {/* Architecture Diagram: Producer-Consumer Scanner */}
                <div className="subtle-card p-6 rounded-2xl space-y-4 shadow-inner overflow-x-auto">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" /> High-Parallelism Media Scanner Pipeline
                  </div>

                  <div className="flex flex-col items-center gap-2 font-mono text-xs min-w-[340px]">
                    <div className="w-64 p-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-center text-blue-200">
                      <div className="font-bold">MediaStore Audio Cursor</div>
                      <span className="text-[9px] text-blue-400/80 mt-0.5 block">Raw System Audio Provider</span>
                    </div>

                    <div className="text-slate-600 text-xs">↓ Producer Jobs (Parallelism: 4) ↓</div>

                    <div className="w-72 p-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-center text-indigo-200">
                      <div className="font-bold">Buffered Channel (Capacity: 500)</div>
                      <span className="text-[9px] text-indigo-400/80 block">Asynchronous Non-Blocking Queue</span>
                    </div>

                    <div className="text-slate-600 text-xs">↓ Consumer Job (Batch Size: 50) ↓</div>

                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-center text-emerald-200 flex flex-col items-center">
                        <span className="font-bold">Realm DB (Zero-Copy)</span>
                        <span className="text-[9px] text-emerald-400/70 mt-1 uppercase">Direct Memory Mapped Index</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-center text-purple-200 flex flex-col items-center">
                        <span className="font-bold">Media3 Service &amp; Cast</span>
                        <span className="text-[9px] text-purple-400/70 mt-1 uppercase">Foreground MediaSession</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest border-b border-blue-500/20 pb-2">
                    Core Technologies &amp; Libraries
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-300">
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Kotlin</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Jetpack Compose</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">ConstraintLayout Compose</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Media3 ExoPlayer</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">MediaSession</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Google Cast SDK</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Realm Database</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Dagger Hilt (KSP)</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Palette API</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Kotlin Channels &amp; Flows</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 02: VStream */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 select-none pointer-events-none">
              02
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    OTT STREAMING
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">•</span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-purple-400" /> Mobile &amp; <Tv className="w-3.5 h-3.5 text-blue-400" /> Android TV
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">VStream</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  Dual-Platform OTT Streaming Application with Adaptive Media3 &amp; MVI Architecture
                </p>
              </div>
              <GlassButton
                href="https://github.com/VasistB/V_stream"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                <GitBranch className="w-4 h-4" /> <span>View Repository</span> <ExternalLink className="w-4 h-4" />
              </GlassButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Screenshots Column */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div
                  className="relative w-[230px] sm:w-[250px] aspect-[9/20] pixel-frame ring-1 ring-white/15 shadow-2xl group"
                >
                  <div className="pixel-camera"></div>
                  <div className="pixel-screen">
                    <img
                      src="./assets/vstream-home.png"
                      alt="VStream Dual-Platform OTT Streaming"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Engineering Copy Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* Core Engineering Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Tv className="w-4 h-4 text-purple-400" /> Dual-Surface Architecture
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Engineered a unified codebase targeting both Android Mobile and Android TV from a single module. Uses <span className="text-purple-300 font-mono text-xs">DeviceUiModeResolver</span> to dynamically switch between touch layouts (<code className="text-[11px] font-mono text-slate-200">Compose M3</code>) and 10-foot remote D-Pad focus (<code className="text-[11px] font-mono text-slate-200">TV Material3</code>), sharing 100% of domain logic, repositories, and ViewModels.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-blue-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-blue-400" /> Media3 ExoPlayer Engine
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Architected a resilient video streaming engine supporting adaptive HLS (<code className="text-[11px] font-mono text-slate-200">.m3u8</code>) streams, custom seek clamping, background audio lifecycle management, and real-time state tracking via <span className="text-blue-300 font-mono text-xs">StateFlow&lt;PlaybackSnapshot&gt;</span>.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" /> Unidirectional MVI Pattern
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Structured all features around a strict MVI contract (<span className="text-emerald-300 font-mono text-xs">UiState</span>, <span className="text-emerald-300 font-mono text-xs">UiEvent</span>, <span className="text-emerald-300 font-mono text-xs">UiEffect</span>) extending <code className="text-[11px] font-mono text-slate-200">MviViewModel</code>. Eliminates mutable state leaks and reliably handles one-shot navigation and toast side effects.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Lifecycle &amp; Playback Gating
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Implemented guest preview restrictions with a 30-second clamp. Integrated a custom <code className="text-[11px] font-mono text-slate-200">LifecycleEventObserver</code> and auth redirect flow that preserves exact playback position and automatically resumes video upon successful login.
                    </p>
                  </div>
                </div>

                {/* Engineering Results & Impact */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                    Engineering Results &amp; Impact
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Single APK &amp; module powering both Mobile &amp; TV
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% shared ViewModels across touch &amp; D-Pad UIs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Multi-profile local data isolation in Room DB
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Sub-second resume-playback with timestamp restoration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Full TMDB API caching with offline browsing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Adaptive HLS video streaming via Jetpack Media3
                    </li>
                  </ul>
                </div>

                {/* Unified Architecture Diagram */}
                <div className="subtle-card p-6 rounded-2xl space-y-4 shadow-inner overflow-x-auto">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Unified Dual-Surface Architecture
                  </div>

                  <div className="flex flex-col items-center gap-2 font-mono text-xs min-w-[340px]">
                    <div className="w-full grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-center text-purple-200">
                        <div className="font-bold flex items-center justify-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> Mobile UI</div>
                        <span className="text-[9px] text-purple-400/80 mt-0.5 block">Touch &amp; Gestures (Compose M3)</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-center text-blue-200">
                        <div className="font-bold flex items-center justify-center gap-1.5"><Tv className="w-3.5 h-3.5" /> Android TV UI</div>
                        <span className="text-[9px] text-blue-400/80 mt-0.5 block">D-Pad &amp; Focus (TV Material3)</span>
                      </div>
                    </div>

                    <div className="text-slate-600 text-xs">↓ DeviceUiModeResolver ↓</div>

                    <div className="w-64 p-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-center text-indigo-200">
                      <div className="font-bold">Shared MviViewModel</div>
                      <span className="text-[9px] text-indigo-400/80 block">StateFlow&lt;UiState&gt; • UiEvent • Channel&lt;UiEffect&gt;</span>
                    </div>

                    <div className="w-full flex justify-center text-slate-600 gap-24 sm:gap-32 px-4">
                      <span className="text-lg">↙</span>
                      <span className="text-lg">↘</span>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-center text-emerald-200 flex flex-col items-center">
                        <span className="font-bold">Media3 ExoPlayer</span>
                        <span className="text-[9px] text-emerald-400/70 mt-1 uppercase">HLS Engine &amp; PlaybackSnapshot</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-center text-cyan-200 flex flex-col items-center">
                        <span className="font-bold">Room DB &amp; TMDB API</span>
                        <span className="text-[9px] text-cyan-400/70 mt-1 uppercase">Multi-Profile Persistence &amp; Caching</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest border-b border-purple-500/20 pb-2">
                    Core Technologies &amp; Libraries
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-300">
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Kotlin</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Jetpack Compose</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Android TV (Leanback &amp; TV M3)</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Media3 ExoPlayer</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">HLS (.m3u8) Streaming</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">MVI Pattern</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Google Hilt</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Room DB (KSP)</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Retrofit 2 &amp; OkHttp 4</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">TMDB API</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">StateFlow &amp; Coroutines</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 03: GPS Camera */}
          <div className="subtle-card rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 select-none pointer-events-none">
              03
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    CAMERA &amp; SENSORS
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">•</span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" /> Real-Time EXIF Pipeline
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">GPS Camera</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  Hardware CameraX &amp; Real-Time Geospatial Metadata Composition Utility
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Screenshots Column */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div
                  className="relative w-[230px] sm:w-[250px] aspect-[9/20] pixel-frame ring-1 ring-white/10 shadow-2xl group"
                >
                  <div className="pixel-camera"></div>
                  <div className="pixel-screen">
                    <img
                      src="./assets/gps-camera-screenshot.png"
                      alt="GPS Camera App"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Engineering Copy Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* Core Engineering Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-emerald-400" /> CameraX Lifecycle Management
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Orchestrated native camera pipelines using <code className="text-[11px] font-mono text-slate-200">CameraX 1.4</code> across Preview, ImageCapture, and ImageAnalysis use cases. Bound strictly to lifecycle owners to eliminate camera hardware locking, battery drain, and memory leaks during orientation transitions.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-blue-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-400" /> Geospatial &amp; Orientation Fusion
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Fused high-accuracy GPS coordinates via <code className="text-[11px] font-mono text-slate-200">FusedLocationProviderClient</code> with hardware sensors (magnetometer + accelerometer) to compute low-pass filtered compass azimuth, pitch, and magnetic declination in real time.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400" /> Canvas Stamp &amp; EXIF Injection
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Built a non-blocking in-memory bitmap composition engine that stamps dynamic address tags, geohashes, coordinates, and timestamps onto image frames while writing standard GPS metadata into JPEG <code className="text-[11px] font-mono text-slate-200">ExifInterface</code> headers without UI jank.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-amber-400" /> Scoped Storage &amp; MediaStore
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Engineered a resilient storage pipeline compliant with modern Android scoped storage rules, writing captured images safely to public DCIM / Pictures directories via MediaStore while handling runtime permission states with zero friction.
                    </p>
                  </div>
                </div>

                {/* Engineering Results & Impact */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                    Engineering Results &amp; Impact
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Sub-second shutter latency during high-res canvas metadata stamping
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> High-precision GPS coordinate lock with geocoded reverse address lookup
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Dual metadata layer: visible watermark stamp + embedded standard EXIF tags
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Real-time compass azimuth and magnetic declination calculation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Robust scoped storage pipeline writing directly to DCIM via MediaStore
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Hardware camera lifecycle resilience across rotation and backgrounding
                    </li>
                  </ul>
                </div>

                {/* Processing Pipeline Diagram */}
                <div className="subtle-card p-6 rounded-2xl space-y-4 shadow-inner overflow-x-auto">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Real-time Image Processing &amp; EXIF Pipeline
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2.5 font-mono text-[10px] text-slate-300 min-w-[340px]">
                    <span className="px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10">CameraX 1.4 Capture</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10">FusedLocation &amp; Sensor Fusion</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10">In-Memory Canvas Stamp</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10">EXIF Tag Injection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="px-2.5 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30">MediaStore Output</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                    Core Technologies &amp; Libraries
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-300">
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Kotlin</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">CameraX (1.4)</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">FusedLocationProviderClient</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Hardware SensorManager</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">ExifInterface</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">MediaStore API</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Scoped Storage</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Coroutines &amp; StateFlow</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Jetpack Lifecycle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 04: Vitals */}
          <div className="subtle-card rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 select-none pointer-events-none">
              04
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    SYSTEM &amp; TELEMETRY
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">•</span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-400" /> Hardware Diagnostics Engine
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> In Active Development
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">Vitals</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  Real-Time Hardware Diagnostics, Fast Charging Protocols &amp; System Telemetry Suite
                </p>
              </div>
              <GlassButton
                href="https://github.com/VasistB/Vitals"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                <GitBranch className="w-4 h-4" /> <span>View Repository</span> <ExternalLink className="w-4 h-4" />
              </GlassButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Screenshots Column */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div
                  className="relative w-[230px] sm:w-[250px] aspect-[9/20] pixel-frame ring-1 ring-white/10 shadow-2xl group"
                >
                  <div className="pixel-camera"></div>
                  <div className="pixel-screen">
                    <img
                      src="./assets/vitals-screenshot.png"
                      alt="Vitals Diagnostics App"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Engineering Copy Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* Core Engineering Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4 text-amber-400" /> Fast-Charging Protocol Detection
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Engineered a hardware telemetry detector (<code className="text-[11px] font-mono text-slate-200">ChargingProtocolDetector</code>) that decodes raw kernel voltage/amperage profiles to identify 12+ proprietary charging standards including USB Power Delivery PPS, Qualcomm Quick Charge (QC), Samsung SFC, VOOC/SuperVOOC, and Mi HyperCharge.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-blue-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-blue-400" /> Multi-Tier Power &amp; Wattage Analytics
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Computes real-time wattage (<code className="text-[11px] font-mono text-slate-200">V × A</code>), microamperes (mA), and thermal dissipation, dynamically categorizing charging throughput across 7 speed classifications from Legacy 5W up to 240W Extreme Fast charging tiers with live health degradation indexing.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-400" /> Floating Telemetry HUD Overlay
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Architected a low-overhead foreground <code className="text-[11px] font-mono text-slate-200">TelemetryService</code> paired with a floating window manager overlay (<code className="text-[11px] font-mono text-slate-200">TelemetryOverlayHelper</code>) enabling real-time PiP FPS, battery drain, thermal throttling, and CPU frequency tracking over gaming and benchmarking sessions.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" /> Modular Multi-Domain Repositories
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Structured across 8 specialized repositories (<span className="text-emerald-300 font-mono text-xs">Battery</span>, <span className="text-emerald-300 font-mono text-xs">CPU</span>, <span className="text-emerald-300 font-mono text-xs">Thermals</span>, <span className="text-emerald-300 font-mono text-xs">Display</span>, <span className="text-emerald-300 font-mono text-xs">Hardware</span>, <span className="text-emerald-300 font-mono text-xs">Memory/Storage</span>, <span className="text-emerald-300 font-mono text-xs">Network</span>) emitting immutable <code className="text-[11px] font-mono text-slate-200">StateFlow</code> streams to Compose ViewModels via Dagger Hilt (KSP).
                    </p>
                  </div>
                </div>

                {/* Engineering Results & Impact */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                    Engineering Results &amp; Impact
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Real-time wattage, voltage, and mA telemetry sampled at sub-second intervals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Accurate OEM fast-charging protocol detection (USB-PD PPS, QC, SFC, VOOC)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Thermal throttling warning states (Safe, Warm, Hot, Thermal Limited)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Low-overhead floating PiP overlay for live gaming and benchmark telemetry
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> TargetSdk 37 compilation with modern Android battery &amp; power APIs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Custom Compose gauges, segmented progress bars, and vertical charge charts
                    </li>
                  </ul>
                </div>

                {/* Telemetry Architecture Diagram */}
                <div className="subtle-card p-6 rounded-2xl space-y-4 shadow-inner overflow-x-auto">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Real-time System Telemetry Engine
                  </div>

                  <div className="flex flex-col items-center gap-2 font-mono text-xs min-w-[340px]">
                    <div className="w-full grid grid-cols-3 gap-2">
                      <div className="p-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-center text-amber-200">
                        <span className="font-bold block">BatteryManager</span>
                        <span className="text-[9px] text-amber-400/80">Volts / Amps / Temp</span>
                      </div>
                      <div className="p-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-center text-blue-200">
                        <span className="font-bold block">Power &amp; Thermals</span>
                        <span className="text-[9px] text-blue-400/80">Throttling Status</span>
                      </div>
                      <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-center text-purple-200">
                        <span className="font-bold block">CPU &amp; Memory</span>
                        <span className="text-[9px] text-purple-400/80">Frequency / RAM</span>
                      </div>
                    </div>

                    <div className="text-slate-600 text-xs">↓ Foreground TelemetryService (Off-Thread Coroutines) ↓</div>

                    <div className="w-72 p-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-center text-indigo-200">
                      <div className="font-bold">StateFlow Telemetry Streams</div>
                      <span className="text-[9px] text-indigo-400/80 block">Immutable Multi-Domain Repository Layer</span>
                    </div>

                    <div className="w-full flex justify-center text-slate-600 gap-24 sm:gap-32 px-4">
                      <span className="text-lg">↙</span>
                      <span className="text-lg">↘</span>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-center text-emerald-200 flex flex-col items-center">
                        <span className="font-bold">Compose Material 3 Dashboard</span>
                        <span className="text-[9px] text-emerald-400/70 mt-1 uppercase">Advanced Gauges &amp; Charts</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-center text-cyan-200 flex flex-col items-center">
                        <span className="font-bold">Floating Diagnostic HUD</span>
                        <span className="text-[9px] text-cyan-400/70 mt-1 uppercase">WindowManager PiP Overlay</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-widest border-b border-amber-500/20 pb-2">
                    Core Technologies &amp; Libraries
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-300">
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Kotlin</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Jetpack Compose (BOM)</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Material 3</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Dagger Hilt (KSP)</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Navigation Compose</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">BatteryManager</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">PowerManager</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Thermal APIs</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">WindowManager Overlay</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">BroadcastReceivers</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">StateFlow &amp; Coroutines</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROFESSIONAL EXPERIENCE */}
        <section id="experience" className="space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-400 uppercase tracking-wider">
            <Briefcase className="w-4 h-4" /> Engineering Experience
          </div>

          <div className="relative pl-4 md:pl-0">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-[120px] top-2 bottom-2 w-[1px] bg-white/10 z-0"></div>

            <div className="relative z-10 space-y-12">
              {/* 01: X-YUG Technology (Current Role) */}
              <div className="flex flex-col md:flex-row md:gap-12">
                <div className="md:w-[120px] shrink-0 pt-2 pb-4 md:pb-0 font-mono text-xs text-slate-400 md:text-right relative">
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute right-[-5px] top-2.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] z-10"></div>
                  <div>Sept 2026 —<br className="hidden md:inline" /> Present</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center md:justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Current
                  </div>
                </div>

                <div className="subtle-card rounded-3xl p-6 sm:p-8 flex-grow space-y-8 border-t-2 border-t-emerald-500/50" data-aos="fade-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">Android Developer</h3>
                      <div className="text-xs sm:text-sm text-emerald-400 font-medium font-mono mt-0.5 flex flex-wrap items-center gap-2">
                        <span>X-YUG Technology</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300 font-semibold">Dealshot (OTT Platform)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(52,211,153,0.15)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Sept 2026 – Present (Current)
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" /> Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {[
                        'Kotlin',
                        'Jetpack Compose',
                        'ExoPlayer',
                        'Dagger Hilt',
                        'Retrofit & OkHttp',
                        'Coroutines & Flow',
                        'Clean Architecture',
                        'MVVM / MVI',
                        'Room DB',
                        'Material 3',
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/5 text-slate-300 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Contributions */}
                  <div className="space-y-4 pt-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Key Engineering Focus — Dealshot OTT Platform
                    </div>

                    <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        <span>
                          Architecting core streaming features for <strong className="text-white font-semibold">Dealshot</strong>, an OTT entertainment platform, integrating <strong className="text-white font-semibold">ExoPlayer</strong> for seamless, high-performance media playback, dynamic buffer configuration, and adaptive bitrate streaming.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        <span>
                          Engineered a precision <strong className="text-white font-semibold">preview restriction and content-gating engine</strong>, enforcing time-capped preview windows and subscription paywall prompts for unauthorized or trial sessions.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        <span>
                          Constructed intuitive, modern <strong className="text-white font-semibold">Login and Profile screens</strong> in <strong className="text-white font-semibold">Jetpack Compose</strong>, implementing secure token management, session persistence, and smooth state animations.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        <span>
                          Designed resilient REST API client pipelines with <strong className="text-white font-semibold">Retrofit &amp; OkHttp</strong>, injecting repositories and use cases seamlessly across the app using <strong className="text-white font-semibold">Dagger Hilt</strong>.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        <span>
                          Established a decoupled presentation layer following <strong className="text-white font-semibold">Clean Architecture &amp; MVVM</strong>, using <strong className="text-white font-semibold">Kotlin Coroutines, StateFlow, and SharedFlow</strong> for deterministic unidirectional data flow.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 02: Survey Heart */}
              <div className="flex flex-col md:flex-row md:gap-12">
                <div className="md:w-[120px] shrink-0 pt-2 pb-4 md:pb-0 font-mono text-xs text-slate-400 md:text-right relative">
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute right-[-5px] top-2.5 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] z-10"></div>
                  <div>Sept 2022 —<br className="hidden md:inline" /> Nov 2024</div>
                  <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">2.4 years</div>
                </div>

                <div className="subtle-card rounded-3xl p-6 sm:p-8 flex-grow space-y-8" data-aos="fade-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">Junior Android Developer</h3>
                      <div className="text-xs sm:text-sm text-purple-400 font-medium font-mono mt-0.5">
                        Survey Heart – Android, iOS &amp; Web
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                        Sept 2022 – Nov 2024 (2.4 years)
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-400" /> Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {[
                        'Kotlin',
                        'Coroutines',
                        'XML',
                        'MVVM',
                        'Room DB',
                        'Realm DB',
                        'Retrofit',
                        'WorkManager',
                        'Firebase Crashlytics',
                        'Espresso',
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/5 text-slate-300 rounded-lg border border-white/10 hover:border-purple-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Contributions */}
                  <div className="space-y-4 pt-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Key Engineering Contributions
                    </div>

                    <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                        <span>
                          Designed an interactive <strong className="text-white font-semibold">'Spotlight'</strong> onboarding feature to highlight new application capabilities, integrating targeted YouTube video redirects to improve feature discovery and user adoption.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                        <span>
                          Developed a comprehensive <strong className="text-white font-semibold">cloud storage management system</strong> integrating a custom backend API and MongoDB, enabling users to seamlessly view and delete their uploaded image files hosted on AWS.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                        <span>
                          Contributed to a major architectural shift by assisting in the <strong className="text-white font-semibold">database migration from Room to Realm DB</strong>, improving cross-platform data handling and query performance.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                        <span>
                          Engineered with a resilient <strong className="text-white font-semibold">background download pipeline</strong> using DownloadManager, WorkManager, and Coroutines, ensuring the seamless and uninterrupted retrieval of large files without blocking the main thread.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                        <span>
                          Accelerated bug resolution by integrating <strong className="text-white font-semibold">Firebase Crashlytics</strong> with a custom post-crash feedback system, allowing users to attach screen recordings and comments upon relaunch.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL DEPTH (Technologies Grid) */}
        <section id="depth" className="space-y-10 overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Technical Depth
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <div className="subtle-card p-5 rounded-2xl space-y-4" data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-400" /> Application
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <img src="./assets/kotlin.svg" className="w-4 h-4" alt="" /> Kotlin
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Coroutines
                  </li>
                  <li className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-blue-400" /> Flow / StateFlow
                  </li>
                  <li className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-purple-400" /> Jetpack Compose
                  </li>
                  <li className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-rose-400" /> Material 3
                  </li>
                </ul>
              </div>

              <div className="subtle-card p-5 rounded-2xl space-y-4" data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <Component className="w-4 h-4 text-purple-400" /> Architecture
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-400" /> MVVM
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Clean Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" /> Repository Pattern
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-400" /> Use Cases
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-rose-400" /> Dagger Hilt
                  </li>
                </ul>
              </div>

              <div className="subtle-card p-5 rounded-2xl space-y-4" data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" /> Data
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <img src="./assets/realm.svg" className="w-4 h-4" alt="" /> Realm DB
                  </li>
                  <li className="flex items-center gap-2">
                    <Table className="w-4 h-4 text-blue-400" /> Room DB
                  </li>
                  <li className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-400" /> MediaStore API
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" /> Retrofit
                  </li>
                  <li className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-slate-400" /> Offline Caching
                  </li>
                </ul>
              </div>

              <div className="subtle-card p-5 rounded-2xl space-y-4" data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-rose-400" /> Platform
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-blue-400" /> Media3 / ExoPlayer
                  </li>
                  <li className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-400" /> CameraX
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" /> Location APIs
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" /> WorkManager
                  </li>
                  <li className="flex items-center gap-2">
                    <img src="./assets/android.svg" className="w-4 h-4" alt="" /> Android Services
                  </li>
                </ul>
              </div>

              <div className="subtle-card p-5 rounded-2xl space-y-4" data-aos="fade-up" data-aos-delay="400">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" /> Quality
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <TestTube className="w-4 h-4 text-rose-400" /> Espresso
                  </li>
                  <li className="flex items-center gap-2">
                    <img src="./assets/firebase.svg" className="w-4 h-4" alt="" /> Crashlytics
                  </li>
                  <li className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-orange-400" /> Git
                  </li>
                  <li className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-blue-400" /> Gradle Kotlin DSL
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-slate-400" /> Version Catalogs
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Android Native
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Jetpack Compose
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Media Systems
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Offline-First
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ENGINEERING PHILOSOPHY */}
        <section id="philosophy" className="space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Engineering Philosophy
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'State is Explicit', body: 'UI should render state, not own business logic. I build with unidirectional data flow (UDF) to ensure predictable behavior.' },
              { title: 'Offline First', body: 'Local data should remain useful when network disappears. Persistence is a first-class citizen in my architectures.' },
              { title: 'Lifecycle Aware', body: 'Long-running work should not depend on an Activity or Composable. I leverage WorkManager and Service-based solutions.' },
              { title: 'Measure Before Optimizing', body: 'Performance decisions come from profiling, not assumptions. I use Benchmark and Profiler tools to validate changes.' },
              { title: 'Failure is a State', body: 'Loading, empty, partial and error states are part of the core architecture, not an afterthought.' },
            ].map((item, idx) => (
              <div key={idx} className="subtle-card p-6 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono text-blue-300">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pt-10">
          <div className="glass-card p-10 sm:p-16 rounded-[2.5rem] text-center space-y-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10" data-aos="zoom-in">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Let's build something <br />
                <span className="text-gradient-accent">that works.</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Android engineering • Native systems • Media • Offline-first • Compose
              </p>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                AVAILABLE FOR FULL-TIME, PART-TIME & FREELANCING
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
              <GlassButton
                onClick={handleCopyEmail}
                variant="primary"
                size="md"
              >
                <img src="./assets/gmail.svg" className="w-4 h-4" alt="Gmail" />
                <span>vasistvr@gmail.com</span>
              </GlassButton>
              <GlassButton
                href="./assets/Vasist_Resume_updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <FileText className="w-4 h-4 text-slate-300" /> <span>Resume</span>
              </GlassButton>
              <GlassButton
                href="https://www.linkedin.com/in/vasist-vamsi-bhukya-03304723a/"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <img src="./assets/linkedin.svg" className="w-4 h-4" alt="LinkedIn" /> <span>LinkedIn</span>
              </GlassButton>
              <GlassButton
                href="https://github.com/VasistB"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <img src="./assets/github.svg" className="w-4 h-4 opacity-80" alt="GitHub" /> <span>GitHub</span>
              </GlassButton>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button: Back to Top */}
      <button
        id="back-to-top"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 glass-button w-12 h-12 rounded-full opacity-0 translate-y-10 pointer-events-none transition-all duration-300 shadow-2xl hover:scale-110 active:scale-90"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>

      <footer className="w-full border-t border-white/5 py-8 mt-20 text-center">
        <p className="text-xs font-mono text-slate-400">
          Built with performance, accessibility, and clean architecture in mind.
          <br />
          &copy; 2026 Vasist Vamsi Bhukya.
        </p>
      </footer>
    </div>
  )
}
