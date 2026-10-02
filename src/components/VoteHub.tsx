import React, { useState } from 'react';
import { ThumbsUp, Gift, ExternalLink, Flame, Trophy, Check } from 'lucide-react';
import { VOTE_SITES } from '../data/serverData';
import { playClickSound, playLevelUpSound } from '../utils/audio';

export const VoteHub: React.FC = () => {
  const [streakDays, setStreakDays] = useState(7);
  const [votedSites, setVotedSites] = useState<Record<string, boolean>>({});

  const handleVote = (name: string, url: string) => {
    playLevelUpSound();
    setVotedSites((prev) => ({ ...prev, [name]: true }));
    window.open(url, '_blank');
  };

  const calculatedRewards = {
    keys: streakDays * 4,
    coins: streakDays * 2000,
    tokens: Math.floor(streakDays / 7) * 5 + streakDays,
    rankVouchers: streakDays >= 30 ? 1 : 0,
  };

  return (
    <section id="vote" className="py-20 bg-[#0B1511] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-pixel font-bold text-amber-400 tracking-widest uppercase mb-2">
              FREE IN-GAME REWARDS & CRATE KEYS
            </div>
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Vote for Clever Teaching
            </h2>
            <p className="text-base text-[#CFC8B0] max-w-xl mt-2">
              Voting takes less than 30 seconds and gives you free Vote Crate keys, in-game coins, and boosts on all gamemodes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-[#12221A] px-4 py-2 rounded-xl border border-[#233A2F]">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Top Voter of Month Wins: <strong>$50 Store Voucher</strong></span>
          </div>
        </div>

        {/* Voting Sites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {VOTE_SITES.map((site) => {
            const hasVoted = votedSites[site.name];

            return (
              <div
                key={site.name}
                className="p-5 rounded-2xl bg-[#12221A] border-2 border-[#20362A] hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#8FA89B]">VOTE SITE</span>
                    <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  </div>

                  <h3 className="font-pixel text-lg font-bold text-white mb-2">
                    {site.name}
                  </h3>

                  <div className="text-xs text-[#CFC8B0] bg-[#0E1A14] p-2.5 rounded-lg border border-[#1A2E23] mb-4">
                    <span className="text-emerald-400 font-bold">Reward: </span>
                    {site.reward}
                  </div>
                </div>

                <button
                  onClick={() => handleVote(site.name, site.url)}
                  className={`w-full py-2.5 rounded-lg font-pixel text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    hasVoted
                      ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                      : 'mc-button-green text-white'
                  }`}
                >
                  {hasVoted ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Voted Today</span>
                    </>
                  ) : (
                    <>
                      <span>Vote Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Voting Streak Calculator */}
        <div className="mc-card rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#15251D] to-[#0E1A14] border-2 border-[#274636]">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                <Trophy className="w-4 h-4" />
                <span>VOTE STREAK MULTIPLIER CALCULATOR</span>
              </div>
              <h3 className="font-pixel text-2xl sm:text-3xl font-bold text-white">
                Calculate Your Monthly Voting Bounty
              </h3>
              <p className="text-xs sm:text-sm text-[#CFC8B0] leading-relaxed">
                The longer your consecutive daily voting streak, the more mythic crate keys and rank upgrade vouchers you unlock automatically in-game.
              </p>

              {/* Day Slider */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-white">
                  <span>Simulated Consecutive Streak:</span>
                  <span className="text-emerald-400 font-bold font-pixel text-base">{streakDays} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={streakDays}
                  onChange={(e) => {
                    setStreakDays(Number(e.target.value));
                    playClickSound();
                  }}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>1 Day</span>
                  <span>7 Days</span>
                  <span>14 Days</span>
                  <span>30 Days (Max)</span>
                </div>
              </div>
            </div>

            {/* Calculated Results Box */}
            <div className="w-full lg:w-96 bg-[#08100C] p-5 rounded-xl border border-[#1E3328] space-y-3">
              <div className="text-xs font-mono text-emerald-400 font-bold border-b border-[#1A2E23] pb-2">
                EARNED IN-GAME LOOT
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-[#12221A] border border-[#1E3328]">
                  <div className="text-[10px] text-[#8FA89B]">VOTE CRATE KEYS</div>
                  <div className="font-pixel text-xl font-bold text-white tabular-nums">
                    {calculatedRewards.keys}x Keys
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#12221A] border border-[#1E3328]">
                  <div className="text-[10px] text-[#8FA89B]">SERVER COINS</div>
                  <div className="font-pixel text-xl font-bold text-amber-300 tabular-nums">
                    ${calculatedRewards.coins.toLocaleString()}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#12221A] border border-[#1E3328]">
                  <div className="text-[10px] text-[#8FA89B]">BLACK MARKET TOKENS</div>
                  <div className="font-pixel text-xl font-bold text-purple-300 tabular-nums">
                    {calculatedRewards.tokens}x Tokens
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#12221A] border border-[#1E3328]">
                  <div className="text-[10px] text-[#8FA89B]">RANK UPGRADE PASS</div>
                  <div className="font-pixel text-xl font-bold text-emerald-300">
                    {calculatedRewards.rankVouchers > 0 ? '1x Voucher' : '30d Streak'}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#8FA89B] text-center pt-1">
                Rewards are dispatched automatically using your in-game username when voting!
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
