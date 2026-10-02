import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Database, Network, GitCommit, CheckCircle, Bug, Send } from 'lucide-react';
import { DEV_CHANGELOGS } from '../data/serverData';
import { playClickSound, playLevelUpSound, playXpOrbSound } from '../utils/audio';

export const DevArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'changelog' | 'terminal' | 'bugreport'>('architecture');
  const [reportTitle, setReportTitle] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Terminal simulator lines
  const [terminalLogs] = useState<string[]>([
    '[07:44:02 INFO] [Velocity-Core] Velocity Proxy v3.4 initialized on port 25565.',
    '[07:44:03 INFO] [Netty-Pipeline] Listening for Eaglercraft WebSockets on wss://clever-teaching.com [AES-GCM encrypted].',
    '[07:44:05 INFO] [Sentinel-AC] Combat Engine loaded 14 heuristics models: Killaura, Reach (3.0 limit), AutoClicker (16 CPS max), Timer.',
    '[07:44:08 INFO] [Redis-Sync] Connected to global cluster: synced 1,482 permissions and economy balances across 8 backend servers.',
    '[07:44:11 INFO] [Paper-Kernel] ZGC garbage collection active. Sustained 20.00 TPS on Lifesteal-01 with 165 active players.',
    '[07:44:15 INFO] [Sentinel-AC] Evaluated 12,480 combat events in past 60s: 0 false positives, 3 packet tampering anomalies quarantined.',
    '[07:44:20 INFO] [Master_Grazer] Network health: 100% operational. Packet loss: 0.00%. Average latency: 14.2ms.',
  ]);

  const handleSubmitBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim()) return;
    playLevelUpSound();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportTitle('');
      setReportDetails('');
      setReportSubmitted(false);
    }, 4000);
  };

  return (
    <section id="developer" className="py-20 bg-[#0E1A14] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase mb-2">
              <Terminal className="w-4 h-4" />
              <span>CORE ARCHITECTURE & SYSTEMS ENGINEERING</span>
            </div>
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Engineering Hub
            </h2>
            <p className="text-base text-[#CFC8B0] max-w-2xl mt-2">
              Clever Teaching runs on custom-crafted server architecture built and optimized by 
              <strong className="text-emerald-400 font-semibold"> Master_Grazer</strong> (Lead Systems & Network Developer).
            </p>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#12221A] rounded-xl border border-[#233A2F]">
            <button
              onClick={() => {
                setActiveTab('architecture');
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-pixel font-bold transition-colors ${
                activeTab === 'architecture' ? 'bg-[#22C55E] text-[#0B1511]' : 'text-[#8FA89B] hover:text-white'
              }`}
            >
              Systems Stack
            </button>
            <button
              onClick={() => {
                setActiveTab('terminal');
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-pixel font-bold transition-colors ${
                activeTab === 'terminal' ? 'bg-[#38BDF8] text-[#082F49]' : 'text-[#8FA89B] hover:text-white'
              }`}
            >
              Live Kernel Logs
            </button>
            <button
              onClick={() => {
                setActiveTab('changelog');
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-pixel font-bold transition-colors ${
                activeTab === 'changelog' ? 'bg-[#22C55E] text-[#0B1511]' : 'text-[#8FA89B] hover:text-white'
              }`}
            >
              Dev Patch Notes
            </button>
            <button
              onClick={() => {
                setActiveTab('bugreport');
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-pixel font-bold transition-colors ${
                activeTab === 'bugreport' ? 'bg-[#F59E0B] text-[#0B1511]' : 'text-[#8FA89B] hover:text-white'
              }`}
            >
              Submit Feedback
            </button>
          </div>
        </div>

        {/* Lead Dev Profile Banner */}
        <div className="mc-card rounded-2xl p-6 mb-10 bg-gradient-to-r from-[#142B20] via-[#12231A] to-[#0D1813] border-2 border-emerald-500/40 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-[#09140E] border-2 border-emerald-400 p-1 flex items-center justify-center shadow-lg shadow-emerald-950/60 overflow-hidden">
                <img 
                  src="https://mc-heads.net/avatar/Master_Grazer" 
                  alt="Master_Grazer Avatar"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to stylized SVG avatar if external image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-[#0B1511] p-1 rounded-full border-2 border-[#0B1511]">
                <CheckCircle className="w-4 h-4 font-bold" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h3 className="font-pixel text-2xl font-bold text-white">
                  Master_Grazer
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-pixel text-xs font-bold">
                  HEAD DEVELOPER & SYSTEMS ARCHITECT
                </span>
                <span className="text-xs font-mono text-[#8FA89B]">
                  Discord: <strong className="text-emerald-300">Master_Grazer</strong>
                </span>
              </div>

              <p className="text-sm text-[#CFC8B0] leading-relaxed max-w-3xl">
                Responsible for full-stack engineering of the Clever Teaching network: custom Velocity Netty routing, 
                Sentinel combat verification anti-cheat, PaperMC memory tuning, asynchronous prison mine generation, 
                and low-latency Eaglercraft Web bridge.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#1A3326] text-emerald-300 border border-[#2B523E]">Java 1.8-1.21 Pipeline</span>
                <span className="px-2 py-0.5 rounded bg-[#1A3326] text-sky-300 border border-[#2B523E]">Velocity Proxy Architecture</span>
                <span className="px-2 py-0.5 rounded bg-[#1A3326] text-purple-300 border border-[#2B523E]">Sentinel Anti-Cheat Engine</span>
                <span className="px-2 py-0.5 rounded bg-[#1A3326] text-amber-300 border border-[#2B523E]">Zero Packet Drop Buffers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Architecture Stack */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-[#12221A] border border-[#233A2F] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Network className="w-6 h-6" />
              </div>
              <h4 className="font-pixel text-xl font-bold text-white">Velocity Netty Proxy</h4>
              <p className="text-xs text-[#CFC8B0] leading-relaxed">
                Replaced traditional BungeeCord with a custom Velocity fork. Features direct Netty direct-buffer allocation, dropping client-to-server overhead to under 12ms.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-400">
                Throughput: 128,000 packets/sec
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12221A] border border-[#233A2F] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-pixel text-xl font-bold text-white">Sentinel Anti-Cheat</h4>
              <p className="text-xs text-[#CFC8B0] leading-relaxed">
                Server-authoritative movement & combat verification engine. Eliminates reach, killaura, boat fly, and timer spoofing on both Java and Eagler clients.
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-400">
                Detection: 14 heuristic modules
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12221A] border border-[#233A2F] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="font-pixel text-xl font-bold text-white">Redis & SQL Data Bridge</h4>
              <p className="text-xs text-[#CFC8B0] leading-relaxed">
                Asynchronous state management for player ranks, currencies, and chat channels. Instant player synchronization across all proxy instances with 0 rollback risk.
              </p>
              <div className="pt-2 text-[11px] font-mono text-sky-400">
                Sync Latency: &lt; 5ms pub/sub
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12221A] border border-[#233A2F] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-pixel text-xl font-bold text-white">Paper Kernel Tuning</h4>
              <p className="text-xs text-[#CFC8B0] leading-relaxed">
                Custom low-pause JVM garbage collector flags (ZGC) preventing tick stalls during massive OP Prison mine explosions and 100-player Crystal PvP events.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-400">
                Performance: Solid 20.0 TPS
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Kernel Console */}
        {activeTab === 'terminal' && (
          <div className="bg-[#08100C] rounded-2xl p-6 border-2 border-[#1E3328] font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1A2E23] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[#8FA89B] ml-2">master_grazer@clever-teaching-core:~/network</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE KERNEL FEED
              </span>
            </div>

            <div className="space-y-2 text-[#CFC8B0] leading-relaxed overflow-x-auto">
              {terminalLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-slate-500 select-none">{index + 1}</span>
                  <span className={log.includes('Sentinel-AC') ? 'text-purple-300' : log.includes('Master_Grazer') ? 'text-emerald-300 font-bold' : ''}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-emerald-400 pt-2">
                <span>master_grazer&gt;</span>
                <span className="w-2 h-4 bg-emerald-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dev Patch Notes */}
        {activeTab === 'changelog' && (
          <div className="space-y-6">
            {DEV_CHANGELOGS.map((log) => (
              <div key={log.version} className="p-6 rounded-2xl bg-[#12221A] border-2 border-[#233A2F] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E3328] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-mono text-sm font-bold">
                      {log.version}
                    </span>
                    <h4 className="font-pixel text-xl font-bold text-white">{log.headline}</h4>
                  </div>
                  <div className="text-xs text-[#8FA89B] font-mono">
                    Authored by <strong className="text-emerald-300">{log.author}</strong> ({log.date})
                  </div>
                </div>

                <p className="text-sm text-[#CFC8B0] leading-relaxed">
                  {log.summary}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-semibold uppercase">Engine Changelist:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {log.improvements.map((imp, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-[#0B1511] p-2.5 rounded-lg border border-[#1E3328]">
                        <GitCommit className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {log.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-lg bg-[#0E1A14] border border-[#1E3328] text-center">
                      <div className="text-[10px] text-[#8FA89B] font-mono">{m.label}</div>
                      <div className="font-pixel text-lg font-bold text-emerald-300">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Bug Report & Dev Feedback */}
        {activeTab === 'bugreport' && (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#12221A] border-2 border-[#233A2F]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bug className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-pixel text-2xl font-bold text-white">Direct Bug & Performance Dispatch</h3>
                <p className="text-xs text-[#8FA89B]">Messages are logged directly into Master_Grazer's dev triage inbox.</p>
              </div>
            </div>

            {reportSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-pixel text-xl font-bold text-white">Report Dispatched!</h4>
                <p className="text-xs text-emerald-200">
                  Thank you! Master_Grazer has received your technical report and will review it immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBug} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#8FA89B] mb-1">
                    REPORT HEADLINE / SYSTEM COMPONENT
                  </label>
                  <input
                    type="text"
                    required
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="e.g. Prison Mine reset delay or Lifesteal heart crafting glitch"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B1511] border border-[#233A2F] text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8FA89B] mb-1">
                    DETAILED TECHNICAL CONTEXT & REPRODUCTION STEPS
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Describe what occurred, your client version (Java or Eaglercraft), realm name, and coordinates if applicable..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B1511] border border-[#233A2F] text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mc-button-green py-3 rounded-lg text-white font-pixel font-bold text-base flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Report to Master_Grazer</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
