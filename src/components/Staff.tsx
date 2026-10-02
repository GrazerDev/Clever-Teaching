import React, { useState } from 'react';
import { Shield, Disc as DiscordIcon, UserCheck, Sparkles, ExternalLink, X, Check } from 'lucide-react';
import { STAFF_MEMBERS, StaffMember } from '../data/serverData';
import { playClickSound, playLevelUpSound } from '../utils/audio';

export const Staff: React.FC = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState<string | null>(null);

  const handleCopyDiscord = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedDiscord(tag);
    playLevelUpSound();
    setTimeout(() => setCopiedDiscord(null), 2000);
  };

  return (
    <section id="staff" className="py-20 bg-[#0E1A14] border-b border-[#1E3328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-pixel font-bold text-emerald-400 tracking-widest uppercase mb-2">
              LEADERSHIP & ADMINISTRATION
            </div>
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Meet the Staff Team
            </h2>
            <p className="text-base text-[#CFC8B0] max-w-xl mt-2">
              Our dedicated staff team keeps Clever Teaching running smoothly, safely, and cheat-free around the clock.
            </p>
          </div>

          <button
            onClick={() => {
              setShowApplyModal(true);
              playClickSound();
            }}
            className="mc-button-gold px-5 py-2.5 rounded-xl font-pixel font-bold text-[#0B1511] text-sm flex items-center gap-2 self-start md:self-auto"
          >
            <UserCheck className="w-4 h-4" />
            <span>Staff Applications</span>
          </button>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {STAFF_MEMBERS.map((staff) => {
            const isLeadDev = staff.rankType === 'LEAD_DEV';
            const isOwner = staff.rankType === 'OWNER';

            return (
              <div
                key={staff.name}
                className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                  isLeadDev
                    ? 'bg-gradient-to-b from-[#183325] to-[#102219] border-emerald-400 shadow-xl shadow-emerald-950/50 -translate-y-1'
                    : isOwner
                    ? 'bg-[#15241D] border-red-500/40'
                    : 'bg-[#12201A] border-[#22382C]'
                }`}
              >
                {/* Special Highlight Ribbon for Lead Dev */}
                {isLeadDev && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-[#0B1511] text-[10px] font-pixel font-bold px-3 py-0.5 rounded-bl-lg tracking-wider">
                    HEAD DEVELOPER ⭐
                  </div>
                )}

                <div>
                  {/* Avatar & Rank badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className={`w-14 h-14 rounded-2xl bg-[#09140E] border-2 p-1 flex items-center justify-center shrink-0 shadow-md ${
                        isLeadDev ? 'border-emerald-400' : isOwner ? 'border-red-400' : 'border-[#2F4E3E]'
                      }`}
                    >
                      <img
                        src={`https://mc-heads.net/avatar/${staff.avatarSeed || staff.name}`}
                        alt={`${staff.name} Avatar`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="font-pixel text-xl font-bold text-white flex items-center gap-1.5">
                        {staff.name}
                        {isLeadDev && <Sparkles className="w-4 h-4 text-emerald-400" />}
                      </h3>
                      <div 
                        className="text-xs font-mono font-bold tracking-wide mt-0.5"
                        style={{ color: staff.tagColor }}
                      >
                        {staff.role}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#CFC8B0] leading-relaxed mb-4">
                    {staff.bio}
                  </p>
                </div>

                {/* Discord Contact Footer */}
                {staff.discord && (
                  <div className="pt-3 border-t border-[#1F362A] flex items-center justify-between text-xs">
                    <span className="text-[#8FA89B] flex items-center gap-1 font-mono text-[11px]">
                      <DiscordIcon className="w-3.5 h-3.5 text-[#5865F2]" />
                      {staff.discord}
                    </span>
                    <button
                      onClick={() => handleCopyDiscord(staff.discord || '')}
                      className="text-[10px] font-mono text-emerald-400 hover:text-white px-2 py-0.5 rounded bg-[#162720] border border-[#264233]"
                    >
                      {copiedDiscord === staff.discord ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Staff Application Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="mc-card w-full max-w-lg rounded-2xl p-6 sm:p-8 bg-[#12221A] border-2 border-emerald-500/50 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-[#233A2F] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-pixel text-2xl font-bold text-white">Join the Staff Team</h3>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="p-1 rounded-lg text-[#8FA89B] hover:text-white hover:bg-[#1E362C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#CFC8B0] leading-relaxed">
                <p>
                  We are actively recruiting passionate moderators and helper staff for our growing community.
                </p>

                <div className="bg-[#0B1511] p-4 rounded-xl border border-[#233A2F] space-y-2">
                  <div className="font-mono text-xs font-bold text-emerald-400 uppercase">
                    Minimum Requirements:
                  </div>
                  <ul className="space-y-1.5 list-disc list-inside text-xs">
                    <li>Must be at least 14 years of age</li>
                    <li>Active on Clever Teaching for at least 2 weeks</li>
                    <li>No active mutes, warnings, or ban history</li>
                    <li>Working microphone and Discord account</li>
                    <li>Mature, helpful, and patient demeanor</li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <a
                    href="https://discord.gg/3nUm5w8VwX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mc-button-green py-3 rounded-lg text-white font-pixel font-bold text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    <span>Open Staff Ticket in Discord</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="w-full py-2.5 rounded-lg bg-[#162720] border border-[#233A2F] text-xs text-[#8FA89B] hover:text-white"
                  >
                    Close
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
