import React, { useState } from 'react';
import { ShieldAlert, Search, AlertTriangle, ExternalLink, HelpCircle } from 'lucide-react';
import { RULES } from '../data/serverData';
import { playClickSound } from '../utils/audio';

export const Rules: React.FC = () => {
  const [activeSection, setActiveSection] = useState(RULES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentSection = RULES.find((s) => s.id === activeSection) || RULES[0];

  const filteredRules = currentSection.rules.filter(
    (r) => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="rules" className="py-20 bg-[#0E1A14] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-pixel font-bold text-red-400 tracking-widest uppercase mb-2">
              COMMUNITY INTEGRITY & STANDARDS
            </div>
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Rules & Punishments
            </h2>
            <p className="text-base text-[#CFC8B0] max-w-xl mt-2">
              Strictly enforced by our staff team and automated Sentinel Anti-Cheat to maintain a safe, fair, and fun environment.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rule (e.g. x-ray, grief)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#12221A] border border-[#233A2F] text-xs text-white focus:outline-none focus:border-red-400 font-mono"
            />
            <Search className="w-4 h-4 text-[#8FA89B] absolute left-3 top-3" />
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#1E3328] pb-4">
          {RULES.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                playClickSound();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-pixel font-bold transition-all ${
                activeSection === section.id
                  ? 'bg-red-500/20 border border-red-500 text-red-300 shadow-md'
                  : 'bg-[#12221A] border border-[#1E3328] text-[#8FA89B] hover:text-white'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {filteredRules.map((rule, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[#12221A] border border-[#233A2F] space-y-3 hover:border-red-500/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-pixel text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{rule.title}</span>
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#CFC8B0] leading-relaxed">
                {rule.desc}
              </p>

              <div className="pt-2 border-t border-[#1C3225] flex items-center justify-between text-xs">
                <span className="text-[#8FA89B] font-mono text-[11px]">Penalty Scale:</span>
                <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-500/30 text-red-300 font-mono text-[11px] font-bold">
                  {rule.penalty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Appeals Help Banner */}
        <div className="mc-card rounded-2xl p-6 bg-gradient-to-r from-[#1E251E] to-[#12201A] border-2 border-[#2D4537] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-pixel text-xl font-bold text-white">Were You Punished Unfairly?</h3>
              <p className="text-xs text-[#CFC8B0] mt-0.5">
                Staff punishments can be appealed through our official Discord server. Tickets are reviewed within 24 hours.
              </p>
            </div>
          </div>

          <a
            href="https://discord.gg/3nUm5w8VwX"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="mc-button-gold px-6 py-2.5 rounded-xl font-pixel font-bold text-[#0B1511] text-xs flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Open Appeal Ticket</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
