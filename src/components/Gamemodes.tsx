import React, { useState } from 'react';
import { Pickaxe, Heart, Shield, Cloud, Swords, Gamepad2, Sparkles, Terminal, Copy, Check, ChevronRight } from 'lucide-react';
import { GAMEMODES, Gamemode } from '../data/serverData';
import { playClickSound, playXpOrbSound } from '../utils/audio';

const iconMap: Record<string, React.ReactNode> = {
  Pickaxe: <Pickaxe className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Swords: <Swords className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

interface GamemodesProps {
  onCopyIp: (ip: string, label: string) => void;
}

export const Gamemodes: React.FC<GamemodesProps> = ({ onCopyIp }) => {
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>(GAMEMODES[0]);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'SPECIAL'>('ALL');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const filteredGamemodes = GAMEMODES.filter((gm) => {
    if (filter === 'ACTIVE') return gm.tag === 'ACTIVE';
    if (filter === 'SPECIAL') return gm.tag !== 'ACTIVE';
    return true;
  });

  const handleCopyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    playXpOrbSound();
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="gamemodes" className="py-20 bg-[#0B1511] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-pixel font-bold text-emerald-400 tracking-widest uppercase mb-2">
              BATTLEGROUNDS & EXPEDITIONS
            </div>
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Choose Your Realm
            </h2>
            <p className="text-base text-[#CFC8B0] max-w-xl mt-2">
              Every gamemode is built from the ground up with custom plugins, balanced economies, and zero pay-to-win mechanics.
            </p>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#12221A] rounded-xl border border-[#233A2F]">
            <button
              onClick={() => {
                setFilter('ALL');
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-pixel font-bold transition-colors ${
                filter === 'ALL'
                  ? 'bg-[#22C55E] text-[#0B1511]'
                  : 'text-[#8FA89B] hover:text-white'
              }`}
            >
              All Realms ({GAMEMODES.length})
            </button>
            <button
              onClick={() => {
                setFilter('ACTIVE');
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-pixel font-bold transition-colors ${
                filter === 'ACTIVE'
                  ? 'bg-[#22C55E] text-[#0B1511]'
                  : 'text-[#8FA89B] hover:text-white'
              }`}
            >
              Active Now (6)
            </button>
            <button
              onClick={() => {
                setFilter('SPECIAL');
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-pixel font-bold transition-colors ${
                filter === 'SPECIAL'
                  ? 'bg-[#F59E0B] text-[#0B1511]'
                  : 'text-[#8FA89B] hover:text-white'
              }`}
            >
              Coming Soon (1)
            </button>
          </div>
        </div>

        {/* Gamemode Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {filteredGamemodes.map((gm) => {
            const isSelected = selectedGamemode.id === gm.id;
            return (
              <button
                key={gm.id}
                onClick={() => {
                  setSelectedGamemode(gm);
                  playClickSound();
                }}
                className={`text-left p-5 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#183024] border-[#22C55E] shadow-xl shadow-emerald-950/40 -translate-y-1'
                    : 'bg-[#12201A] border-[#1E3328] hover:border-[#2F4D3D] hover:bg-[#162720]'
                }`}
              >
                {/* Top header row */}
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${gm.badgeColor}25`, color: gm.badgeColor }}
                  >
                    {iconMap[gm.icon]}
                  </div>

                  <span 
                    className="text-[10px] font-pixel font-bold px-2 py-0.5 rounded tracking-wider"
                    style={{
                      backgroundColor: gm.tag === 'ACTIVE' ? '#14532D' : '#78350F',
                      color: gm.tag === 'ACTIVE' ? '#4ADE80' : '#FDE047',
                    }}
                  >
                    {gm.tag}
                  </span>
                </div>

                <h3 className="font-pixel text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {gm.name}
                </h3>
                <div className="text-[11px] font-mono text-[#8FA89B] mb-2">{gm.version}</div>
                <p className="text-xs text-[#CFC8B0] line-clamp-2 leading-relaxed">
                  {gm.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#1F362A] flex items-center justify-between text-xs text-emerald-400 font-semibold">
                  <span>View Details & Commands</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Gamemode Deep Dive Showcase */}
        {selectedGamemode && (
          <div className="mc-card rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#15271F] to-[#0E1A14] border-2 border-[#2C4A3C]">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: selectedGamemode.badgeColor }}
                  >
                    {iconMap[selectedGamemode.icon]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-pixel text-2xl sm:text-3xl font-bold text-white">
                        {selectedGamemode.name}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1F362A] text-emerald-300">
                        {selectedGamemode.version}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400 font-medium">
                      Status: {selectedGamemode.tag} · Direct Connect Ready
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#D4CDBC] leading-relaxed">
                  {selectedGamemode.longDescription}
                </p>

                {/* Features List */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8FA89B] mb-3">
                    REALM FEATURES & HIGHLIGHTS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedGamemode.features.map((feat, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-[#0F1E17] p-2.5 rounded-lg border border-[#1E3328]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Commands Cheatsheet Sidebar */}
              <div className="w-full lg:w-96 bg-[#0B1511] p-5 rounded-xl border border-[#233A2F] space-y-4 shrink-0">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold border-b border-[#1E3328] pb-3">
                  <Terminal className="w-4 h-4" />
                  <span>KEY COMMANDS FOR THIS REALM</span>
                </div>

                <div className="space-y-2.5">
                  {selectedGamemode.commands.map((cmd) => (
                    <div 
                      key={cmd.cmd}
                      className="p-2.5 rounded-lg bg-[#12221A] border border-[#1E3328] hover:border-emerald-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {cmd.cmd}
                        </span>
                        <button
                          onClick={() => handleCopyCmd(cmd.cmd)}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1B3527] hover:bg-emerald-600 text-emerald-200 flex items-center gap-1 transition-colors"
                          title="Copy command"
                        >
                          {copiedCmd === cmd.cmd ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-300" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] text-[#A0AEC0]">
                        {cmd.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onCopyIp('Java.clever-teaching.com', selectedGamemode.name);
                      playXpOrbSound();
                    }}
                    className="w-full mc-button-green py-2.5 rounded-lg text-white font-pixel font-bold text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    <span>Connect to {selectedGamemode.name}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
