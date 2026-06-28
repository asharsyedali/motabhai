import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ShoppingBag, ShieldCheck, Zap, AlertCircle, Gamepad2, Trophy, Star } from "lucide-react";
import { upgradesData, achievementsData } from "../data/aqdasData";
import { playClick, playSuccess, playPowerUp } from "../utils/audio";

interface BrotherSimulatorProps {
  isDarkMode: boolean;
}

export const BrotherSimulator: React.FC<BrotherSimulatorProps> = ({ isDarkMode }) => {
  // Game state
  const [coins, setCoins] = useState(0);
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [upgrades, setUpgrades] = useState(upgradesData);
  const [achievements, setAchievements] = useState(achievementsData);

  // Floating particles list for clicks
  const [clickParticles, setClickParticles] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);
  const particleIdRef = useRef(0);

  // Calculate coins per second (CPS) and multiplier
  const cps = upgrades.reduce((acc, curr) => acc + curr.level * curr.cps, 0);
  const activeMultiplier = achievements.reduce((acc, curr) => acc * (curr.unlocked ? curr.multiplier : 1), 1);

  // Game tick loop (every 1 second)
  useEffect(() => {
    const tick = setInterval(() => {
      if (cps > 0) {
        const addedCoins = cps * activeMultiplier;
        setCoins((prev) => prev + addedCoins);
        setTotalCoinsEarned((prev) => prev + addedCoins);
        setXp((prev) => {
          const nextXp = prev + cps;
          // Level up logic (every 500 XP increases level)
          const targetLevel = Math.floor(nextXp / 500) + 1;
          if (targetLevel > level) {
            setLevel(targetLevel);
            playSuccess();
          }
          return nextXp;
        });
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [cps, activeMultiplier, level]);

  // Check achievements dynamically based on total coins earned
  useEffect(() => {
    achievements.forEach((ach) => {
      if (!ach.unlocked && totalCoinsEarned >= ach.cost) {
        // Unlock achievement
        setAchievements((prev) =>
          prev.map((a) => (a.id === ach.id ? { ...a, unlocked: true } : a))
        );
        playSuccess();
        // Spawn standard game particle
        spawnAchievementBanner(ach.title);
      }
    });
  }, [totalCoinsEarned, achievements]);

  // Achievements banner notifications
  const [banner, setBanner] = useState<string | null>(null);
  const spawnAchievementBanner = (title: string) => {
    setBanner(title);
    setTimeout(() => {
      setBanner(null);
    }, 4000);
  };

  // Click handler
  const handleBrainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();

    // Calculate click gain
    const clickGain = Math.max(1, Math.floor(activeMultiplier * (level * 1.5)));
    setCoins((prev) => prev + clickGain);
    setTotalCoinsEarned((prev) => prev + clickGain);
    setXp((prev) => {
      const nextXp = prev + clickGain;
      const targetLevel = Math.floor(nextXp / 500) + 1;
      if (targetLevel > level) {
        setLevel(targetLevel);
        playSuccess();
      }
      return nextXp;
    });

    // Spawn emoji/particle at click position relative to button bounds
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const emojis = ["✍️", "☕", "📖", "💤", "🍕", "🧠", "✨"];
    const text = `+${clickGain} Symbolism ${emojis[Math.floor(Math.random() * emojis.length)]}`;

    const newParticle = {
      id: particleIdRef.current++,
      x,
      y,
      text,
    };

    setClickParticles((prev) => [...prev, newParticle]);

    // Cleanup particle
    setTimeout(() => {
      setClickParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  };

  // Buy upgrade handler
  const handleBuyUpgrade = (upgradeId: string) => {
    const up = upgrades.find((u) => u.id === upgradeId);
    if (!up || coins < up.cost) return;

    playPowerUp();
    setCoins((prev) => prev - up.cost);
    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id === upgradeId) {
          const nextLevel = u.level + 1;
          const nextCost = Math.floor(u.cost * 1.6);
          return { ...u, level: nextLevel, cost: nextCost };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-8" id="brother-simulator-section">
      {/* Achievement Banner Notify */}
      {banner && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-950 shadow-xl flex items-center gap-3 animate-bounce">
          <Trophy className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-extrabold">Achievement Unlocked!</div>
            <div className="font-black text-sm">{banner}</div>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-purple-600 uppercase tracking-widest flex items-center gap-2 font-bold">
            <Gamepad2 className="w-4 h-4 animate-spin-slow text-purple-500" /> Interactive Training Arena
          </span>
          <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
            Aqdas Simulator 2026
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Harness overthinking potential. Click the core, unlock academic power-ups, and level up his attributes.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 px-4 py-2.5 rounded-xl">
          <Star className="w-5 h-5 text-indigo-600 fill-indigo-200" />
          <div className="font-mono text-xs">
            <div className="text-slate-500 uppercase font-bold text-[9px]">Current Level</div>
            <div className="font-extrabold text-sm text-indigo-700">Level {level} (Scholar)</div>
          </div>
        </div>
      </div>

      {/* Main Game Interface Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Clicker Panel (Lvl 5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between p-8 rounded-3xl border bg-gradient-to-b from-indigo-50/50 to-purple-50/50 border-slate-200 shadow-sm min-h-[460px]">
          {/* Top Panel stats */}
          <div className="w-full text-center space-y-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-extrabold">Accumulated Symbolism</div>
            <div className="text-5xl font-mono font-black text-slate-900">
              {Math.floor(coins).toLocaleString()}
            </div>
            <div className="text-xs font-mono text-slate-500 font-bold">
              +{(cps * activeMultiplier).toFixed(1)}/sec • Multiplier: {activeMultiplier.toFixed(1)}x
            </div>
          </div>

          {/* Core Interactive Clicker Button */}
          <div className="relative my-8">
            <button
              onClick={handleBrainClick}
              className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-1.5 cursor-pointer transition-all active:scale-95 duration-100 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] focus:outline-none"
              id="simulator-click-button"
            >
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Zap className="w-12 h-12 text-indigo-600 animate-pulse mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-slate-800 font-black uppercase tracking-widest">
                  Overthink
                </span>
                <span className="text-[10px] text-indigo-600 font-mono font-bold mt-1">
                  Click to Extract
                </span>
              </div>
            </button>

            {/* Click Particles overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {clickParticles.map((p) => (
                <div
                  key={p.id}
                  className="absolute text-xs font-mono font-black text-indigo-700 animate-float-up pointer-events-none select-none whitespace-nowrap bg-white/95 border border-slate-100 px-2.5 py-1 rounded-xl shadow-md"
                  style={{ left: p.x, top: p.y - 10 }}
                >
                  {p.text}
                </div>
              ))}
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-500 font-bold">
              <span>Intellectual XP: {xp % 500} / 500</span>
              <span>Lvl {level}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/50 shadow-inner">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((xp % 500) / 500) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-center text-slate-400 font-mono italic font-medium">
              Leveling up increases base click value by +1.5x
            </div>
          </div>
        </div>

        {/* Right Upgrades & Achievements (Lvl 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Upgrades panel */}
          <div className="premium-card p-6">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-900">
              <ShoppingBag className="w-5 h-5 text-indigo-500" /> Academic Upgrades Shop
            </h3>
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2" id="simulator-upgrades-list">
              {upgrades.map((u) => {
                const canAfford = coins >= u.cost;
                return (
                  <div
                    key={u.id}
                    className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50/80 flex items-center justify-between transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">{u.name}</span>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-full font-mono font-bold">
                          Lvl {u.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">{u.description}</p>
                      <div className="text-[10px] font-mono text-purple-600 mt-1 font-bold">
                        +{(u.cps * activeMultiplier).toFixed(1)}/sec added per level
                      </div>
                    </div>
                    <button
                      onClick={() => handleBuyUpgrade(u.id)}
                      disabled={!canAfford}
                      className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        canAfford
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 cursor-pointer"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50"
                      }`}
                    >
                      Buy: {u.cost.toLocaleString()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements multipliers panel */}
          <div className="premium-card p-6">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-900">
              <Trophy className="w-5 h-5 text-yellow-500" /> Unlockable Multiplier Badges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="simulator-achievements-list">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-2xl border flex gap-3 transition-all ${
                    ach.unlocked
                      ? "bg-amber-500/5 border-amber-500/20 text-amber-950 shadow-sm"
                      : "bg-slate-50/50 border-slate-100 opacity-60 text-slate-400"
                  }`}
                >
                  <Trophy className={`w-5 h-5 shrink-0 mt-0.5 ${ach.unlocked ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} />
                  <div>
                    <h4 className={`text-xs font-black ${ach.unlocked ? "text-slate-950" : "text-slate-400"}`}>{ach.title}</h4>
                    <p className={`text-[10px] mt-0.5 font-medium ${ach.unlocked ? "text-slate-600" : "text-slate-400"}`}>{ach.description}</p>
                    <div className="text-[10px] font-mono text-amber-600 mt-1 font-bold">
                      {ach.unlocked ? `ACTIVE: +${ach.multiplier}x boost` : `Requires: ${ach.cost.toLocaleString()} coins`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
