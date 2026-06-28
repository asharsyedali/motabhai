import React, { useEffect, useState, useRef } from "react";
import { Search, Sparkles, Sliders, Music, Volume2, ShieldAlert, Award, FileText, ArrowRight, Zap } from "lucide-react";
import { playClick, playNotification } from "../utils/audio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (pageId: string) => void;
  onToggleTheme: () => void;
  onTriggerSecret: () => void;
  isDarkMode: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onToggleTheme,
  onTriggerSecret,
  isDarkMode,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard hotkey (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        playClick();
        if (isOpen) onClose();
        else onClose(); // It triggers toggle in App
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: "home", label: "Navigate to Entrance Lobby (Hero)", category: "Navigation", icon: ArrowRight },
    { id: "about", label: "Navigate to Biography & Timeline", category: "Navigation", icon: Award },
    { id: "literature", label: "Navigate to English Literature Department", category: "Navigation", icon: FileText },
    { id: "iq-lab", label: "Navigate to IQ Laboratory (Fake Charts)", category: "Navigation", icon: Sliders },
    { id: "roast", label: "Navigate to Automated Roast Generator", category: "Navigation", icon: Sparkles },
    { id: "game", label: "Navigate to Baby Brother Simulator 2026", category: "Navigation", icon: Zap },
    { id: "gallery", label: "Navigate to Meme Archival Gallery", category: "Navigation", icon: Search },
    { id: "awards", label: "Navigate to Hall of Golden Certificates", category: "Navigation", icon: Award },
    { id: "news", label: "Navigate to Newsroom & Breakings", category: "Navigation", icon: FileText },
    { id: "dashboard", label: "Navigate to Central Analytical Dashboard", category: "Navigation", icon: Sliders },
    { id: "contact", label: "Navigate to Official Submissions (Contact)", category: "Navigation", icon: FileText },
    { id: "secret", label: "Access Vault of Secrets", category: "Navigation", icon: ShieldAlert },
    { id: "theme", label: "Toggle Theme (Light / Dark Mode)", category: "Actions", icon: Sparkles, action: onToggleTheme },
    { id: "sound-test", label: "Trigger Synthesized Notification Sound Test", category: "Actions", icon: Volume2, action: () => playNotification() },
    { id: "secret-trigger", label: "Invoke Quantum Overthinking Mode", category: "Actions", icon: ShieldAlert, action: onTriggerSecret },
  ];

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (act: typeof actions[0]) => {
    playClick();
    if (act.action) {
      act.action();
    } else {
      onNavigate(act.id);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 backdrop-blur-md bg-slate-900/30 transition-opacity duration-300"
      onClick={onClose}
      id="command-palette-overlay"
    >
      <div
        className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/95 text-slate-900 shadow-2xl shadow-indigo-100 transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
        id="command-palette-container"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-indigo-500 shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent outline-none border-none text-base text-slate-900 placeholder-slate-400 font-medium"
            placeholder="Type a command or search sections... (e.g., roast, theme, simulator)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="px-2 py-0.5 rounded-lg text-[10px] font-mono border bg-slate-100 border-slate-200 text-slate-600 font-extrabold">
            ESC
          </div>
        </div>

        {/* Action List */}
        <div className="max-h-[350px] overflow-y-auto p-3.5" id="command-palette-results">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm font-medium">
              No results found matching "{query}"
            </div>
          ) : (
            <div>
              {/* Grouping results by category */}
              {["Navigation", "Actions"].map((category) => {
                const groupItems = filtered.filter((i) => i.category === category);
                if (groupItems.length === 0) return null;

                return (
                  <div key={category} className="mb-4">
                    <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                      {category}
                    </div>
                    <div className="space-y-1 mt-1.5">
                      {groupItems.map((act) => {
                        const Icon = act.icon;
                        return (
                          <button
                            key={act.id}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left text-sm transition-all duration-150 hover:bg-indigo-50 text-slate-700 hover:text-indigo-950 font-bold"
                            onClick={() => handleSelect(act)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="font-bold">{act.label}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-md">Select</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 text-[10px] font-mono border-t border-slate-100 flex justify-between items-center bg-slate-50 text-slate-500 font-bold">
          <span>Use ↑↓ to navigate, ENTER to select</span>
          <span>Aqdas Research Systems v2.26</span>
        </div>
      </div>
    </div>
  );
};
