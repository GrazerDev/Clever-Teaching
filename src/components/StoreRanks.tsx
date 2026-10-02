import React, { useState } from 'react';
import { ShoppingCart, Check, Star, ExternalLink, Zap, Gift, ShieldAlert } from 'lucide-react';
import { RANKS, Rank } from '../data/serverData';
import { playClickSound, playLevelUpSound } from '../utils/audio';

export const StoreRanks: React.FC = () => {
  const [selectedRank, setSelectedRank] = useState<Rank>(RANKS[2]); // default to MVP
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <section id="store" className="py-20 bg-[#0B1511] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-pixel font-bold text-amber-400 tracking-widest uppercase mb-2">
              SUPPORT THE NETWORK
            </div>
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Premium Ranks & Store
            </h2>
            <p className="text-base text-[#CFC8B0] max-w-xl mt-2">
              Unlock exclusive chat prefixes, private vaults, cosmetics, and monthly crate keys. All purchases directly fund server infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setShowMatrix(!showMatrix);
                playClickSound();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#162720] hover:bg-[#1E362C] border border-[#2D4A3C] text-xs font-pixel font-bold text-slate-200 transition-colors"
            >
              {showMatrix ? 'Hide Comparison' : 'Compare All Perks'}
            </button>

            <a
              href="https://store.clever-teaching.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="mc-button-gold px-6 py-2.5 rounded-xl font-pixel font-bold text-[#0B1511] text-sm flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Official Store</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Ranks Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
          {RANKS.map((rank) => {
            const isSelected = selectedRank.name === rank.name;

            return (
              <div
                key={rank.name}
                onClick={() => {
                  setSelectedRank(rank);
                  playClickSound();
                }}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer relative ${
                  rank.popular
                    ? 'bg-gradient-to-b from-[#1E2E42] to-[#12201B] border-blue-500 shadow-xl shadow-blue-950/40 -translate-y-1.5'
                    : isSelected
                    ? 'bg-[#183024] border-emerald-400'
                    : 'bg-[#12201A] border-[#20362A] hover:border-[#2D4C3A]'
                }`}
              >
                {rank.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-500 text-white font-pixel text-[10px] font-bold tracking-wider uppercase shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 
                      className="font-pixel text-2xl font-bold tracking-wide"
                      style={{ color: rank.color }}
                    >
                      {rank.name}
                    </h3>
                    <Star className="w-4 h-4" style={{ color: rank.color }} />
                  </div>

                  <div className="text-2xl font-bold text-white font-pixel mb-1">
                    {rank.price}
                    <span className="text-[11px] font-sans font-normal text-slate-400 ml-1">/ lifetime</span>
                  </div>

                  <p className="text-[11px] text-[#A0AEC0] mb-4 min-h-[32px]">
                    {rank.tagline}
                  </p>

                  <div className="space-y-2 border-t border-[#1F362A] pt-4 mb-4">
                    {rank.perks.slice(0, 4).map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-[#E2E8F0]">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{perk}</span>
                      </div>
                    ))}
                    {rank.perks.length > 4 && (
                      <div className="text-[11px] font-mono text-emerald-400">
                        + {rank.perks.length - 4} more perks...
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href="https://store.clever-teaching.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-lg text-center font-pixel text-xs font-bold transition-all mc-button-green text-white"
                >
                  Buy Rank
                </a>
              </div>
            );
          })}
        </div>

        {/* Detailed Rank Perk Comparison Matrix Modal */}
        {showMatrix && (
          <div className="mc-card rounded-2xl p-6 sm:p-8 bg-[#12221A] border-2 border-emerald-500/40 mb-10 overflow-x-auto">
            <h3 className="font-pixel text-2xl font-bold text-white mb-4">
              Comprehensive Rank Perk Breakdown
            </h3>
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-[#233A2F] text-[#8FA89B] font-mono">
                  <th className="py-3 px-4">PERK / CAPABILITY</th>
                  <th className="py-3 px-4 text-emerald-400">VIP</th>
                  <th className="py-3 px-4 text-cyan-400">VIP+</th>
                  <th className="py-3 px-4 text-blue-400">MVP</th>
                  <th className="py-3 px-4 text-purple-400">MVP+</th>
                  <th className="py-3 px-4 text-amber-400">CUSTOM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B3026] text-slate-200">
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Hub Flight (`/fly`)</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Priority Server Queue Slot</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Private Player Vaults (`/pv`)</td>
                  <td className="py-2.5 px-4 font-mono">2 Vaults</td>
                  <td className="py-2.5 px-4 font-mono">4 Vaults</td>
                  <td className="py-2.5 px-4 font-mono">8 Vaults</td>
                  <td className="py-2.5 px-4 font-mono">14 Vaults</td>
                  <td className="py-2.5 px-4 font-mono text-amber-300">Unlimited (30)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Monthly Mythic Crate Keys</td>
                  <td className="py-2.5 px-4 font-mono">1x</td>
                  <td className="py-2.5 px-4 font-mono">2x</td>
                  <td className="py-2.5 px-4 font-mono">4x</td>
                  <td className="py-2.5 px-4 font-mono">8x</td>
                  <td className="py-2.5 px-4 font-mono text-amber-300">15x Keys</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Custom Nickname Command (`/nick`)</td>
                  <td className="py-2.5 px-4 text-slate-500">—</td>
                  <td className="py-2.5 px-4 text-slate-500">—</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Keep EXP on Death (Survival)</td>
                  <td className="py-2.5 px-4 text-slate-500">—</td>
                  <td className="py-2.5 px-4 text-slate-500">—</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                  <td className="py-2.5 px-4 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">Prison Auto-Sell Multiplier</td>
                  <td className="py-2.5 px-4 text-slate-500">1.0x</td>
                  <td className="py-2.5 px-4 text-slate-500">1.25x</td>
                  <td className="py-2.5 px-4 text-emerald-400">1.5x</td>
                  <td className="py-2.5 px-4 text-purple-400">2.0x</td>
                  <td className="py-2.5 px-4 text-amber-300 font-bold">3.0x</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Store Trust & Security Banner */}
        <div className="p-4 rounded-xl bg-[#12221A] border border-[#233A2F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA89B]">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant In-Game Delivery within 60 seconds after checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by Tebex / CraftingStore</span>
            <span className="text-[#3A5247]">|</span>
            <span className="text-emerald-400 font-semibold">Secure PayPal, Stripe, Paysafecard</span>
          </div>
        </div>

      </div>
    </section>
  );
};
