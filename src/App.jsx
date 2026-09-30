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
  Sparkles
} from 'lucide-react'
import gsap from 'gsap'
import AOS from 'aos'
import GlassButton from './components/GlassButton'

export default function App() {
  const [activeNav, setActiveNav] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true,
      duration: 800,
      offset: 80,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    })

    // Scroll Progress & Active Section Observer
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100

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
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveNav(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // GSAP Scroll Reveal Effect
    const revealOnScroll = () => {
      const elements = document.querySelectorAll('.subtle-card, .glass-card, section h2, .pixel-frame[data-reveal]')
      elements.forEach(el => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight - 80
        if (isVisible) {
          const revealType = el.getAttribute('data-reveal')
          const config = {
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out'
          }

          if (revealType === 'left' || revealType === 'right') {
            config.x = 0
          } else {
            config.y = 0
          }

          gsap.to(el, config)
        }
      })
    }

    document.querySelectorAll('.subtle-card, .glass-card, section h2, .pixel-frame[data-reveal]').forEach(el => {
      el.style.opacity = '0'
      const revealType = el.getAttribute('data-reveal')
      if (revealType === 'left') {
        gsap.set(el, { x: -80 })
      } else if (revealType === 'right') {
        gsap.set(el, { x: 80 })
      } else {
        gsap.set(el, { y: 25 })
      }
    })

    window.addEventListener('scroll', revealOnScroll, { passive: true })
    revealOnScroll() // Initial check

    // Hero Device Stack Animation
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
      // 1. GPS Camera (Center Back)
      heroTimeline.to(devices[0], { opacity: 1, x: 0, y: -40, rotate: 0, scale: 0.8, duration: 1, ease: 'back.out(1.5)' })
      updateLabel(devices[0].getAttribute('data-label'))

      // 2. iPlay (Left)
      heroTimeline.to(devices[1], { opacity: 1, x: -85, y: -10, rotate: -12, scale: 0.85, duration: 1, ease: 'back.out(1.5)' }, '+=0.4')
      updateLabel(devices[1].getAttribute('data-label'))

      // 3. Vitals (Right)
      heroTimeline.to(devices[2], { opacity: 1, x: 85, y: -10, rotate: 12, scale: 0.85, duration: 1, ease: 'back.out(1.5)' }, '+=0.4')
      updateLabel(devices[2].getAttribute('data-label'))

      // 4. Play Store (Center Front - Main)
      heroTimeline.to(devices[3], { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.6, ease: 'elastic.out(1, 0.8)' }, '+=0.4')
      updateLabel(devices[3].getAttribute('data-label'))

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
      window.removeEventListener('scroll', revealOnScroll)
      if (heroTimeline) heroTimeline.kill()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopyEmail = (e) => {
    e.preventDefault()
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
              href="/assets/Vasist_Resume_updated.pdf"
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
                href="/assets/Vasist_Resume_updated.pdf"
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
                <span className="text-white font-extrabold text-lg sm:text-2xl">3+ YEARS</span>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Android Dev</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-4">
                <span className="text-white font-extrabold text-lg sm:text-2xl">3</span>
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
                <img src="/assets/github.svg" className="w-4 h-4 opacity-90" alt="GitHub" />
                <span>GitHub</span>
              </GlassButton>
              <GlassButton
                href="https://www.linkedin.com/in/vasist-vamsi-bhukya-03304723a/"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <img src="/assets/linkedin.svg" className="w-4 h-4" alt="LinkedIn" />
                <span>LinkedIn</span>
              </GlassButton>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6 pt-4 lg:pt-0">
            <div className="device-stack" id="hero-device-stack">
              {/* GPS Camera: Center back (Backmost) */}
              <div
                className="pixel-frame ring-1 ring-white/10 shadow-2xl"
                style={{ zIndex: 5 }}
                data-label="GCAM: Location Field Utility"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="/assets/gps-camera-screenshot.png"
                    alt="GPS Camera"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
              {/* iPlay: Left */}
              <div
                className="pixel-frame ring-1 ring-white/15 shadow-2xl"
                style={{ zIndex: 10 }}
                data-label="iPlay: Media3 Player"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="/assets/iplay-screenshot.png"
                    alt="iPlay"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
              {/* Vitals: Right */}
              <div
                className="pixel-frame ring-1 ring-white/15 shadow-2xl"
                style={{ zIndex: 15 }}
                data-label="VITALS: System Diagnostics"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="/assets/vitals-screenshot.png"
                    alt="Vitals"
                    className="absolute inset-0 w-full h-full object-cover active"
                  />
                </div>
              </div>
              {/* Play Store: Center Front (Main) */}
              <div
                className="pixel-frame ring-1 ring-white/20 shadow-2xl"
                style={{ zIndex: 20 }}
                data-label="Available on Google Play"
              >
                <div className="pixel-camera"></div>
                <div className="pixel-screen">
                  <img
                    src="/assets/play-store-screen.jpeg"
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
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">iPlay Music Player</h3>
              </div>
              <GlassButton
                href="https://play.google.com/store/apps/details?id=com.vasist.iplay"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                <span>View on Google Play</span> <ExternalLink className="w-4 h-4" />
              </GlassButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Screenshots Column */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div
                  className="relative w-[230px] sm:w-[250px] aspect-[9/20] pixel-frame ring-1 ring-white/15 shadow-2xl group"
                  data-reveal="left"
                >
                  <div className="pixel-camera"></div>
                  <div className="pixel-screen">
                    <img
                      src="/assets/iplay-screenshot.png"
                      alt="iPlay Music Player"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Engineering Copy Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* Core Engineering Text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-blue-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Queue & Shuffle Engine
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Designed a stateful playback queue that separates display order from playback order, allowing shuffle, filtering, queue restoration, and playback history to operate seamlessly without mutating the underlying library.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" /> Playback Architecture
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Built the playback layer around Media3 MediaController + MediaSession, keeping UI state, playback state, and the active queue synchronized across foreground and background playback.
                    </p>
                  </div>
                  <div className="space-y-3 sm:col-span-2">
                    <h4 className="text-sm font-bold text-emerald-400 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Database className="w-4 h-4" /> Local Library Indexing
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Built a Realm-backed local music index over MediaStore, enabling reactive library updates and offline-first browsing of large local collections, keeping all UI work safely off the main thread.
                    </p>
                  </div>
                </div>

                {/* Engineering Results */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                    Engineering Results & Impact
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Playback continues independently of UI lifecycle
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Queue survives configuration/process restoration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Shuffle preserves current playback position
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Local library remains available offline
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> MediaStore processed off main thread
                    </li>
                  </ul>
                </div>

                {/* Architecture Diagram */}
                <div className="subtle-card p-6 rounded-2xl space-y-4 shadow-inner overflow-x-auto">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" /> System Architecture Flow
                  </div>

                  <div className="flex flex-col items-center gap-2 font-mono text-xs min-w-[320px]">
                    <div className="w-48 p-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-center text-blue-200 shadow-sm">
                      Compose UI
                    </div>
                    <div className="text-slate-600 text-base">↓</div>
                    <div className="w-48 p-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-center text-blue-200">
                      ViewModel
                    </div>
                    <div className="text-slate-600 text-base">↓</div>
                    <div className="w-48 p-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-center text-indigo-200">
                      StateFlow & Use Cases
                    </div>

                    <div className="w-full flex justify-center text-slate-600 gap-24 sm:gap-32 px-4">
                      <span className="text-lg">↙</span>
                      <span className="text-lg">↘</span>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-center text-emerald-200 flex flex-col items-center">
                        <span>Media Repository</span>
                        <span className="text-[9px] text-emerald-400/70 mt-1 uppercase">Persistence Layer</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-center text-purple-200 flex flex-col items-center">
                        <span>Playback Controller</span>
                        <span className="text-[9px] text-purple-400/70 mt-1 uppercase">Media3 Service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 02: GPS Camera */}
          <div className="subtle-card rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 select-none pointer-events-none">
              02
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Camera & Location
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">GPS Camera</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">CameraX + Location Field Utility</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Screenshots Column */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div
                  className="relative w-[230px] sm:w-[250px] aspect-[9/20] pixel-frame ring-1 ring-white/10 shadow-2xl group"
                  data-reveal="right"
                >
                  <div className="pixel-camera"></div>
                  <div className="pixel-screen">
                    <img
                      src="/assets/gps-camera-screenshot.png"
                      alt="GPS Camera App"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Engineering Copy Column */}
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-400" /> Engineering Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Managed hardware camera lifecycles with CameraX while fetching high-accuracy GPS coordinates, sensor orientation, timestamps, and address data to burn directly onto captured image frames natively.
                  </p>
                </div>

                {/* Processing Pipeline */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest border-b border-blue-500/20 pb-2">
                    Image Processing Pipeline
                  </h4>
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] text-slate-300">
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">CameraX</span>
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Image Capture</span>
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Location & Sensors</span>
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Metadata Composition</span>
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30">Final Image</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">Architecture</h4>
                    <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></span> Custom sensor orientation handling.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></span> FusedLocationProviderClient integration.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">Result</h4>
                    <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></span> Zero lag during photo composition
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></span> Embedded EXIF & stamped image output
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 03: Vitals */}
          <div className="subtle-card rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 select-none pointer-events-none">
              03
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    System & Hardware
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> In Active Development
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">Vitals</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">Hardware & System Telemetry Diagnostic Utility</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Screenshots Column */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div
                  className="relative w-[230px] sm:w-[250px] aspect-[9/20] pixel-frame ring-1 ring-white/10 shadow-2xl group"
                  data-reveal="left"
                >
                  <div className="pixel-camera"></div>
                  <div className="pixel-screen">
                    <img
                      src="/assets/vitals-screenshot.png"
                      alt="Vitals Diagnostics App"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Engineering Copy Column */}
              <div className="lg:col-span-8 space-y-8 flex flex-col justify-start">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" /> Real-time System Telemetry
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    A diagnostic utility tracking battery health, charging wattage, thermal status, and hardware profiles. Designed around native Android system receivers and Coroutine flows to provide efficient telemetry.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-widest border-b border-amber-500/20 pb-2">
                    System Integration APIs
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-300">
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">BatteryManager</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">PowerManager</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Thermal APIs</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">Build / Hardware APIs</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">BroadcastReceiver</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">StateFlow</span>
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

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:gap-12">
                <div className="md:w-[120px] shrink-0 pt-2 pb-4 md:pb-0 font-mono text-xs text-slate-400 md:text-right relative">
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute right-[-5px] top-2.5 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] z-10"></div>
                  2022 — 2024
                </div>

                <div className="subtle-card rounded-3xl p-6 sm:p-8 flex-grow space-y-8" data-aos="fade-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">Junior Android Developer</h3>
                      <div className="text-xs sm:text-sm text-purple-400 font-medium font-mono">Survey Heart (Android, iOS & Web)</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 w-max">
                      Mobile & Cloud Engineering
                    </span>
                  </div>

                  <div className="space-y-8">
                    {/* Achievement 1 */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Cloud Storage Pipeline</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="text-slate-400 font-medium">Problem</div>
                        <div className="md:col-span-2 text-slate-300 leading-relaxed">
                          Users lacked a way to manage AWS-hosted image files directly from the mobile app.
                        </div>
                        <div className="text-slate-400 font-medium">Decision</div>
                        <div className="md:col-span-2 text-slate-300 leading-relaxed">
                          Developed a custom storage manager integrating MongoDB and custom backend APIs.
                        </div>
                        <div className="text-slate-400 font-medium">Result</div>
                        <div className="md:col-span-2 text-emerald-400 font-medium">
                          Seamless file management and viewing within the application lifecycle.
                        </div>
                      </div>
                    </div>

                    {/* Achievement 2 */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Background Download Pipeline</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="text-slate-400 font-medium">Problem</div>
                        <div className="md:col-span-2 text-slate-300 leading-relaxed">
                          Large files could outlive the UI lifecycle, causing interrupted downloads.
                        </div>
                        <div className="text-slate-400 font-medium">Decision</div>
                        <div className="md:col-span-2 text-slate-300 leading-relaxed">
                          Moved downloads into a WorkManager + DownloadManager pipeline with retry and persistent progress.
                        </div>
                        <div className="text-slate-400 font-medium">Result</div>
                        <div className="md:col-span-2 text-emerald-400 font-medium">
                          Downloads remained resilient across configuration changes and app lifecycle transitions.
                        </div>
                      </div>
                    </div>

                    {/* Achievement 3 */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Database Architecture</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="text-slate-400 font-medium">Problem</div>
                        <div className="md:col-span-2 text-slate-300 leading-relaxed">
                          Need for reactive, cross-platform local data access for complex models.
                        </div>
                        <div className="text-slate-400 font-medium">Decision</div>
                        <div className="md:col-span-2 text-slate-300 leading-relaxed">Migrated persistence layer from Room to Realm DB.</div>
                        <div className="text-slate-400 font-medium">Result</div>
                        <div className="md:col-span-2 text-emerald-400 font-medium">
                          Achieved consistent reactive data flow across the Android and iOS implementations.
                        </div>
                      </div>
                    </div>
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
                    <img src="/assets/kotlin.svg" className="w-4 h-4" alt="" /> Kotlin
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
                    <img src="/assets/realm.svg" className="w-4 h-4" alt="" /> Realm DB
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
                    <img src="/assets/android.svg" className="w-4 h-4" alt="" /> Android Services
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
                    <img src="/assets/firebase.svg" className="w-4 h-4" alt="" /> Crashlytics
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
                <img src="/assets/gmail.svg" className="w-4 h-4" alt="Gmail" />
                <span>vasistvr@gmail.com</span>
              </GlassButton>
              <GlassButton
                href="/assets/Vasist_Resume_updated.pdf"
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
                <img src="/assets/linkedin.svg" className="w-4 h-4" alt="LinkedIn" /> <span>LinkedIn</span>
              </GlassButton>
              <GlassButton
                href="https://github.com/VasistB"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <img src="/assets/github.svg" className="w-4 h-4 opacity-80" alt="GitHub" /> <span>GitHub</span>
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
