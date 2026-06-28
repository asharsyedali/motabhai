import React, { useState, useEffect, useRef } from "react";
import { Terminal, ShieldAlert, Cpu, ToggleLeft, ToggleRight, Sparkles, Trophy, Zap, RefreshCw } from "lucide-react";
import { playClick, playSuccess, playNotification } from "../utils/audio";

interface SecretPageProps {
  isDarkMode: boolean;
  onUnlockSecretBadge: (badgeTitle: string) => void;
}

export const SecretPage: React.FC<SecretPageProps> = ({ isDarkMode, onUnlockSecretBadge }) => {
  // Developer toggles
  const [isDevMode, setIsDevMode] = useState(false);
  const [dramaAmp, setDramaAmp] = useState(95);
  const [excuseVelocity, setExcuseVelocity] = useState(120);
  const [napDuration, setNapDuration] = useState(10);
  const [isCaffeineOverclock, setIsCaffeineOverclock] = useState(true);

  // Konami state
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);

  // Debug log stream
  const [logs, setLogs] = useState<string[]>([
    "ARI-OS v2.26 initialized.",
    "Connecting to Aqdas Cognitive Mainframe...",
    "Biometrics status: COZY_SLEEPING_MODE",
    "Chore evasion shields are active [100%]"
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Konami keyboard code listener
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const nextKey = e.key;
      setKonamiProgress((prev) => {
        const updated = [...prev, nextKey];
        // Check if matching part of code
        const currentMatch = konamiCode.slice(0, updated.length);
        const isCorrectSoFar = updated.every((val, index) => val === konamiCode[index]);

        if (isCorrectSoFar) {
          if (updated.length === konamiCode.length) {
            // Unlocked!
            setKonamiUnlocked(true);
            playSuccess();
            onUnlockSecretBadge("Sovereign Quantum Overthinking Certificate");
            addLog("!!! KONAMI SECRET CHEAT UNLOCKED !!! Spawning quantum overthinking cells...");
            return [];
          }
          return updated;
        } else {
          // Reset progress if typed wrong key
          return nextKey === "ArrowUp" ? ["ArrowUp"] : [];
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUnlockSecretBadge]);

  // Periodic log stream wiggler
  useEffect(() => {
    const logInterval = setInterval(() => {
      const fakeLogs = [
        `[OK] DRAMA_AMPLITUDE_COEFFICIENT wiggling at ${dramaAmp}%`,
        `[WARN] Sleep level dipping below 12 hours. Commencing corrective nap protocols.`,
        `[INFO] Symbolism database query: Found 42 references to existentialism inside a slice of sourdough.`,
        `[STATUS] Excuse generation velocity clocked at ${excuseVelocity} words per minute.`,
        `[SYSTEM] Caffeine overclock level: ${isCaffeineOverclock ? "MAXIMUM" : "STANDBY"}`,
        `[INFO] Biometrics verify: Sneezing count today: 0. Cookie consumption rate: HIGH.`,
        `[OK] Finished parsing classical Shakespearean sonnets for homework evasion tactics.`
      ];
      addLog(fakeLogs[Math.floor(Math.random() * fakeLogs.length)]);
    }, 3000);
    return () => clearInterval(logInterval);
  }, [dramaAmp, excuseVelocity, isCaffeineOverclock]);

  // Scroll logs automatically
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${time}] ${text}`]);
  };

  const handleToggleDev = () => {
    playClick();
    setIsDevMode(!isDevMode);
    addLog(`Developer Overrides status: ${!isDevMode ? "ENABLED" : "DISABLED"}`);
  };

  const triggerMockCrash = () => {
    playNotification();
    addLog("CRITICAL ERROR: Sibling logic loop overflow!");
    addLog("CRASH DUMP: AQDAS_ESSAY_WORD_LIMIT_EXCEEDED (15,004 words in 5 minutes)");
    addLog("Attempting soft reboot of Shakespeare core...");
  };

  return (
    <div className="space-y-8" id="secret-page-section">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <span className="text-xs font-mono text-purple-600 uppercase tracking-widest flex items-center gap-2 font-bold">
          <ShieldAlert className="w-4 h-4 animate-pulse text-purple-500" /> Restricted Access
        </span>
        <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
          The Vault of Secrets
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Authorized sibling developer portal. Enter the legendary code or override biometrics.
        </p>
      </div>

      {/* Konami Code Unlock Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: Konami Code Guide */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Zap className="w-5 h-5 text-amber-500 animate-bounce" /> The Sibling Cheatcode
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              A legendary retro combination unlocks ultimate power within the institute.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-[320px] mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-inner">
              {["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"].map((key, idx) => (
                <div
                  key={idx}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border font-mono font-bold text-sm shadow-sm transition-all ${
                    konamiProgress.length > idx
                      ? "bg-purple-600 text-white border-purple-400 animate-pulse shadow-purple-200"
                      : "bg-white text-slate-600 border-slate-200/60"
                  }`}
                >
                  {key}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 text-center mt-4 font-mono font-bold">
              {konamiUnlocked
                ? "🎉 STATUS: KONAMI CODE DETECTED! Quantum overthinking is now online."
                : "Type the above sequence on your keyboard at any point to unlock the secret."}
            </p>
          </div>

          {konamiUnlocked && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <strong>SECRET UNLOCKED:</strong> Sovereign Quantum Overthinking Certificate is active! Aqdas' excuses have been multiplied by 10x.
              </div>
            </div>
          )}
        </div>

        {/* Right Card: Developer Controls */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <Cpu className="w-5 h-5 text-indigo-500" /> Biometrics Override Console
              </h3>
              <button onClick={handleToggleDev} className="cursor-pointer">
                {isDevMode ? (
                  <ToggleRight className="w-9 h-9 text-indigo-600" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-300" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Toggle developer controls to directly alter Aqdas' fundamental lifestyle variables.
            </p>

            <div className={`mt-6 space-y-4 transition-all duration-300 ${isDevMode ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                  <span>Drama Amplitude (Hyperbolic scaling)</span>
                  <span className="text-purple-600">{dramaAmp}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  className="w-full mt-1.5 accent-purple-600 cursor-pointer"
                  value={dramaAmp}
                  onChange={(e) => setDramaAmp(Number(e.target.value))}
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                  <span>Excuse Velocity (Words per minute)</span>
                  <span className="text-indigo-600">{excuseVelocity} WPM</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="300"
                  className="w-full mt-1.5 accent-indigo-600 cursor-pointer"
                  value={excuseVelocity}
                  onChange={(e) => setExcuseVelocity(Number(e.target.value))}
                />
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                  <span>Soporific Nap Duration (Hours)</span>
                  <span className="text-pink-600">{napDuration} Hrs</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  className="w-full mt-1.5 accent-pink-600 cursor-pointer"
                  value={napDuration}
                  onChange={(e) => setNapDuration(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={triggerMockCrash}
              disabled={!isDevMode}
              className={`flex-1 py-3 rounded-xl text-xs font-mono border text-center transition-all ${
                isDevMode
                  ? "bg-red-50 hover:bg-red-100 border-red-200 text-red-700 font-black cursor-pointer shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed font-bold"
              }`}
            >
              Trigger Sibling Crash
            </button>
          </div>
        </div>
      </div>

      {/* Retro Debug Terminal Console */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-slate-950 font-mono text-xs text-emerald-400 space-y-4 shadow-2xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="font-bold">ARI-OS DEPLOYMENT TERMINAL // HOSTNAME: AQDAS-CORE-3000</span>
          </div>
          <button
            onClick={() => {
              playClick();
              setLogs(["System logs flushed. Mainframe running."]);
            }}
            className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live log entries */}
        <div className="space-y-1.5 h-44 overflow-y-auto pr-2 scrollbar-thin">
          {logs.map((log, index) => (
            <div key={index} className="leading-relaxed hover:bg-slate-900 p-0.5 rounded transition-colors">
              <span className="text-indigo-400 font-bold">&gt;&gt;</span> {log}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
