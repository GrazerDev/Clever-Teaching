import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Menu, X, Disc as DiscordIcon, Shield, Terminal } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playClickSound, playXpOrbSound } from '../utils/audio';
import { SERVER_IPS } from '../data/serverData';

interface NavbarProps {
  onCopyIp: (ip: string, label: string) => void;
  copiedIp: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onCopyIp, copiedIp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playClickSound();
    }
  };

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Gamemodes', href: '#gamemodes' },
    { label: 'Tech & Architecture', href: '#developer', highlight: true },
    { label: 'Staff Team', href: '#staff' },
    { label: 'Ranks & Store', href: '#store' },
    { label: 'Player Lookup', href: '#player-lookup' },
    { label: 'Rules', href: '#rules' },
    { label: 'Vote', href: '#vote' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B1511]/95 backdrop-blur-md border-b border-[#233A2F]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark (Single text element as per Top Bar contract) */}
          <a 
            href="#hero" 
            onClick={() => playClickSound()}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#15803D] border border-[#4ADE80]/40 flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              <span className="font-pixel text-xl font-bold text-[#0B1511]">CT</span>
            </div>
            <div>
              <span className="font-pixel text-2xl font-bold text-white tracking-wide group-hover:text-[#4ADE80] transition-colors">
                Clever <span className="text-[#22C55E]">Teaching</span>
              </span>
              <div className="text-[11px] text-[#A0AEC0] flex items-center gap-1.5 font-medium -mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Java & Eaglercraft Network</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => playClickSound()}
                className={`transition-colors whitespace-nowrap hover:text-[#4ADE80] ${
                  link.highlight 
                    ? 'text-[#38BDF8] flex items-center gap-1 font-semibold' 
                    : 'text-[#CFC8B0]'
                }`}
              >
                {link.highlight && <Terminal className="w-3.5 h-3.5" />}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Zone: Copy IP, Sound Toggle, Discord */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Copy Java IP Button */}
            <button
              onClick={() => {
                onCopyIp(SERVER_IPS.java.address, 'Java Edition');
                playXpOrbSound();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#162720] hover:bg-[#1E362C] border border-[#2D4A3C] text-xs font-mono text-[#E2E8F0] transition-all hover:border-[#38A169] shadow-sm"
              title="Click to copy Java IP"
            >
              {copiedIp === SERVER_IPS.java.address ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">IP Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Java.clever-teaching.com</span>
                </>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-lg bg-[#162720] hover:bg-[#1E362C] border border-[#2D4A3C] text-[#CFC8B0] hover:text-white transition-colors"
              title={soundOn ? 'Mute Game Sounds' : 'Enable Game Sounds'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Discord CTA */}
            <a
              href="https://discord.gg/3nUm5w8VwX"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-950/40"
            >
              <DiscordIcon className="w-4 h-4" />
              <span>Discord</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-[#162720] text-[#CFC8B0]"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playClickSound();
              }}
              className="p-2 rounded-lg bg-[#162720] text-[#CFC8B0] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F1E17] border-b border-[#233A2F] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#233A2F]">
            <button
              onClick={() => {
                onCopyIp(SERVER_IPS.java.address, 'Java Edition');
                playXpOrbSound();
              }}
              className="flex items-center justify-center gap-2 p-2.5 bg-[#162720] rounded-lg border border-[#2D4A3C] text-xs font-mono text-emerald-400"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Java IP</span>
            </button>
            <button
              onClick={() => {
                onCopyIp(SERVER_IPS.eaglerMain.address, 'Eaglercraft WS');
                playXpOrbSound();
              }}
              className="flex items-center justify-center gap-2 p-2.5 bg-[#162720] rounded-lg border border-[#2D4A3C] text-xs font-mono text-sky-400"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Web IP</span>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playClickSound();
                }}
                className="px-3 py-2 rounded-md text-sm font-medium text-[#CFC8B0] hover:bg-[#1A2E24] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="https://discord.gg/3nUm5w8VwX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#5865F2] rounded-lg text-white font-semibold text-sm"
            >
              <DiscordIcon className="w-4 h-4" />
              <span>Join Official Discord Community</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
