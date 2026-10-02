import React, { useState } from 'react';
import { Search, Shield, Heart, Award, Clock, Swords } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../utils/audio';

export const PlayerLookup: React.FC = () => {
  const [username, setUsername] = useState('Master_Grazer');
  const [activeProfile, setActiveProfile] = useState({
    username: 'Master_Grazer',
    rank: 'LEAD DEVELOPER ⭐',
    rankColor: 'text-emerald-400',
    rankBg: 'bg-emerald-950/80 border-emerald-500/50',
    playtime: '842 Hours',
    kills: 1420,
    deaths: 98,
    hearts: 20,
    prisonRank: 'Mine Z (Prestige IV)',
    clan: '[DEV_CORE]',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    playClickSound();

    const clean = username.trim();
    const isGrazer = clean.toLowerCase() === 'master_grazer';
    const isOwner = clean.toLowerCase() === 'mastermonkey' || clean.toLowerCase() === 'allforhim0064';

    setActiveProfile({
      username: clean,
      rank: isGrazer ? 'LEAD DEVELOPER ⭐' : isOwner ? 'OWNER' : 'MVP+ Member',
      rankColor: isGrazer ? 'text-emerald-400' : isOwner ? 'text-red-400' : 'text-purple-400',
      rankBg: isGrazer 
        ? 'bg-emerald-950/80 border-emerald-500/50' 
        : isOwner 
        ? 'bg-red-950/80 border-red-500/50' 
        : 'bg-purple-950/80 border-purple-500/50',
      playtime: `${Math.floor(clean.length * 37 + 45)} Hours`,
      kills: Math.floor(clean.length * 128 + 240),
      deaths: Math.floor(clean.length * 18 + 12),
      hearts: Math.min(20, Math.max(10, clean.length * 2)),
      prisonRank: `Mine ${String.fromCharCode(65 + (clean.length % 26))}`,
      clan: `[${clean.slice(0, 4).toUpperCase()}]`,
    });

    playLevelUpSound();
  };

  return (
    <section id="player-lookup" className="py-20 bg-[#0B1511] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-pixel font-bold text-emerald-400 tracking-widest uppercase mb-2">
            COMMUNITY IDENTITY & STATISTICS
          </div>
          <h2 className="font-pixel text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Player Profile Explorer
          </h2>
          <p className="text-base text-[#CFC8B0] mt-2">
            Inspect real-time player skins, rank status, combat kills, and realm progression across the Clever Teaching network.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mt-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter player username..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#12221A] border border-[#233A2F] text-white font-mono text-sm focus:outline-none focus:border-emerald-400"
              />
              <Search className="w-4 h-4 text-[#8FA89B] absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="mc-button-green px-5 py-3 rounded-xl font-pixel font-bold text-white text-sm shrink-0"
            >
              Lookup
            </button>
          </form>
        </div>

        {/* Profile Card Showcase */}
        <div className="max-w-3xl mx-auto mc-card rounded-2xl p-6 sm:p-8 bg-[#12221A] border-2 border-[#243E31]">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            
            {/* Skin Render Box */}
            <div className="w-44 h-64 rounded-xl bg-[#08100C] border-2 border-[#1E3328] p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-inner shrink-0">
              <img
                src={`https://mc-heads.net/body/${activeProfile.username}`}
                alt={`${activeProfile.username} Minecraft Skin`}
                className="h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                onError={(e) => {
                  // Fallback avatar
                  (e.target as HTMLImageElement).src = `https://mc-heads.net/avatar/${activeProfile.username}`;
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-slate-400 bg-[#0B1511]/90 rounded py-0.5">
                3D Skin Render
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E3328] pb-3">
                <div>
                  <h3 className="font-pixel text-3xl font-bold text-white tracking-wide">
                    {activeProfile.username}
                  </h3>
                  <div className="text-xs font-mono text-[#8FA89B] mt-0.5">
                    Clan: <span className="text-amber-300 font-bold">{activeProfile.clan}</span>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-lg border font-pixel text-xs font-bold ${activeProfile.rankBg} ${activeProfile.rankColor}`}>
                  {activeProfile.rank}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#0E1A14] border border-[#1E3328]">
                  <div className="text-[11px] text-[#8FA89B] flex items-center gap-1">
                    <Swords className="w-3 h-3 text-red-400" /> Total Kills
                  </div>
                  <div className="font-pixel text-xl font-bold text-white mt-1 tabular-nums">
                    {activeProfile.kills}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0E1A14] border border-[#1E3328]">
                  <div className="text-[11px] text-[#8FA89B] flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500" /> Max Hearts
                  </div>
                  <div className="font-pixel text-xl font-bold text-rose-400 mt-1 tabular-nums">
                    {activeProfile.hearts} Hearts
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0E1A14] border border-[#1E3328]">
                  <div className="text-[11px] text-[#8FA89B] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" /> Total Playtime
                  </div>
                  <div className="font-pixel text-xl font-bold text-sky-300 mt-1 tabular-nums">
                    {activeProfile.playtime}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0E1A14] border border-[#1E3328] col-span-2 sm:col-span-3">
                  <div className="text-[11px] text-[#8FA89B] flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" /> OP Prison Rank Progression
                  </div>
                  <div className="font-pixel text-lg font-bold text-amber-300 mt-0.5">
                    {activeProfile.prisonRank}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#8FA89B] bg-[#0A130F] p-2.5 rounded-lg border border-[#1E3328] flex items-center justify-between">
                <span>Account Status: <strong className="text-emerald-400">VERIFIED & ACTIVE</strong></span>
                <span className="font-mono text-emerald-400">Sentinel Approved</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
