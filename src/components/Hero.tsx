import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Globe, Wifi, Users, Cpu, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';
import { SERVER_IPS } from '../data/serverData';
import { playClickSound, playXpOrbSound } from '../utils/audio';

interface HeroProps {
  onCopyIp: (ip: string, label: string) => void;
  copiedIp: string | null;
  onlinePlayers: number;
}

export const Hero: React.FC<HeroProps> = ({ onCopyIp, copiedIp, onlinePlayers }) => {
  const [activeTab, setActiveTab] = useState<'java' | 'eagler'>('java');
  const [showMirrors, setShowMirrors] = useState(false);

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden border-b border-[#1E3328]">
      {/* Background ambient gradient and grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(34,197,94,0.18),rgba(11,21,17,0))] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Subtitle / Trust pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Server Network Active · Version 1.8.x - 1.21.4</span>
            <span className="text-[#3A5247]">|</span>
            <span className="text-[#F59E0B]">Cracked & Premium Supported</span>
          </div>

          <a 
            href="#developer"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded bg-[#162720] border border-[#2A4437] text-emerald-300 hover:border-emerald-500 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Infrastructure by <strong>Master_Grazer</strong> (Lead Dev)</span>
          </a>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-pixel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              FIGHT. CONQUER. <br />
              <span className="bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#F59E0B] bg-clip-text text-transparent">
                CLEVER TEACHING.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#CFC8B0] max-w-2xl leading-relaxed">
              The premier cross-platform Minecraft network. Experience custom 
              <strong className="text-white"> Survival</strong>, high-stakes <strong className="text-white">Lifesteal SMP</strong>, 
              grind-heavy <strong className="text-white">OP Prisons</strong>, and competitive <strong className="text-white">Duels</strong> — 
              join on PC Java or directly in your web browser via Eaglercraft.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#12231A]/80 border border-[#233A2F] flex flex-col">
                <span className="text-xs text-[#8FA89B] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> Online
                </span>
                <span className="font-pixel text-2xl font-bold text-white mt-1 tabular-nums">
                  {onlinePlayers} <span className="text-xs font-sans text-emerald-400 font-normal">/ 1,500</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12231A]/80 border border-[#233A2F] flex flex-col">
                <span className="text-xs text-[#8FA89B] flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" /> Performance
                </span>
                <span className="font-pixel text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                  20.0 <span className="text-xs font-sans text-slate-300 font-normal">TPS</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12231A]/80 border border-[#233A2F] flex flex-col">
                <span className="text-xs text-[#8FA89B] flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-amber-400" /> Avg Latency
                </span>
                <span className="font-pixel text-2xl font-bold text-amber-300 mt-1 tabular-nums">
                  14ms <span className="text-xs font-sans text-slate-400 font-normal">Netty</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12231A]/80 border border-[#233A2F] flex flex-col">
                <span className="text-xs text-[#8FA89B] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Defense
                </span>
                <span className="font-pixel text-xl font-bold text-purple-300 mt-1">
                  Sentinel <span className="text-[10px] font-sans text-emerald-400 font-normal">Active</span>
                </span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#gamemodes"
                onClick={() => playClickSound()}
                className="mc-button-green px-6 py-3.5 rounded-lg text-white font-pixel font-bold text-lg tracking-wide flex items-center gap-2 hover:brightness-110 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>Explore Gamemodes</span>
              </a>

              <a
                href="https://discord.gg/3nUm5w8VwX"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="mc-button-dark px-6 py-3.5 rounded-lg text-[#F3EBD3] font-pixel font-bold text-lg tracking-wide hover:text-white flex items-center gap-2"
              >
                <span>Join 2,500+ on Discord</span>
                <ExternalLink className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Connection Box */}
          <div className="lg:col-span-5">
            <div className="mc-card rounded-2xl p-6 relative overflow-hidden bg-gradient-to-b from-[#162720] to-[#0E1A14] border-2 border-[#2D4A3C]">
              
              <div className="flex items-center justify-between border-b border-[#233A2F] pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <span className="font-pixel text-xl font-bold text-white">Direct Connect</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Platform Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#0A130F] rounded-xl mb-5 border border-[#1E3328]">
                <button
                  onClick={() => {
                    setActiveTab('java');
                    playClickSound();
                  }}
                  className={`py-2.5 px-4 rounded-lg font-pixel text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'java'
                      ? 'bg-[#22C55E] text-[#0B1511] shadow-md shadow-emerald-950/40'
                      : 'text-[#8FA89B] hover:text-white'
                  }`}
                >
                  <span>Java Edition</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('eagler');
                    playClickSound();
                  }}
                  className={`py-2.5 px-4 rounded-lg font-pixel text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'eagler'
                      ? 'bg-[#38BDF8] text-[#082F49] shadow-md shadow-sky-950/40'
                      : 'text-[#8FA89B] hover:text-white'
                  }`}
                >
                  <span>Eaglercraft (Web)</span>
                </button>
              </div>

              {/* Tab 1: Java Connection */}
              {activeTab === 'java' && (
                <div className="space-y-4">
                  <div className="bg-[#0B1511] p-4 rounded-xl border border-[#233A2F]">
                    <div className="text-xs text-[#8FA89B] font-mono mb-1">JAVA SERVER ADDRESS</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-base sm:text-lg font-bold text-[#4ADE80] break-all select-all">
                        {SERVER_IPS.java.address}
                      </span>
                      <button
                        onClick={() => {
                          onCopyIp(SERVER_IPS.java.address, 'Java Edition IP');
                          playXpOrbSound();
                        }}
                        className="px-3.5 py-2 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#0B1511] font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        {copiedIp === SERVER_IPS.java.address ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>COPY IP</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-[#A0AEC0] space-y-1.5 bg-[#12201A] p-3 rounded-lg border border-[#1E3328]">
                    <div className="flex items-center justify-between">
                      <span>Supported Versions:</span>
                      <strong className="text-white font-mono">1.8.x – 1.21.4</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Account Type:</span>
                      <span className="text-emerald-400 font-semibold">Premium & Cracked</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Port (Optional):</span>
                      <span className="text-slate-300 font-mono">25565 (Default)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Eaglercraft Web Client */}
              {activeTab === 'eagler' && (
                <div className="space-y-4">
                  <div className="bg-[#0B1511] p-4 rounded-xl border border-[#233A2F]">
                    <div className="text-xs text-sky-400 font-mono mb-1">MAIN EAGLERCRAFT WEBSOCKET IP</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm sm:text-base font-bold text-sky-300 break-all select-all">
                        {SERVER_IPS.eaglerMain.address}
                      </span>
                      <button
                        onClick={() => {
                          onCopyIp(SERVER_IPS.eaglerMain.address, 'Eaglercraft Main WS');
                          playXpOrbSound();
                        }}
                        className="px-3.5 py-2 rounded-lg bg-[#38BDF8] hover:bg-[#0284C7] text-[#082F49] font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        {copiedIp === SERVER_IPS.eaglerMain.address ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>COPY WS</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* School Unblocked Mirrors Accordion */}
                  <div className="bg-[#0F1E17] rounded-xl border border-[#233A2F] overflow-hidden">
                    <button
                      onClick={() => {
                        setShowMirrors(!showMirrors);
                        playClickSound();
                      }}
                      className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-semibold text-[#E2E8F0] hover:bg-[#162720] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Alternative Unblocked School Mirrors (6 Available)</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showMirrors ? 'rotate-180' : ''}`} />
                    </button>

                    {showMirrors && (
                      <div className="p-3 border-t border-[#233A2F] space-y-2 bg-[#0A130F]">
                        <p className="text-[11px] text-[#A0AEC0] mb-2">
                          Use these WebSocket URLs if your school or network firewall blocks the primary address:
                        </p>
                        {SERVER_IPS.eaglerMirrors.map((mirror) => (
                          <div 
                            key={mirror.url}
                            className="flex items-center justify-between bg-[#12231A] p-2 rounded border border-[#1E3328] text-xs font-mono"
                          >
                            <div>
                              <div className="text-emerald-300 font-bold">{mirror.url}</div>
                              <div className="text-[10px] text-[#8FA89B] font-sans">{mirror.note}</div>
                            </div>
                            <button
                              onClick={() => {
                                onCopyIp(mirror.url, mirror.note);
                                playXpOrbSound();
                              }}
                              className="px-2 py-1 rounded bg-[#1B3527] hover:bg-emerald-700 text-white text-[11px]"
                            >
                              Copy
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-[#8FA89B] text-center">
                    Paste this address into the Direct Connect or Multiplayer server list inside any Eaglercraft client.
                  </p>
                </div>
              )}

              {/* Footer Note */}
              <div className="mt-5 pt-4 border-t border-[#233A2F] flex items-center justify-between text-xs text-[#8FA89B]">
                <span>Status: <strong className="text-emerald-400">99.98% Uptime</strong></span>
                <span className="font-mono text-[#F59E0B]">DDoS Protected by Cloudflare</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
