import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Search,
  Sparkles,
  BookOpen,
  Sliders,
  Trophy,
  Flame,
  Newspaper,
  ShieldAlert,
  Send,
  ArrowUp,
  Zap,
  HelpCircle,
  Heart,
  Share2,
  Copy,
  FileText,
  ChevronRight,
  GraduationCap,
  Clock,
  Coffee,
  ShieldCheck,
  Mail,
  ClipboardCheck,
  Activity,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import { BackgroundEffects } from "./components/BackgroundEffects";
import { CommandPalette } from "./components/CommandPalette";
import { IQLaboratory } from "./components/IQLaboratory";
import { LitDepartment } from "./components/LitDepartment";
import { BrotherSimulator } from "./components/BrotherSimulator";
import { MemeGallery } from "./components/MemeGallery";
import { SecretPage } from "./components/SecretPage";

// Data & Sound utils
import {
  timelineData,
  excusesData,
  newsArticlesData,
  playJokes
} from "./data/aqdasData";
import {
  playClick,
  playSuccess,
  playNotification,
  setMuted,
  getMuted,
  startAmbientSynth,
  stopAmbientSynth,
  getIsAmbientPlaying
} from "./utils/audio";

export default function App() {
  // Page routing state
  const [activeTab, setActiveTab] = useState("home");

  // Global settings
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAppMuted, setIsAppMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showCmdPalette, setShowCmdPalette] = useState(false);

  // Loading Screen state
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPct, setLoadingPct] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState("Calibrating Shakespeare dictionaries...");

  // Secret unlockables
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);

  // Back to top trigger
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Roast Generator states
  const [currentRoastIdx, setCurrentRoastIdx] = useState(0);
  const [typedRoast, setTypedRoast] = useState("");
  const [isRoastTyping, setIsRoastTyping] = useState(false);
  const [copiedRoast, setCopiedRoast] = useState(false);
  const [roastShared, setRoastShared] = useState(false);

  // Hall of Fame Certificate states
  const [certName, setCertName] = useState("Aqdas");
  const [certAction, setCertAction] = useState("Slept for 14 hours to escape grocery shopping");
  const [certTitle, setCertTitle] = useState("GRAND MASTER OF EXCUSE ELUCIDATION");
  const [generatedCert, setGeneratedCert] = useState<any>(null);

  // News Room state
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactCategory, setContactCategory] = useState("Chore Evasion Petition");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactValidationErr, setContactValidationErr] = useState("");

  // Loading message cycle
  const loadingMessages = [
    "Calibrating Shakespeare dictionaries...",
    "Expanding excuse generation matrix...",
    "Aligning midnight snack seeking lasers...",
    "Charging overthinking capacitors...",
    "Snoozing secondary alarms...",
    "Analyzing symbols in modern toast...",
    "Initializing Aqdas cognitive core..."
  ];

  useEffect(() => {
    // Increment loading screen
    const interval = setInterval(() => {
      setLoadingPct((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const msgIdx = Math.min(
          loadingMessages.length - 1,
          Math.floor((next / 100) * loadingMessages.length)
        );
        setLoadingMsg(loadingMessages[msgIdx]);
        return Math.min(100, next);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Scroll tracking for progress bar and back to top
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme synchronization with body element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.style.backgroundColor = "#FFFFFF";
  }, [isDarkMode]);

  // Audio configuration sync
  const toggleMute = () => {
    const nextMute = !isAppMuted;
    setIsAppMuted(nextMute);
    setMuted(nextMute);
    if (nextMute) {
      setIsMusicPlaying(false);
      stopAmbientSynth();
    }
    playClick();
  };

  const toggleMusic = () => {
    if (isAppMuted) return;
    playClick();
    if (isMusicPlaying) {
      stopAmbientSynth();
      setIsMusicPlaying(false);
    } else {
      startAmbientSynth();
      setIsMusicPlaying(true);
    }
  };

  // Typing effect helper for Roast generator
  useEffect(() => {
    if (activeTab === "roast") {
      setIsRoastTyping(true);
      setTypedRoast("");
      const fullText = playJokes[currentRoastIdx];
      let currentLength = 0;
      const typingTimer = setInterval(() => {
        if (currentLength < fullText.length) {
          setTypedRoast((prev) => prev + fullText.charAt(currentLength));
          currentLength++;
        } else {
          clearInterval(typingTimer);
          setIsRoastTyping(false);
        }
      }, 25);
      return () => clearInterval(typingTimer);
    }
  }, [currentRoastIdx, activeTab]);

  const drawRandomRoast = () => {
    if (isRoastTyping) return;
    playClick();
    let nextIdx = currentRoastIdx;
    while (nextIdx === currentRoastIdx) {
      nextIdx = Math.floor(Math.random() * playJokes.length);
    }
    setCurrentRoastIdx(nextIdx);
    setCopiedRoast(false);
  };

  const copyRoastToClipboard = () => {
    playNotification();
    navigator.clipboard.writeText(playJokes[currentRoastIdx]);
    setCopiedRoast(true);
    setTimeout(() => setCopiedRoast(false), 2000);
  };

  // Certificate Generator
  const generateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();
    setGeneratedCert({
      name: certName,
      action: certAction,
      title: certTitle,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      id: `ARI-CERT-${Math.floor(Math.random() * 89999 + 10000)}`
    });
  };

  // Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) {
      setContactValidationErr("All fields are strictly required by order of the Director.");
      playNotification();
      return;
    }
    setContactValidationErr("");
    playSuccess();
    setContactSubmitted(true);
  };

  // Reset Contact Form
  const resetContactForm = () => {
    playClick();
    setContactName("");
    setContactMessage("");
    setContactSubmitted(false);
  };

  // Navigate function from Command Palette or links
  const navigateTo = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  // Secret badge unlock listener
  const handleUnlockSecretBadge = (badgeTitle: string) => {
    if (!unlockedSecrets.includes(badgeTitle)) {
      setUnlockedSecrets((prev) => [...prev, badgeTitle]);
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-500 bg-white text-slate-800`}>
      
      {/* 1. Global Animated Background Backdrops & Mouse Glow */}
      <BackgroundEffects isDarkMode={isDarkMode} />

      {/* 2. Page Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-100/80">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* 3. Universal Loading Screen overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/95 backdrop-blur-3xl font-sans"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="text-center space-y-4 max-w-sm px-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-full blur-2xl bg-indigo-500/10 animate-pulse" />
                <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center border border-indigo-200/30 shadow-lg shadow-indigo-500/20">
                  <Activity className="w-8 h-8 text-white animate-spin-slow" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-950 font-sans">
                  AQDAS RESEARCH INSTITUTE
                </h1>
                <p className="text-[10px] text-indigo-600 font-mono uppercase tracking-widest mt-1 font-extrabold">
                  Global Biometric Mainframe
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-2 pt-6">
                <div className="w-full bg-slate-100 rounded-full h-1.5 border border-slate-200/50 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-full transition-all duration-150" style={{ width: `${loadingPct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span className="font-bold">LOADING COGNITIVE LOOPS</span>
                  <span className="font-bold">{loadingPct}%</span>
                </div>
              </div>

              {/* Changing status message */}
              <p className="text-[11px] font-mono text-indigo-600 font-semibold mt-4 h-4 animate-pulse">
                &gt; {loadingMsg}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Global Command Palette Modal */}
      <CommandPalette
        isOpen={showCmdPalette}
        onClose={() => setShowCmdPalette(false)}
        onNavigate={navigateTo}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onTriggerSecret={() => {
          handleUnlockSecretBadge("Quantum Overthinking Certificate");
          navigateTo("secret");
        }}
        isDarkMode={isDarkMode}
      />

      {/* 5. Sticky Premium Navigation Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode ? "bg-white/90 border-slate-100/80 shadow-[0_2px_20px_rgba(59,130,246,0.03)]" : "bg-white/90 border-slate-100/80 shadow-[0_2px_20px_rgba(99,102,241,0.03)]"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            id="nav-logo-button"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center border border-indigo-400/20 group-hover:scale-105 transition-transform shadow-md shadow-indigo-500/10">
              <Activity className="w-4.5 h-4.5 text-white animate-pulse" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-mono tracking-widest text-indigo-500 font-extrabold">
                Official Portal
              </span>
              <span className="block font-sans text-sm font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
                Aqdas Research Inst.
              </span>
            </div>
          </button>

          {/* Desktop Tab Links */}
          <nav className="hidden lg:flex items-center gap-1.5" id="desktop-nav-menu">
            {[
              { id: "home", label: "Entrance" },
              { id: "about", label: "Biography" },
              { id: "literature", label: "Literature" },
              { id: "iq-lab", label: "IQ Lab" },
              { id: "roast", label: "Roasts" },
              { id: "game", label: "Simulator" },
              { id: "gallery", label: "Memes" },
              { id: "awards", label: "Hall of Fame" },
              { id: "news", label: "Newsroom" },
              { id: "dashboard", label: "Admin Console" },
              { id: "contact", label: "Submissions" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-tight font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 shadow-sm"
                    : "border border-transparent text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Tools: Theme, Sound, Cmd+K Search, Secret restricted tab */}
          <div className="flex items-center gap-2">
            
            {/* Search Launcher */}
            <button
              onClick={() => {
                playClick();
                setShowCmdPalette(true);
              }}
              className="p-2 rounded-lg border flex items-center gap-2 transition-all cursor-pointer bg-slate-50 border-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono hidden md:inline">CMD+K</span>
            </button>

            {/* Restricted Secret Tab link */}
            <button
              onClick={() => navigateTo("secret")}
              className={`p-2 rounded-lg border transition-all relative cursor-pointer ${
                activeTab === "secret"
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-600"
                  : "bg-slate-50 border-slate-100 text-slate-500 hover:text-purple-600 hover:bg-purple-50/50"
              }`}
              title="Restricted Access Portal"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-ping" />
            </button>

            {/* Background Music Toggle */}
            <button
              onClick={toggleMusic}
              disabled={isAppMuted}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isMusicPlaying
                  ? "bg-pink-500/10 border-pink-500/20 text-pink-600 animate-pulse shadow-sm"
                  : "bg-slate-50 border-slate-100 text-slate-500 hover:text-pink-600 hover:bg-pink-50/50"
              }`}
              title={isMusicPlaying ? "Stop Ambient Music" : "Synthesize Ambient Music"}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Sound Effects Mute Button */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg border transition-all cursor-pointer bg-slate-50 border-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50"
              title={isAppMuted ? "Unmute Effects" : "Mute Effects"}
            >
              {isAppMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Scheme aesthetic switcher */}
            <button
              onClick={() => {
                playClick();
                setIsDarkMode(!isDarkMode);
              }}
              className="p-2 rounded-lg border transition-all cursor-pointer bg-slate-50 border-slate-100 text-indigo-600 hover:bg-indigo-50/50 shadow-sm"
              title="Switch Light Theme Accent Style (Amethyst / Cobalt)"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-sky-500" /> : <Moon className="w-4 h-4 text-purple-500" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden border bg-slate-50 border-slate-150 text-slate-600 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl p-4 space-y-2 flex flex-col shadow-lg">
            {[
              { id: "home", label: "Entrance Lobby" },
              { id: "about", label: "Biography Timeline" },
              { id: "literature", label: "Literature Department" },
              { id: "iq-lab", label: "IQ Diagnostics" },
              { id: "roast", label: "Roast Generator" },
              { id: "game", label: "Baby Brother Simulator" },
              { id: "gallery", label: "Meme Archives" },
              { id: "awards", label: "Hall of Trophies" },
              { id: "news", label: "Breakings Newsroom" },
              { id: "dashboard", label: "Analytics Desk" },
              { id: "contact", label: "Send Submissions" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === tab.id ? "bg-indigo-600/10 text-indigo-600 border border-indigo-500/10" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 6. Central Page Content Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" id="main-content-canvas">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* HOME VIEW */}
            {activeTab === "home" && (
              <div className="space-y-16" id="view-home">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
                  {/* Text panel */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full inline-flex items-center gap-2 font-bold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-500" /> Humorous Satirical Tribute Applet
                    </span>
                    <h1 className="text-5xl sm:text-6xl font-sans font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950">
                      Welcome to the Aqdas Research Institute
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
                      Dedicated to measuring, compiling, and analyzing the extreme cognitive variables, Shakespearean excuses, and snack depletion capabilities of the world's most legendary baby brother.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={() => navigateTo("game")}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-mono font-bold text-xs hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" /> Run Biometric Simulator
                      </button>
                      <button
                        onClick={() => navigateTo("roast")}
                        className="px-6 py-3.5 rounded-xl border border-slate-200 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                      >
                        <Flame className="w-4 h-4 text-pink-500" /> Access 100 Playful Roasts
                      </button>
                    </div>

                    {/* Live status badge */}
                    <div className="flex items-center gap-3 pt-4">
                      <div className="flex -space-x-2">
                        <span className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-xs shadow-sm">🎓</span>
                        <span className="w-8 h-8 rounded-full bg-purple-50 border-2 border-white flex items-center justify-center text-xs shadow-sm">💤</span>
                        <span className="w-8 h-8 rounded-full bg-pink-50 border-2 border-white flex items-center justify-center text-xs shadow-sm">🎮</span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono font-bold">
                        Biometrics status: <span className="text-emerald-600 font-bold">● ONLINE (SNOOZING)</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Premium Mockup Frame */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 blur-3xl rounded-3xl" />
                    <div className="relative p-2.5 rounded-3xl border bg-white/80 border-slate-150/80 backdrop-blur-md shadow-2xl">
                      <img
                        src="/src/assets/images/aqdas_institute_hero_1782640031050.jpg"
                        alt="Aqdas Research Institute Neural Core"
                        referrerPolicy="no-referrer"
                        className="w-full rounded-2xl shadow-sm border border-slate-100 object-cover aspect-video sm:aspect-square lg:aspect-auto"
                      />
                      <div className="absolute bottom-5 left-5 right-5 p-3 rounded-xl backdrop-blur-xl bg-white/90 border border-slate-100/80 flex justify-between items-center shadow-lg">
                        <span className="text-[10px] font-mono text-slate-700 font-bold">CORE COGNITIVE MONITOR</span>
                        <span className="text-[10px] font-mono text-purple-600 font-extrabold animate-pulse">ACTIVE 3,000 WPM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated stats block */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-100">
                  {[
                    { value: "100%", label: "Excuse Success", desc: "For laundry refusal" },
                    { value: "45 Min", label: "Poem Elucidation", desc: "Per stanza" },
                    { value: "15,000+", label: "BS Essay Words", desc: "Sophistication max" },
                    { value: "24 Hrs", label: "Maximum Sleep Cap", desc: "Scientific milestone" }
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="premium-card p-6"
                    >
                      <div className="text-3xl font-mono font-black text-indigo-600">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-900 mt-2">{stat.label}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT AQDAS VIEW */}
            {activeTab === "about" && (
              <div className="space-y-12" id="view-about">
                {/* Header */}
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-mono text-purple-600 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Trophy className="w-4 h-4 text-yellow-500" /> Authorized Biography
                  </span>
                  <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
                    About Baby Brother Aqdas
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    An entire satirical biography tracing the historical evolution of the world's most dramatic overthinker.
                  </p>
                </div>

                {/* Intro details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Bio block */}
                  <div className="lg:col-span-7 premium-card p-8 space-y-5">
                    <h2 className="text-2xl font-sans font-black tracking-tight text-indigo-600">Baby Brother History & Origins</h2>
                    <p className="text-sm leading-relaxed text-slate-600 font-medium">
                      Born in the quiet corridors of childhood luxury, Aqdas exhibited extreme signs of academic drama and overthinking from an early age. While ordinary infants cried for formula, reports claim Aqdas would gaze out the window, sigh dramatically, and analyze the reflection of the glass to determine the 'emotional duality of transparency.'
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 font-medium">
                      As he matured, his legendary status solidified through his uncanny ability to generate immediate poetic excuses to evade basic domestic demands. After completing a BS in English Literature, he attained supreme master level status in finding deep gothic metaphors inside typical household situations—leaving his older sibling completely speechless.
                    </p>

                    <div className="p-5 bg-indigo-50/80 border border-indigo-100/50 rounded-2xl shadow-inner">
                      <span className="text-xs font-extrabold text-indigo-700 block mb-1">Legendary Moment:</span>
                      <p className="text-xs text-indigo-950 font-medium italic">
                        "Aqdas once spent three hours explaining how the background color of a pizza flyer represented the slow decay of medieval chivalry, ultimately convincing everyone that he shouldn't have to sweep the floor."
                      </p>
                    </div>
                  </div>

                  {/* Favorite Excuses Block */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-sm font-bold font-mono text-purple-600 uppercase tracking-wider">Restricted Excuse Catalog</h3>
                    <div className="space-y-3">
                      {excusesData.map((e, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-indigo-150 hover:shadow-md transition-all duration-300 flex justify-between items-center"
                        >
                          <div className="max-w-[80%] space-y-1">
                            <p className="text-xs text-slate-800 italic font-serif font-semibold">"{e.excuse}"</p>
                            <span className="text-[10px] font-mono text-purple-600 font-bold mt-1 block">Difficulty: {e.difficulty}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Efficacy</span>
                            <span className="text-xs font-mono font-black text-emerald-600">{e.successRate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6 pt-6">
                  <h3 className="text-xl font-sans font-black text-center text-slate-900">Historical Milestone Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4" id="timeline-grid">
                    {timelineData.map((item, idx) => (
                      <div
                        key={idx}
                        className="premium-card p-5 flex flex-col justify-between min-h-[220px]"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-1 rounded-full font-extrabold">
                            {item.year}
                          </span>
                          <h4 className="text-xs font-bold mt-4 leading-snug text-slate-900">{item.title}</h4>
                          <p className="text-[10px] text-slate-500 mt-2 leading-normal font-medium">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-right mt-4 text-slate-400 text-[10px] font-mono uppercase font-bold">
                          ARI-Node 0{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ENGLISH LITERATURE DEPARTMENT VIEW */}
            {activeTab === "literature" && (
              <LitDepartment isDarkMode={isDarkMode} />
            )}

            {/* IQ LABORATORY VIEW */}
            {activeTab === "iq-lab" && (
              <IQLaboratory isDarkMode={isDarkMode} />
            )}

            {/* ROAST GENERATOR VIEW */}
            {activeTab === "roast" && (
              <div className="space-y-12 max-w-3xl mx-auto" id="view-roast">
                {/* Header */}
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono text-pink-600 uppercase tracking-widest flex items-center justify-center gap-2 font-bold">
                    <Flame className="w-4 h-4 animate-pulse" /> Sibling Comedic Fire
                  </span>
                  <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
                    The 100 Playful Roasts Generator
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    A highly sophisticated algorithm generating random sibling humor about essays, overthinking, and sleeping in.
                  </p>
                </div>

                {/* Big Display Box with typing effects */}
                <div className="premium-card p-8 text-center relative hover:shadow-xl hover:border-pink-200">
                  <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-400 font-bold">
                    ROAST INDEX: {currentRoastIdx + 1}/100
                  </div>

                  {/* Quotes symbols */}
                  <div className="text-5xl font-serif text-pink-500/20 absolute top-4 left-6 select-none">“</div>

                  {/* Typing Roast text */}
                  <div className="min-h-[120px] flex items-center justify-center py-6">
                    <p className="text-xl sm:text-2xl font-serif italic leading-relaxed text-indigo-700 font-semibold px-4">
                      {typedRoast}
                      {isRoastTyping && <span className="inline-block w-1.5 h-5 bg-pink-500 ml-1 animate-ping" />}
                    </p>
                  </div>

                  <div className="text-5xl font-serif text-pink-500/20 absolute bottom-4 right-6 select-none">”</div>

                  {/* Action buttons */}
                  <div className="flex justify-center gap-3 pt-6 border-t border-slate-100">
                    <button
                      onClick={copyRoastToClipboard}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300 font-bold"
                      title="Copy to Clipboard"
                    >
                      {copiedRoast ? <ClipboardCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                      {copiedRoast ? "Copied!" : "Copy Roast"}
                    </button>
                    <button
                      onClick={() => {
                        playNotification();
                        setRoastShared(true);
                        setTimeout(() => setRoastShared(false), 3000);
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                        isDarkMode ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      <Share2 className="w-4 h-4 text-purple-400" />
                      {roastShared ? "Shared with Family!" : "Share with Family"}
                    </button>
                  </div>
                </div>

                {/* Big Launch clicker */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={drawRandomRoast}
                    disabled={isRoastTyping}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-indigo-600 text-white font-mono text-xs font-bold hover:shadow-xl hover:shadow-pink-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4" /> Unleash Random Roast
                  </button>
                </div>
              </div>
            )}

            {/* SIMULATOR VIEW */}
            {activeTab === "game" && (
              <BrotherSimulator isDarkMode={isDarkMode} />
            )}

            {/* MEME GALLERY VIEW */}
            {activeTab === "gallery" && (
              <MemeGallery isDarkMode={isDarkMode} />
            )}

            {/* HALL OF FAME CERTIFICATE GENERATOR */}
            {activeTab === "awards" && (
              <div className="space-y-12" id="view-awards">
                {/* Header */}
                <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-mono text-purple-600 uppercase tracking-widest flex items-center gap-2 font-bold">
                      <Trophy className="w-4 h-4 text-yellow-500" /> Golden Achievements
                    </span>
                    <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
                      Hall of Golden Certificates
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                      Render luxury golden certificates of excellence for Aqdas' highly specific weekly achievements.
                    </p>
                  </div>
                </div>

                {/* Interactive Generator Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Controls form */}
                  <form
                    onSubmit={generateCertificate}
                    className="lg:col-span-5 premium-card p-8 space-y-5"
                  >
                    <h3 className="font-bold text-sm font-mono text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-indigo-500" /> Customize Certificate
                    </h3>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-extrabold">Honoree Name</label>
                      <input
                        type="text"
                        className="w-full mt-1.5 p-3 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold"
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-extrabold">Award Citation / Silly Act</label>
                      <textarea
                        className="w-full mt-1.5 p-3 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold"
                        rows={2}
                        value={certAction}
                        onChange={(e) => setCertAction(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-extrabold">Grand Title</label>
                      <select
                        className="w-full mt-1.5 p-3 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all font-mono font-bold"
                        value={certTitle}
                        onChange={(e) => setCertTitle(e.target.value)}
                      >
                        <option value="GRAND MASTER OF EXCUSE ELUCIDATION">GRAND MASTER OF EXCUSE ELUCIDATION</option>
                        <option value="SOCIOLOGICAL TOASTER SCHOLAR">SOCIOLOGICAL TOASTER SCHOLAR</option>
                        <option value="CHORE EVASION FILIBUSTER GENERAL">CHORE EVASION FILIBUSTER GENERAL</option>
                        <option value="DEAN OF SOPORIFIC SNOOZING">DEAN OF SOPORIFIC SNOOZING</option>
                        <option value="CEO OF LONG PARAGRAPHS">CEO OF LONG PARAGRAPHS</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-500/25"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Render Gold Seal Certificate
                    </button>
                  </form>

                  {/* Right Certificate Output Frame */}
                  <div className="lg:col-span-7 flex flex-col items-center">
                    {generatedCert ? (
                      <div
                        className="w-full max-w-lg p-8 rounded-2xl border-4 border-yellow-500/40 bg-slate-950 text-white space-y-6 relative overflow-hidden shadow-2xl shadow-yellow-500/10 text-center flex flex-col justify-between min-h-[380px]"
                        id="rendered-certificate"
                      >
                        {/* Gold watermark */}
                        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />

                        {/* Gold borders */}
                        <div className="absolute inset-2 border border-yellow-500/20 rounded-xl pointer-events-none" />

                        <div className="space-y-2 relative z-10">
                          <span className="text-[10px] font-mono tracking-widest text-yellow-500 uppercase font-black">
                            ★ THE OFFICIAL AQDAS RESEARCH INSTITUTE ★
                          </span>
                          <h2 className="text-2xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 tracking-wide mt-2">
                            Certificate of Sibling Excellence
                          </h2>
                        </div>

                        <div className="space-y-2 py-4 relative z-10">
                          <p className="text-xs font-mono text-slate-400">THIS ACCREDITATION GRANTED TO</p>
                          <h3 className="text-xl font-sans font-black text-white underline decoration-yellow-500/50 decoration-2 underline-offset-4">
                            {generatedCert.name}
                          </h3>
                          <p className="text-xs font-mono text-slate-400 mt-2">IN GRACEFUL ACKNOWLEDGEMENT OF</p>
                          <p className="text-sm italic font-serif text-yellow-200/90 leading-relaxed px-4">
                            "{generatedCert.action}"
                          </p>
                        </div>

                        <div className="space-y-2 relative z-10">
                          <div className="text-[11px] font-mono font-bold text-yellow-500">
                            {generatedCert.title}
                          </div>
                          <div className="flex justify-between items-center px-6 pt-4 border-t border-white/10 text-[10px] font-mono text-slate-500">
                            <span>REGISTRATION: {generatedCert.id}</span>
                            <span>DATE: {generatedCert.date}</span>
                          </div>
                        </div>

                        {/* Gold seal stamp */}
                        <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-tr from-yellow-600 to-yellow-300 rounded-full border border-yellow-200 shadow flex items-center justify-center font-serif text-[10px] font-bold text-slate-950 select-none animate-pulse">
                          SEAL
                        </div>
                      </div>
                    ) : (
                      <div className="w-full max-w-lg p-12 rounded-3xl border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center min-h-[300px] bg-slate-50/50">
                        <Trophy className="w-12 h-12 text-slate-300 mb-4 animate-bounce" />
                        <h3 className="font-serif text-slate-500 text-sm font-bold">No Certificate Rendered</h3>
                        <p className="text-xs text-slate-400 max-w-xs mt-1 font-medium">
                          Customize the citation fields and click the button to synthesize a golden diploma frame.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* BREAKING NEWS FEEDS */}
            {activeTab === "news" && (
              <div className="space-y-8" id="view-news">
                {/* Header */}
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-mono text-pink-600 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Newspaper className="w-4 h-4 text-pink-500" /> Breakings Dispatcher
                  </span>
                  <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
                    The Institute Newsroom
                  </h1>
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    Fake global dispatches documenting key domestic disputes, academic achievements, and sleep schedules.
                  </p>
                </div>

                {/* News feeds grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="newsroom-grid">
                  {newsArticlesData.map((art) => {
                    const isExpanded = expandedArticleId === art.id;
                    return (
                      <div
                        key={art.id}
                        className="premium-card p-6 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold">
                            <span>{art.date}</span>
                            <span className="text-indigo-400 uppercase font-semibold">{art.category}</span>
                          </div>
                          <h3 className="text-base font-bold mt-3 hover:text-indigo-400 transition-colors">
                            {art.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                            {art.summary}
                          </p>
                          {isExpanded && (
                            <p className="text-xs text-slate-700 mt-4 border-t border-slate-100 pt-4 leading-relaxed italic font-serif font-medium">
                              {art.content}
                            </p>
                          )}
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                          <span className="text-[10px] font-mono text-amber-600 font-bold bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full">
                            Severity: {art.impactScore}
                          </span>
                          <button
                            onClick={() => {
                              playClick();
                              setExpandedArticleId(isExpanded ? null : art.id);
                            }}
                            className="text-xs font-mono font-bold text-indigo-600 flex items-center gap-1 hover:translate-x-1 transition-transform"
                          >
                            {isExpanded ? "Collapse" : "Read Full Dispatch"} <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DASHBOARD VIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-8" id="view-dashboard">
                {/* Header */}
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Activity className="w-4 h-4 animate-pulse text-indigo-500" /> Global System Console
                  </span>
                  <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
                    Analytical Dashboard
                  </h1>
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    System-wide analytics, excuse heatmaps, sleep stage monitors, and mainframe diagnostics.
                  </p>
                </div>

                {/* Dashboard layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Side: Excuse Heatmap Grid (Lvl 8) */}
                  <div className="lg:col-span-8 premium-card p-8">
                    <h3 className="text-base font-bold font-mono text-purple-600 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" /> Weekly Excuse Density Heatmap
                    </h3>
                    <p className="text-xs text-slate-500 mb-6 font-medium">
                      Frequency distribution tracking of how many excuses Aqdas synthesizes per hour throughout the week.
                    </p>

                    {/* Heatmap Grid */}
                    <div className="grid grid-cols-7 gap-2.5">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dIdx) => (
                        <div key={day} className="space-y-2">
                          <div className="text-center text-[10px] font-mono text-slate-500 font-bold">{day}</div>
                          <div className="space-y-2">
                            {Array.from({ length: 4 }).map((_, hIdx) => {
                              // Generate fake heat scores
                              const heatVal = (dIdx * 12 + hIdx * 25) % 100;
                              let heatColor = "bg-slate-50 border-slate-200 text-slate-500";
                              if (heatVal > 80) heatColor = "bg-purple-600 border-purple-700 text-white font-extrabold";
                              else if (heatVal > 50) heatColor = "bg-indigo-600 border-indigo-700 text-white font-bold";
                              else if (heatVal > 20) heatColor = "bg-indigo-50 border-indigo-100 text-indigo-700 font-semibold";

                              return (
                                <div
                                  key={hIdx}
                                  className={`h-12 rounded-xl flex items-center justify-center font-mono text-[10px] border transition-all hover:scale-105 cursor-help shadow-sm ${heatColor}`}
                                  title={`Excuse Rate wiggled at ${heatVal}%`}
                                >
                                  {heatVal}%
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-2 mt-6 text-[10px] font-mono text-slate-400 font-bold border-t border-slate-100 pt-4">
                      <span>Row 1: Early Morning Evasion</span>
                      <span>Row 2: Afternoon Chores Refusal</span>
                      <span>Row 3: Midnight Pizza Evasion</span>
                      <span>Row 4: Weekend Nap Shielding</span>
                    </div>
                  </div>

                  {/* Right Side: Diagnostics checklist & unlock status (Lvl 4) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Diagnostic checklist */}
                    <div className="premium-card p-6">
                      <h3 className="text-sm font-bold font-mono text-indigo-600 uppercase tracking-wider mb-4">Core Telemetry Read-out</h3>
                      <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-bold">ARI_NODE_ONLINE</span>
                          <span className="text-emerald-600 font-black">YES</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-bold">CHORE_SHIELD</span>
                          <span className="text-indigo-600 font-black">100% MAXIMUM</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-bold">CAFFEINE_LEVEL</span>
                          <span className="text-pink-600 font-black">COFFEE_COZY</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-bold">NAP_COEFFICIENT</span>
                          <span className="text-purple-600 font-black">STAGE_REM_4</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5">
                          <span className="text-slate-500 font-bold">SYMBOLISM_BUFFER</span>
                          <span className="text-amber-600 font-black">OVERFLOW</span>
                        </div>
                      </div>
                    </div>

                    {/* Unlocked badges card */}
                    <div className="premium-card p-6">
                      <h3 className="text-sm font-bold font-mono text-purple-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" /> Secret Achievements Vault
                      </h3>
                      <p className="text-[11px] text-slate-500 mb-4 font-medium">
                        Perform secret keyboard triggers or actions inside the application to expand this shelf.
                      </p>

                      <div className="space-y-2 font-mono text-[11px]" id="unlocked-secrets-list">
                        {unlockedSecrets.length === 0 ? (
                          <div className="text-center text-slate-400 py-6 italic border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl font-bold">
                            No secret badges unlocked yet.<br />
                            <span className="text-[10px] text-indigo-500 mt-1 block">Hint: Try the Konami Code on your keyboard...</span>
                          </div>
                        ) : (
                          unlockedSecrets.map((badge, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 font-black flex items-center gap-2 shadow-sm">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span>{badge}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT VIEW */}
            {activeTab === "contact" && (
              <div className="max-w-2xl mx-auto space-y-12 animate-fade-in" id="view-contact">
                {/* Header */}
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono text-purple-600 uppercase tracking-widest flex items-center justify-center gap-2 font-bold">
                    <Mail className="w-4 h-4 text-purple-500" /> Submissions Terminal
                  </span>
                  <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
                    Official Chore Evasion Petitions
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    File a petition directly to the director's queue. Expected response speed: Slow.
                  </p>
                </div>

                {/* Submissions form card */}
                <div className="premium-card p-8 relative">
                  {contactSubmitted ? (
                    <div className="text-center py-8 space-y-4 animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Petition Filed Successfully!</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
                        Your chore evasion petition has been entered into Aqdas' cognitive queue system.
                      </p>
                      <div className="p-4 bg-indigo-50/80 border border-indigo-150/50 rounded-2xl text-xs text-indigo-950 max-w-md mx-auto italic font-serif font-medium shadow-inner">
                        "Your request is of high structural significance, hitherto quarantined under nap protocol #4. Expected response wiggles: 3 to 5 weeks depending on coffee intake."
                      </div>
                      <button
                        onClick={resetContactForm}
                        className="mt-6 px-6 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-mono font-bold transition-colors cursor-pointer"
                      >
                        File Another Petition
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      {contactValidationErr && (
                        <div className="p-3.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs font-mono font-bold">
                          {contactValidationErr}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase font-extrabold">Petitioner Name</label>
                          <input
                            type="text"
                            required
                            className="w-full mt-1.5 p-3 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold"
                            placeholder="Older sibling / Mom / Dad"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase font-extrabold">Petition Category</label>
                          <select
                            className="w-full mt-1.5 p-3 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all font-mono font-bold"
                            value={contactCategory}
                            onChange={(e) => setContactCategory(e.target.value)}
                          >
                            <option value="Chore Evasion Petition">Chore Evasion Petition</option>
                            <option value="Pizza Topping Negotiation">Pizza Topping Negotiation</option>
                            <option value="Wake Up Call Waiver">Wake Up Call Waiver</option>
                            <option value="Emergency Grocery Surcharge">Emergency Grocery Surcharge</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase font-extrabold">Detailed Justification Message</label>
                        <textarea
                          required
                          className="w-full mt-1.5 p-3 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 outline-none font-serif font-medium focus:bg-white focus:border-indigo-500 transition-all"
                          rows={4}
                          placeholder="Why should Aqdas immediately wake up or wash dishes? Please include metaphors..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-mono text-xs font-bold hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" /> File Petition to Mainframe
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* SECRET VIEW */}
            {activeTab === "secret" && (
              <SecretPage isDarkMode={isDarkMode} onUnlockSecretBadge={handleUnlockSecretBadge} />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* 7. Premium Custom Footer */}
      <footer className="border-t py-12 transition-all duration-300 mt-20 relative z-10 bg-slate-50 border-slate-100 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
            <span className="font-sans font-black tracking-wider text-sm text-slate-800">AQDAS RESEARCH SYSTEMS</span>
          </div>
          <p className="text-xs max-w-md mx-auto font-medium text-slate-500">
            The Aqdas Research Institute is an independent satirical monitoring entity dedicated to the observation and humor-filled critique of legendary baby brothers everywhere.
          </p>
          <div className="text-[10px] font-mono text-slate-400 font-bold">
            © 2026 Aqdas Research Systems. All rights wiggled. Built for Aqdas with supreme sibling respect.
          </div>
        </div>
      </footer>

      {/* 8. Sticky Back-to-top Floating action button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => {
              playClick();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 border border-indigo-400 text-white cursor-pointer shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
