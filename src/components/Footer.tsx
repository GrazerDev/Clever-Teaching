import React from 'react';
import { Copy, Check, Disc as DiscordIcon, ShoppingCart, Terminal, Heart } from 'lucide-react';
import { SERVER_IPS } from '../data/serverData';
import { playClickSound, playXpOrbSound } from '../utils/audio';

interface FooterProps {
  onCopyIp: (ip: string, label: string) => void;
  copiedIp: string | null;
}

export const Footer: React.FC<FooterProps> = ({ onCopyIp, copiedIp }) => {
  return (
    <footer className="bg-[#070E0B] text-[#CFC8B0] border-t border-[#192A21] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#16251E]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#15803D] border border-[#4ADE80]/40 flex items-center justify-center font-pixel text-lg font-bold text-[#0B1511]">
                CT
              </div>
              <span className="font-pixel text-2xl font-bold text-white tracking-wide">
                Clever <span className="text-[#22C55E]">Teaching</span>
              </span>
            </div>

            <p className="text-xs text-[#8FA89B] leading-relaxed max-w-sm">
              The Clever way of playing Minecraft. Premium & cracked cross-platform network supporting Java 1.8.x - 1.21.x and browser Eaglercraft clients worldwide.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => {
                  onCopyIp(SERVER_IPS.java.address, 'Java Edition');
                  playXpOrbSound();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#12221A] hover:bg-[#1A3024] border border-[#233A2F] text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                {copiedIp === SERVER_IPS.java.address ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Java.clever-teaching.com</span>
              </button>

              <button
                onClick={() => {
                  onCopyIp(SERVER_IPS.eaglerMain.address, 'Eaglercraft WS');
                  playXpOrbSound();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#12221A] hover:bg-[#1A3024] border border-[#233A2F] text-[11px] font-mono text-sky-400 flex items-center gap-1.5 transition-colors"
              >
                {copiedIp === SERVER_IPS.eaglerMain.address ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>wss://clever-teaching.com</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-pixel text-sm font-bold text-white uppercase tracking-wider mb-4">
              Gamemodes
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#gamemodes" className="hover:text-emerald-400 transition-colors">Survival SMP</a></li>
              <li><a href="#gamemodes" className="hover:text-emerald-400 transition-colors">Lifesteal SMP</a></li>
              <li><a href="#gamemodes" className="hover:text-emerald-400 transition-colors">OP Prisons (A-Z)</a></li>
              <li><a href="#gamemodes" className="hover:text-emerald-400 transition-colors">SkyBlock Minions</a></li>
              <li><a href="#gamemodes" className="hover:text-emerald-400 transition-colors">Duels & Crystal PvP</a></li>
              <li><a href="#gamemodes" className="hover:text-emerald-400 transition-colors">Bedwars 1.8</a></li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-pixel text-sm font-bold text-white uppercase tracking-wider mb-4">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://discord.gg/3nUm5w8VwX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <DiscordIcon className="w-3.5 h-3.5 text-[#5865F2]" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://store.clever-teaching.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Store</span>
                </a>
              </li>
              <li><a href="#rules" className="hover:text-emerald-400 transition-colors">Community Rules</a></li>
              <li><a href="#vote" className="hover:text-emerald-400 transition-colors">Vote for Server</a></li>
              <li><a href="#staff" className="hover:text-emerald-400 transition-colors">Staff Applications</a></li>
            </ul>
          </div>

          {/* Developer & Legal */}
          <div>
            <h4 className="font-pixel text-sm font-bold text-white uppercase tracking-wider mb-4">
              Development
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#developer" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-semibold text-emerald-300">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Lead Dev: Master_Grazer</span>
                </a>
              </li>
              <li><a href="#developer" className="hover:text-emerald-400 transition-colors">Velocity Proxy Pipeline</a></li>
              <li><a href="#developer" className="hover:text-emerald-400 transition-colors">Sentinel Anti-Cheat</a></li>
              <li><a href="#developer" className="hover:text-emerald-400 transition-colors">Patch Notes & Logs</a></li>
              <li><a href="#developer" className="hover:text-emerald-400 transition-colors">Bug Bounty Program</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div>
            &copy; {new Date().getFullYear()} Clever Teaching. Not an official Minecraft service. Not approved by or associated with Mojang or Microsoft.
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <span>Engineered with excellence by</span>
            <strong className="text-white bg-[#12221A] px-2 py-0.5 rounded border border-[#233A2F]">
              Master_Grazer
            </strong>
          </div>
        </div>

      </div>
    </footer>
  );
};
