import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { Brain, Sparkles, Activity, AlertTriangle, ShieldAlert, Zap } from "lucide-react";
import { playClick, playNotification } from "../utils/audio";

interface IQLaboratoryProps {
  isDarkMode: boolean;
}

export const IQLaboratory: React.FC<IQLaboratoryProps> = ({ isDarkMode }) => {
  // Overthinking Level State (Live meter)
  const [overthinkPct, setOverthinkPct] = useState(89);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [academicSpamCount, setAcademicSpamCount] = useState(128402);

  // Auto-increment the scientific calculation simulation counts
  useEffect(() => {
    const timer = setInterval(() => {
      setAcademicSpamCount((prev) => prev + Math.floor(Math.random() * 8) + 1);
      // Let overthinking percentage wiggle
      setOverthinkPct((prev) => {
        const wiggle = Math.floor(Math.random() * 5) - 2;
        const next = Math.max(75, Math.min(125, prev + wiggle));
        if (next > 110 && !isAlertActive) {
          setIsAlertActive(true);
        } else if (next <= 110 && isAlertActive) {
          setIsAlertActive(false);
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [isAlertActive]);

  // Radar Data: Aqdas' core intellectual assets
  const radarData = [
    { subject: "Vocabulary", A: 99, fullMark: 100 },
    { subject: "Gaming Skills", A: 95, fullMark: 100 },
    { subject: "Excuse Generation", A: 120, fullMark: 100 },
    { subject: "Sleep Capacity", A: 100, fullMark: 100 },
    { subject: "Snack Speed", A: 90, fullMark: 100 },
    { subject: "Homework Compliance", A: 5, fullMark: 100 },
  ];

  // Pie Data: Sibling Time Distribution
  const pieData = [
    { name: "Snoozing / Napping", value: 45 },
    { name: "Finding Literary Symbolism in Memes", value: 25 },
    { name: "Arguing with Older Sibling", value: 20 },
    { name: "Gaming & RPG Backstories", value: 9 },
    { name: "Actual Chores / Homework", value: 1 },
  ];

  const PIE_COLORS = ["#6366f1", "#a855f7", "#ec4899", "#06b6d4", "#e2e8f0"];
  const PIE_COLORS_LIGHT = ["#818cf8", "#c084fc", "#f472b6", "#22d3ee", "#94a3b8"];

  // Bar Data: Excuses Efficacy
  const barData = [
    { category: "Metaphorical", success: 85, fatigue: 90 },
    { category: "Technological", success: 45, fatigue: 30 },
    { category: "Existential", success: 95, fatigue: 98 },
    { category: "Academic", success: 70, fatigue: 60 },
  ];

  const triggerManualSpike = () => {
    playNotification();
    setOverthinkPct(135);
    setIsAlertActive(true);
    setTimeout(() => {
      setOverthinkPct(98);
      setIsAlertActive(false);
    }, 4000);
  };

  return (
    <div className="space-y-8" id="iq-laboratory-section">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-mono text-purple-600 uppercase tracking-widest flex items-center gap-2 font-bold">
            <Activity className="w-4 h-4 animate-pulse text-purple-500" /> Cognitive Diagnostics
          </span>
          <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
            The Aqdas IQ Laboratory
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Real-time biometric monitoring of legendary overthinking, excuse synthesis, and snack depletion.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Calculations Conducted</div>
            <div className="text-xl font-mono font-black text-indigo-600">
              {academicSpamCount.toLocaleString()}
            </div>
          </div>
          <button
            onClick={triggerManualSpike}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-mono font-extrabold transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" /> Force Brainstorm Spike
          </button>
        </div>
      </div>

      {/* Overthinking Live Alert Panel */}
      {isAlertActive && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-900 flex items-center justify-between animate-pulse shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <div className="font-bold text-sm">CRITICAL COGNITIVE SPIKE DETECTED</div>
              <div className="text-xs text-red-700 font-medium mt-0.5">
                Aqdas is currently extracting sub-textual motifs from a single-line WhatsApp text message. Overthinking has passed 110%.
              </div>
            </div>
          </div>
          <div className="text-2xl font-mono font-black text-red-600 ml-4">{overthinkPct}%</div>
        </div>
      )}

      {/* Top Bento Grid - Core metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Card 1 */}
        <div className="premium-card p-6">
          <div className="flex justify-between items-start">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-extrabold">Overthinking Index</div>
            <Brain className="w-5 h-5 text-purple-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-mono font-black text-purple-600">{overthinkPct}%</span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">↑ 14% this hour</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5 border border-slate-200/50">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, overthinkPct)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-mono font-bold uppercase tracking-wider">
            Sensor status: CRITICAL_DRAMA
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="premium-card p-6">
          <div className="flex justify-between items-start">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-extrabold">Excuse Cooldown Rate</div>
            <Activity className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-mono font-black text-indigo-600">0.02s</span>
            <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">Instant Reaction</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5 border border-slate-200/50">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: "98%" }} />
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-mono font-bold uppercase tracking-wider">
            Ready to evade chores: YES
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="premium-card p-6">
          <div className="flex justify-between items-start">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-extrabold">Symbolism Extraction Prowess</div>
            <Sparkles className="w-5 h-5 text-pink-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-mono font-black text-pink-600">999.8x</span>
            <span className="text-xs text-pink-600 font-bold bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">Sub-textual Max</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5 border border-slate-200/50">
            <div className="bg-pink-500 h-full rounded-full" style={{ width: "100%" }} />
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-mono font-bold uppercase tracking-wider">
            Analyzation Mode: HYPER-STYLIZED
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart: Aqdas Intellectual Profile */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-sans text-slate-900">Cognitive Resource Allocation</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Multi-dimensional capability matrix of Baby Brother Aqdas.</p>
          </div>
          <div className="h-[280px] w-full flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#475569" tick={{ fontSize: 10, fontWeight: "bold" }} />
                <PolarRadiusAxis angle={30} domain={[0, 120]} stroke="#cbd5e1" />
                <Radar
                  name="Aqdas"
                  dataKey="A"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.35}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", color: "#0f172a", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[11px] font-mono text-amber-700 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 mt-4 font-bold">
            Critical finding: Homework compliance is dangerously close to absolute zero.
          </div>
        </div>

        {/* Pie Chart: Time Distribution */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-sans text-slate-900">Typical 24-Hour Division</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Where exactly do the hours vanish in Aqdas' universe?</p>
          </div>
          <div className="h-[280px] w-full flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS_LIGHT[index % PIE_COLORS_LIGHT.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", color: "#0f172a", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[11px] font-mono text-slate-400 font-bold mt-4">
            Note: 1% Chores represents picking up the pizza box under protest.
          </div>
        </div>
      </div>

      {/* Bottom Chart: Excuse Efficacy */}
      <div className="premium-card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold font-sans text-slate-900">Excuse Tactics Efficacy</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">Comparison between excuse success rate and parents' exhaustion level.</p>
        </div>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <XAxis dataKey="category" stroke="#475569" style={{ fontSize: 11, fontWeight: "bold" }} />
              <YAxis stroke="#475569" style={{ fontSize: 11, fontWeight: "bold" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", color: "#0f172a", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              />
              <Legend wrapperStyle={{ fontSize: 11, fontWeight: "bold" }} />
              <Bar dataKey="success" name="Success Probability (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fatigue" name="Sibling/Parents Fatigue Score" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
