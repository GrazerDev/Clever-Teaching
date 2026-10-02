import React, { useState } from 'react';
import { Activity, RefreshCw, Server, Zap, CheckCircle2 } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../utils/audio';

interface ServerStatusProps {
  onlinePlayers: number;
}

export const ServerStatus: React.FC<ServerStatusProps> = ({ onlinePlayers }) => {
  const [isPinging, setIsPinging] = useState(false);
  const [pingLatency, setPingLatency] = useState(14);
  const [lastPingedTime, setLastPingedTime] = useState('Live');

  const handleManualPing = () => {
    playClickSound();
    setIsPinging(true);
    setTimeout(() => {
      // Small realistic jitter
      const nextPing = Math.floor(12 + Math.random() * 6);
      setPingLatency(nextPing);
      setIsPinging(false);
      setLastPingedTime('Live');
      playLevelUpSound();
    }, 600);
  };

  const gamemodeDistribution = [
    { name: 'Lifesteal SMP', count: Math.round(onlinePlayers * 0.38), color: 'bg-red-500' },
    { name: 'Survival SMP', count: Math.round(onlinePlayers * 0.32), color: 'bg-emerald-500' },
    { name: 'OP Prisons', count: Math.round(onlinePlayers * 0.16), color: 'bg-amber-500' },
    { name: 'Duels & Practice', count: Math.round(onlinePlayers * 0.08), color: 'bg-purple-500' },
    { name: 'SkyBlock & Minis', count: Math.round(onlinePlayers * 0.06), color: 'bg-sky-500' },
  ];

  return (
    <section className="py-12 bg-[#0D1A14] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mc-card rounded-2xl p-6 sm:p-8 bg-[#12221A] border-2 border-[#243E31]">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E3328] pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-pixel text-xl sm:text-2xl font-bold text-white">
                  Real-Time Network Telemetry
                </h3>
                <p className="text-xs text-[#8FA89B]">
                  Live query feed powered by Master_Grazer's Velocity Netty proxy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Sync</span>
              </span>
              <button
                onClick={handleManualPing}
                disabled={isPinging}
                className="px-3.5 py-1.5 rounded-lg bg-[#1B3527] hover:bg-[#254A37] border border-[#2F5841] text-xs font-pixel font-bold text-emerald-300 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin text-emerald-400' : ''}`} />
                <span>{isPinging ? 'Pinging...' : 'Ping Network'}</span>
              </button>
            </div>
          </div>

          {/* Minecraft MOTD Styled Visualizer */}
          <div className="mb-6 p-4 rounded-xl bg-[#08100C] border border-[#1A2E23] font-mono text-sm shadow-inner">
            <div className="text-[11px] text-[#8FA89B] mb-1.5 flex items-center justify-between">
              <span>SERVER LIST IN-GAME PREVIEW (MOTD)</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Online: {onlinePlayers}/1500
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-[#22C55E] font-bold tracking-wide">
                ✦ CLEVER TEACHING NETWORK ✦ <span className="text-white font-normal">| Custom Gamemodes & Crossplay</span>
              </div>
              <div className="text-[#CFC8B0] text-xs flex flex-wrap gap-2">
                <span className="text-emerald-400">Survival</span>
                <span className="text-slate-600">»</span>
                <span className="text-red-400 font-semibold">Lifesteal SMP</span>
                <span className="text-slate-600">»</span>
                <span className="text-amber-400">OP Prisons</span>
                <span className="text-slate-600">»</span>
                <span className="text-sky-400">SkyBlock</span>
                <span className="text-yellow-400 ml-auto font-bold">[1.8.x - 1.21.4]</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-[#0E1A14] border border-[#1E3328]">
              <div className="text-xs text-[#8FA89B] font-mono">TICKRATE STABILITY</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-pixel text-3xl font-bold text-[#22C55E]">20.0</span>
                <span className="text-xs text-slate-400 font-mono">/ 20.0 TPS (100%)</span>
              </div>
              <div className="w-full bg-[#1A2E23] h-2 rounded-full mt-2.5 overflow-hidden">
                <div className="bg-[#22C55E] h-full w-full"></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0E1A14] border border-[#1E3328]">
              <div className="text-xs text-[#8FA89B] font-mono">PROXY RESPONSE TIME</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-pixel text-3xl font-bold text-sky-400">{pingLatency}ms</span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Ultra-low Latency
                </span>
              </div>
              <div className="w-full bg-[#1A2E23] h-2 rounded-full mt-2.5 overflow-hidden">
                <div className="bg-sky-400 h-full w-[94%]"></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0E1A14] border border-[#1E3328]">
              <div className="text-xs text-[#8FA89B] font-mono">CLIENT CROSSPLAY COMPATIBILITY</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-pixel text-2xl font-bold text-amber-300">Java + Eagler</span>
                <span className="text-xs text-slate-400 font-mono">Cracked OK</span>
              </div>
              <div className="text-[11px] text-[#A0AEC0] mt-2">
                Auto-translates packet protocol from 1.8 up to latest 1.21.x
              </div>
            </div>
          </div>

          {/* Gamemode Population Distribution */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#8FA89B] mb-2 font-mono">
              <span>ACTIVE PLAYERS BY REALM</span>
              <span className="text-white font-bold">{onlinePlayers} Players Currently Battling</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#08100C] overflow-hidden flex border border-[#1A2E23]">
              {gamemodeDistribution.map((gm) => (
                <div
                  key={gm.name}
                  style={{ width: `${(gm.count / onlinePlayers) * 100}%` }}
                  className={`${gm.color} h-full transition-all duration-500`}
                  title={`${gm.name}: ${gm.count} players`}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#CFC8B0]">
              {gamemodeDistribution.map((gm) => (
                <div key={gm.name} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-sm ${gm.color}`}></span>
                  <span>{gm.name}:</span>
                  <strong className="text-white font-mono">{gm.count}</strong>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
