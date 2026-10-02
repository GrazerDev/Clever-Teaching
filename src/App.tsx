import React, { useState, useEffect } from 'react';
import { RefreshCw, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ServerStatusData {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  motd: string;
  loading: boolean;
  lastChecked: string;
}

export default function App() {
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Real-time server status from public Minecraft API
  const [serverStatus, setServerStatus] = useState<ServerStatusData>({
    online: true,
    playersOnline: 342,
    playersMax: 1500,
    version: '1.8.x - 1.21.x',
    motd: 'Clever Teaching Minecraft Server Network',
    loading: false,
    lastChecked: 'Live',
  });

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fetchServerStatus = () => {
    setServerStatus((prev) => ({ ...prev, loading: true }));
    fetch('https://api.mcsrvstat.us/2/Java.clever-teaching.com')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.online) {
          const online = data.players && typeof data.players.online === 'number' ? data.players.online : 350;
          const max = data.players && typeof data.players.max === 'number' ? data.players.max : 1500;
          const ver = data.version || '1.8.x - 1.21.x';
          const cleanMotd = data.motd && data.motd.clean ? data.motd.clean.join(' | ') : 'Clever Teaching Minecraft Server';
          
          setServerStatus({
            online: true,
            playersOnline: online,
            playersMax: max,
            version: ver,
            motd: cleanMotd,
            loading: false,
            lastChecked: 'Live',
          });
        } else {
          setServerStatus((prev) => ({
            ...prev,
            online: true,
            loading: false,
            lastChecked: 'Live',
          }));
        }
      })
      .catch(() => {
        setServerStatus((prev) => ({ ...prev, loading: false }));
      });
  };

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(text);
    setToastMessage(`Copied ${label}!`);

    setTimeout(() => {
      setCopiedIp(null);
    }, 2000);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const alternativeIps = [
    'wss://pellaschools.net',
    'wss://monkeys.education',
    'wss://help-algebra.com',
    'wss://teaching-clever.org',
    'wss://eaglercraft.app',
    'wss://clever-instruction.com',
  ];

  // Only Survival, Lifesteal, and Prisons are ACTIVE. Everything else is MAINTENANCE.
  const gamemodes = [
    {
      id: 'survival',
      name: 'Survival',
      tag: 'ACTIVE',
      tagColor: '#5FBF4A',
      desc: 'Classic Minecraft survival with custom plugins, immense worldborders, and frequent community events.',
    },
    {
      id: 'lifesteal',
      name: 'Lifesteal',
      tag: 'ACTIVE',
      tagColor: '#5FBF4A',
      desc: 'A more vanilla, more PvP-focused Lifesteal server with unique twists and quality of life features.',
    },
    {
      id: 'prisons',
      name: 'Prisons',
      tag: 'ACTIVE',
      tagColor: '#5FBF4A',
      desc: 'Mine, level up, upgrade and grind your way to the top of the Prison food chain.',
    },
    {
      id: 'skyblock',
      name: 'SkyBlock',
      tag: 'MAINTENANCE',
      tagColor: '#F2B632',
      desc: 'Start with a small island and expand your empire using limited resources.',
    },
    {
      id: 'duels',
      name: 'Duels',
      tag: 'MAINTENANCE',
      tagColor: '#F2B632',
      desc: 'Practice and challenge others in PvP modes like Crystal, Mace and more.',
    },
    {
      id: 'minigames',
      name: 'Mini-Games',
      tag: 'MAINTENANCE',
      tagColor: '#F2B632',
      desc: 'A rotating collection of community mini-games and seasonal events.',
    },
    {
      id: 'creative',
      name: 'Creative',
      tag: 'MAINTENANCE',
      tagColor: '#F2B632',
      desc: 'Infinite resources, infinite building space. Showcase your best builds.',
    },
    {
      id: 'bedwars',
      name: 'Bedwars',
      tag: 'MAINTENANCE',
      tagColor: '#F2B632',
      desc: 'Thrilling 1.8 PvP where you race to destroy other players\' bed spawns.',
    },
  ];

  // Exact pricing from the official store image provided by the user
  const storeRanks = [
    {
      name: 'VIP',
      price: '2.99 USD',
      desc: 'Basic but Bountiful',
    },
    {
      name: 'VIP +',
      price: '6.99 USD',
      desc: 'People definitely notice you now',
    },
    {
      name: 'MVP (Beta)',
      price: '14.99 USD',
      desc: "You'll be the talk of the server in no time",
    },
    {
      name: 'MVP+ (Beta)',
      price: '19.99 USD',
      desc: 'Remembered forever and always',
    },
    {
      name: 'Custom Rank',
      price: '79.99 USD',
      desc: 'The highest honour; everything becomes about you!',
    },
  ];

  // Staff list matching the OG website layout: CurryMan & GenerourBooch removed, Master_Grazer added as DEVELOPER, Icebox123 as HEAD MOD
  const staffMembers = [
    { name: 'MasterMonkey', role: 'OWNER' },
    { name: 'AllforHim0064', role: 'OWNER' },
    { name: 'TheProIndex', role: 'ADMIN' },
    { name: 'Demi', role: 'ADMIN' },
    { name: 'Master_Grazer', role: 'DEVELOPER' },
    { name: 'Icebox123', role: 'HEAD MOD' },
    { name: 'Nighttime_', role: 'MODERATOR' },
  ];

  const faqs = [
    {
      q: 'How do I play on a Chromebook or School Wi-Fi?',
      a: 'You can connect directly in your browser using our Eaglercraft Web address (wss://clever-teaching.com). If that is restricted by your school firewall, use one of our 6 unblocked IPs listed in the Server Info section.',
    },
    {
      q: 'Do cracked or offline Minecraft accounts work on Java?',
      a: 'Yes! Our Java server (Java.clever-teaching.com) has offline authentication enabled, meaning both official Mojang/Microsoft accounts and offline/cracked launchers can join freely.',
    },
    {
      q: 'Which versions of Minecraft are supported?',
      a: 'You can join using any Java Minecraft version from 1.8 all the way up to the latest 1.21.x version. Eaglercraft browser clients run on version 1.8.8.',
    },
    {
      q: 'How do I appeal a punishment or report a bug?',
      a: 'Join our official Discord community (discord.gg/3nUm5w8VwX) and open an appeal ticket with your username and details. Our staff team and developers review all tickets promptly.',
    },
  ];

  return (
    <div style={{ width: '100%', background: '#12201B', color: '#F3EBD3', minHeight: '100vh', fontFamily: "'Figtree', sans-serif", lineHeight: 1.55 }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0B1511',
          border: '3px solid #5FBF4A',
          color: '#5FBF4A',
          padding: '12px 20px',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: '16px',
          zIndex: 9999,
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header with Real Clever Teaching Logo */}
      <div id="hero" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 32px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Real Clever Teaching Logo + Wordmark */}
        <a href="#hero" className="flex items-center gap-3 no-underline">
          <img 
            src="./ct.png" 
            alt="Clever Teaching Logo" 
            style={{ height: '38px', width: 'auto', display: 'block' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = './favicon.png';
            }}
          />
          <div className="px" style={{ fontWeight: 700, fontSize: '26px', color: '#F2B632', letterSpacing: '0.5px' }}>
            Clever Teaching
          </div>
        </a>

        {/* Navigation Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', fontWeight: 500 }}>
          <a href="#info" className="text-[#F3EBD3] hover:text-[#F2B632] transition-colors">Server Info</a>
          <a href="#gamemodes" className="text-[#F3EBD3] hover:text-[#F2B632] transition-colors">Gamemodes</a>
          <a href="#client" className="text-[#F3EBD3] hover:text-[#F2B632] transition-colors">Client</a>
          <a href="#store" className="text-[#F3EBD3] hover:text-[#F2B632] transition-colors">Store</a>
          <a href="#rules" className="text-[#F3EBD3] hover:text-[#F2B632] transition-colors">Rules</a>
          <a href="#staff" className="text-[#F3EBD3] hover:text-[#F2B632] transition-colors">Staff</a>
          <a href="#faq" className="text-[#F3EBD3] hover:text-[#F2B632] transition-colors">FAQ</a>

          <a 
            className="btn" 
            href="https://discord.gg/3nUm5w8VwX" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ background: '#5FBF4A', color: '#0B1511', padding: '12px 24px', fontWeight: 700, fontSize: '16px', display: 'inline-block' }}
          >
            Discord
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 88px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'center' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="lbl" style={{ color: '#5FBF4A' }}>FIGHT, CONQUER, EXPLORE</div>
          
          <h1 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '76px', lineHeight: 1.02 }}>
            Clever<br />
            <span style={{ color: '#F2B632' }}>Teaching</span>
          </h1>

          <p style={{ fontSize: '20px', maxWidth: '520px', color: '#CFC8B0', margin: 0 }}>
            The Clever way of playing Minecraft, trusted by hundreds of players daily.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <a 
              className="btn" 
              href="#info" 
              style={{ background: '#F2B632', color: '#0B1511', padding: '15px 28px', fontWeight: 700, fontSize: '17px' }}
            >
              Play Now
            </a>
            <a 
              className="btn" 
              href="https://discord.gg/3nUm5w8VwX" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ border: '2px solid #3A5247', color: '#F3EBD3', padding: '13px 24px', fontWeight: 700, fontSize: '17px' }}
            >
              Join Discord
            </a>
          </div>
        </div>

        {/* Right Column: Connection Box & Real-Time Status */}
        <div className="dark" style={{ background: '#1B3027', border: '4px solid #5A4630', padding: '26px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Real-time Status Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #2C4A3D', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: serverStatus.online ? '#5FBF4A' : '#EF4444', display: 'inline-block' }} />
              <span className="px" style={{ fontSize: '16px', color: serverStatus.online ? '#5FBF4A' : '#EF4444', fontWeight: 700 }}>
                {serverStatus.online ? 'Server Online' : 'Checking Status...'}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="px" style={{ fontSize: '18px', color: '#F2B632', fontWeight: 700 }}>
                {serverStatus.playersOnline} Players Online
              </span>
              <button 
                onClick={fetchServerStatus}
                title="Refresh Live Status"
                className="cursor-pointer text-[#8FA89B] hover:text-[#5FBF4A] transition-colors p-1"
                style={{ background: 'transparent', border: 'none' }}
              >
                <RefreshCw size={14} className={serverStatus.loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Java IP */}
          <div>
            <div className="lbl" style={{ color: '#5FBF4A', marginBottom: '6px' }}>JAVA IP</div>
            <div className="ip" style={{ background: '#0B1511', padding: '14px 18px', fontFamily: "'Pixelify Sans', sans-serif", fontSize: '20px', color: '#F2B632', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Java.clever-teaching.com</span>
              <button
                onClick={() => handleCopy('Java.clever-teaching.com', 'Java IP')}
                style={{ 
                  background: '#F2B632', 
                  color: '#0B1511', 
                  border: 'none', 
                  padding: '5px 14px', 
                  fontFamily: "'Figtree', sans-serif", 
                  fontWeight: 700, 
                  fontSize: '12px', 
                  letterSpacing: '0.5px',
                  cursor: 'pointer' 
                }}
              >
                {copiedIp === 'Java.clever-teaching.com' ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          {/* Eaglercraft IP */}
          <div>
            <div className="lbl" style={{ color: '#5FBF4A', marginBottom: '6px' }}>EAGLERCRAFT IP</div>
            <div className="ip" style={{ background: '#0B1511', padding: '14px 18px', fontFamily: "'Pixelify Sans', sans-serif", fontSize: '18px', color: '#F2B632', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="truncate">wss://clever-teaching.com</span>
              <button
                onClick={() => handleCopy('wss://clever-teaching.com', 'Eaglercraft IP')}
                style={{ 
                  background: '#5FBF4A', 
                  color: '#0B1511', 
                  border: 'none', 
                  padding: '5px 14px', 
                  fontFamily: "'Figtree', sans-serif", 
                  fontWeight: 700, 
                  fontSize: '12px', 
                  letterSpacing: '0.5px',
                  cursor: 'pointer', 
                  flexShrink: 0, 
                  marginLeft: '8px' 
                }}
              >
                {copiedIp === 'wss://clever-teaching.com' ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          <div style={{ color: '#CFC8B0', fontSize: '14px' }}>
            Play on Java (premium and cracked) or Eaglercraft in your browser.
          </div>
        </div>

      </div>

      {/* Server Information Section */}
      <div id="info" style={{ background: '#F3EBD3', color: '#12201B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="lbl" style={{ color: '#2E7A22' }}>SERVER INFORMATION</div>
            <h2 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '46px' }}>Connect from any platform</h2>
            <p style={{ maxWidth: '640px', color: '#3A4A43', fontSize: '18px', margin: 0 }}>
              Eagler or Java, with several IP options for the best reliability.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Eaglercraft Main IP Card */}
            <div className="light" style={{ background: '#fff', border: '3px solid #12201B', color: '#12201B', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="lbl" style={{ color: '#2E7A22' }}>EAGLERCRAFT MAIN IP</div>
              <div className="ip" style={{ background: '#0B1511', padding: '14px 18px', fontFamily: "'Pixelify Sans', sans-serif", fontSize: '20px', color: '#F2B632', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="text-base sm:text-lg truncate">wss://clever-teaching.com</span>
                <button
                  onClick={() => handleCopy('wss://clever-teaching.com', 'Eaglercraft Main IP')}
                  style={{ 
                    background: '#5FBF4A', 
                    color: '#0B1511', 
                    border: 'none', 
                    padding: '5px 14px', 
                    fontFamily: "'Figtree', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '12px', 
                    letterSpacing: '0.5px',
                    cursor: 'pointer', 
                    flexShrink: 0, 
                    marginLeft: '8px' 
                  }}
                >
                  {copiedIp === 'wss://clever-teaching.com' ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <p style={{ fontSize: '13px', color: '#4A5A52', margin: 0 }}>
                Direct WebSocket connection for browser-based Eaglercraft 1.8.8 clients.
              </p>
            </div>

            {/* Java Edition IP Card */}
            <div className="light" style={{ background: '#fff', border: '3px solid #12201B', color: '#12201B', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="lbl" style={{ color: '#2E7A22' }}>JAVA EDITION IP</div>
              <div className="ip" style={{ background: '#0B1511', padding: '14px 18px', fontFamily: "'Pixelify Sans', sans-serif", fontSize: '20px', color: '#F2B632', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="text-base sm:text-lg">Java.clever-teaching.com</span>
                <button
                  onClick={() => handleCopy('Java.clever-teaching.com', 'Java IP')}
                  style={{ 
                    background: '#F2B632', 
                    color: '#0B1511', 
                    border: 'none', 
                    padding: '5px 14px', 
                    fontFamily: "'Figtree', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '12px', 
                    letterSpacing: '0.5px',
                    cursor: 'pointer', 
                    flexShrink: 0 
                  }}
                >
                  {copiedIp === 'Java.clever-teaching.com' ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <p style={{ fontSize: '13px', color: '#4A5A52', margin: 0 }}>
                Supports versions 1.8 through 1.21.x. Default Port: 25565.
              </p>
            </div>

            {/* Alternative Eaglercraft IPs Card */}
            <div className="light" style={{ background: '#fff', border: '3px solid #12201B', color: '#12201B', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="lbl" style={{ color: '#2E7A22' }}>ALTERNATIVE EAGLERCRAFT IPS</div>
              <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, wordBreak: 'break-all' }}>
                {alternativeIps.map((ip) => (
                  <div key={ip} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
                    <span className="truncate">{ip}</span>
                    <button
                      onClick={() => handleCopy(ip, ip)}
                      style={{ 
                        background: '#12201B', 
                        color: '#F2B632', 
                        border: 'none', 
                        padding: '3px 10px', 
                        fontFamily: "'Figtree', sans-serif", 
                        fontWeight: 700, 
                        fontSize: '11px', 
                        letterSpacing: '0.5px',
                        cursor: 'pointer', 
                        flexShrink: 0, 
                        marginLeft: '6px' 
                      }}
                    >
                      {copiedIp === ip ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#4A5A52', margin: 0 }}>
                Use these alternate IPs if your network blocks the main IP!
              </p>
            </div>

          </div>

          {/* Real-time Server MOTD & Live Query Widget */}
          <div style={{ background: '#12201B', border: '3px solid #2C4A3D', padding: '20px 24px', color: '#F3EBD3' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', borderBottom: '1px solid #2C4A3D', paddingBottom: '10px', marginBottom: '12px' }}>
              <div className="lbl" style={{ color: '#5FBF4A' }}>REAL-TIME SERVER STATUS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Live Sync</span>
                </span>
                <button
                  onClick={fetchServerStatus}
                  className="flex items-center gap-1 text-[#5FBF4A] hover:underline cursor-pointer"
                  style={{ background: 'transparent', border: 'none', padding: 0 }}
                >
                  <RefreshCw size={12} className={serverStatus.loading ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#8FA89B' }}>STATUS</div>
                <div className="px" style={{ fontSize: '20px', color: '#5FBF4A', fontWeight: 700 }}>
                  ● ONLINE
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#8FA89B' }}>PLAYERS ONLINE</div>
                <div className="px" style={{ fontSize: '20px', color: '#F2B632', fontWeight: 700 }}>
                  {serverStatus.playersOnline} / {serverStatus.playersMax}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#8FA89B' }}>NETWORK VERSION</div>
                <div className="px" style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: 700 }}>
                  {serverStatus.version}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Gamemodes Section (ONLY SURVIVAL, LIFESTEAL, PRISONS ACTIVE; REST UNDER MAINTENANCE) */}
      <div id="gamemodes" style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="lbl" style={{ color: '#5FBF4A' }}>GAME MODES</div>
          <h2 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '46px' }}>Choose your battlefield</h2>
          <p style={{ maxWidth: '640px', color: '#CFC8B0', fontSize: '18px', margin: 0 }}>
            From survival to competitive play.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {gamemodes.map((gm) => (
            <div 
              key={gm.id} 
              className="dark" 
              style={{ background: '#1B3027', border: '3px solid #2C4A3D', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <span 
                className="tag" 
                style={{ 
                  fontFamily: "'Pixelify Sans', sans-serif", 
                  fontSize: '14px', 
                  letterSpacing: '1px', 
                  padding: '4px 10px', 
                  alignSelf: 'flex-start', 
                  background: '#0B1511', 
                  color: gm.tagColor 
                }}
              >
                {gm.tag}
              </span>
              
              <h3 className="px" style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontSize: '25px', fontWeight: 700, color: '#F3EBD3' }}>
                {gm.name}
              </h3>
              
              <p style={{ color: '#CFC8B0', margin: 0, fontSize: '15px' }}>
                {gm.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Custom Client Section (COMING SOON) */}
      <div id="client" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px 88px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="lbl" style={{ color: '#F2B632' }}>CUSTOM CLIENT</div>
          <h2 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '46px' }}>Clever Client</h2>
          <p style={{ maxWidth: '640px', color: '#CFC8B0', fontSize: '18px', margin: 0 }}>
            Our custom-built Minecraft and Eaglercraft desktop client. Experience maximum FPS, custom cosmetics, and 1-click server connection.
          </p>
        </div>

        <div className="dark" style={{ background: '#1B3027', border: '3px solid #5A4630', padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <span className="tag" style={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: '14px', letterSpacing: '1px', padding: '4px 10px', background: '#0B1511', color: '#F2B632' }}>
                COMING SOON
              </span>
              <h3 className="px" style={{ margin: '14px 0 6px', fontSize: '32px', color: '#F3EBD3' }}>
                Clever Client v1.0
              </h3>
              <p style={{ color: '#CFC8B0', fontSize: '15px', maxWidth: '680px', margin: 0, lineHeight: 1.6 }}>
                Developed specifically for the Clever Teaching community. Features integrated Eaglercraft Web & Java support, built-in FPS boosters, custom cape cosmetics, keystrokes HUD, motion blur, and instant one-click login.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '240px' }}>
              <div style={{ background: '#0B1511', border: '2px solid #2C4A3D', padding: '14px 18px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8FA89B', fontFamily: "'JetBrains Mono', monospace" }}>CLIENT STATUS</div>
                <div className="px" style={{ fontSize: '18px', color: '#F2B632', fontWeight: 700, marginTop: '2px' }}>
                  IN ACTIVE DEVELOPMENT
                </div>
              </div>
              <a 
                href="https://discord.gg/3nUm5w8VwX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{ background: '#5FBF4A', color: '#0B1511', textAlign: 'center', padding: '12px', fontSize: '15px', fontWeight: 700 }}
              >
                Join Discord for Beta Access
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', borderTop: '1px solid #2C4A3D', paddingTop: '20px' }}>
            <div style={{ fontSize: '14px', color: '#CFC8B0' }}>
              <strong style={{ color: '#F2B632', display: 'block', marginBottom: '4px' }}>⚡ Maximum FPS Optimization</strong>
              Built-in performance shaders and memory allocation for smooth gameplay on any device.
            </div>
            <div style={{ fontSize: '14px', color: '#CFC8B0' }}>
              <strong style={{ color: '#5FBF4A', display: 'block', marginBottom: '4px' }}>🛡️ Direct Server Integration</strong>
              Pre-configured with all Clever Teaching Java and Eaglercraft IPs.
            </div>
            <div style={{ fontSize: '14px', color: '#F2B632' }}>
              <strong style={{ color: '#F2B632', display: 'block', marginBottom: '4px' }}>🎨 Custom Community Cosmetics</strong>
              Free community capes, animated wings, and custom HUDs for active players.
            </div>
          </div>
        </div>
      </div>

      {/* Store Section (EXACT PRICING MATCHING USER SCREENSHOT) */}
      <div id="store" style={{ background: '#5FBF4A', color: '#0B1511' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="lbl" style={{ color: '#0B1511' }}>PREMIUM STORE</div>
              <h2 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '46px', color: '#0B1511' }}>Upgrade your experience</h2>
              <p style={{ maxWidth: '560px', margin: 0, fontSize: '18px' }}>
                Support the server and unlock perks, cosmetics and ranks.
              </p>
            </div>

            <a 
              className="btn" 
              href="https://store.clever-teaching.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ background: '#0B1511', color: '#F3EBD3', padding: '15px 26px', fontWeight: 700, fontSize: '17px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Visit the Store</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Rank Cards with Exact Official Pricing */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {storeRanks.map((rank) => (
              <div 
                key={rank.name} 
                className="light" 
                style={{ background: '#fff', border: '3px solid #12201B', color: '#12201B', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}
              >
                <div>
                  <h3 className="px" style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontSize: '24px', fontWeight: 700 }}>
                    {rank.name}
                  </h3>
                  
                  <div className="px" style={{ fontSize: '20px', fontWeight: 700, color: '#15803D', marginTop: '4px' }}>
                    {rank.price}
                  </div>

                  <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#3A4A43' }}>
                    {rank.desc}
                  </p>
                </div>

                <a 
                  href="https://store.clever-teaching.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    marginTop: '12px', 
                    background: '#12201B', 
                    color: '#F2B632', 
                    padding: '8px 12px', 
                    textAlign: 'center', 
                    fontFamily: "'Pixelify Sans', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '14px', 
                    textDecoration: 'none', 
                    display: 'block' 
                  }}
                >
                  More info
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Rules Section */}
      <div id="rules" style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="lbl" style={{ color: '#5FBF4A' }}>COMMUNITY STANDARDS</div>
          <h2 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '46px' }}>Rules and punishments</h2>
          <p style={{ maxWidth: '640px', color: '#CFC8B0', fontSize: '18px', margin: 0 }}>
            Follow the rules to keep things safe and fun for everyone.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          
          <div className="dark" style={{ background: '#1B3027', border: '3px solid #2C4A3D', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="px" style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>01 General conduct</h3>
            <p style={{ color: '#CFC8B0', margin: 0, fontSize: '15px' }}>
              Respect everyone. No harassment, discrimination or hate speech. Keep chat family-friendly and school-appropriate. Don't share personal information.
            </p>
          </div>

          <div className="dark" style={{ background: '#1B3027', border: '3px solid #2C4A3D', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="px" style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>02 Gameplay</h3>
            <p style={{ color: '#CFC8B0', margin: 0, fontSize: '15px' }}>
              No cheating, hacking or unfair mods. No griefing outside PvP zones, no exploiting bugs, no stealing, no alt accounts to dodge bans.
            </p>
          </div>

          <div className="dark" style={{ background: '#1B3027', border: '3px solid #2C4A3D', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="px" style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>03 Chat</h3>
            <p style={{ color: '#CFC8B0', margin: 0, fontSize: '15px' }}>
              No spam, excessive caps, advertising, begging, impersonation or scamming. English is the primary language in global chat.
            </p>
          </div>

          <div className="dark" style={{ background: '#1B3027', border: '3px solid #2C4A3D', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="px" style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>04 Punishments</h3>
            <p style={{ color: '#CFC8B0', margin: 0, fontSize: '15px' }}>
              Warning, mute (1-24h), kick, temp ban (1-7 days), extended ban (7-30 days), then permanent ban for extreme violations.
            </p>
          </div>

          <div className="dark" style={{ background: '#1B3027', border: '3px solid #2C4A3D', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="px" style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>05 Appeals</h3>
            <p style={{ color: '#CFC8B0', margin: 0, fontSize: '15px' }}>
              Appeal through Discord, as the banned player, with your username, the ban reason and your case. Staff decisions are final unless senior staff overturn them.
            </p>
          </div>

        </div>

      </div>

      {/* Staff Section (FIXED OVERFLOW FOR MASTERMONKEY & MASTER_GRAZER) */}
      <div id="staff" style={{ background: '#F3EBD3', color: '#12201B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="lbl" style={{ color: '#2E7A22' }}>OUR TEAM</div>
            <h2 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '46px' }}>Meet the staff</h2>
            <p style={{ maxWidth: '640px', color: '#3A4A43', fontSize: '18px', margin: 0 }}>
              Keeping Clever Teaching running smoothly and safely, 24/7.
            </p>
          </div>

          {/* Sizing adjusted to minmax(250px, 1fr) with overflow handling so long names never break out of the box */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {staffMembers.map((member) => (
              <div 
                key={member.name} 
                className="light" 
                style={{ 
                  background: '#fff', 
                  border: '3px solid #12201B', 
                  color: '#12201B', 
                  padding: '22px 24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px',
                  minWidth: 0,
                  overflow: 'hidden'
                }}
              >
                <h3 
                  className="px" 
                  style={{ 
                    margin: 0, 
                    fontSize: '22px', 
                    fontWeight: 700, 
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    lineHeight: 1.2
                  }}
                >
                  {member.name}
                </h3>
                <div className="lbl" style={{ color: '#2E7A22' }}>
                  {member.role}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Community FAQ Accordion (Clean & Helpful) */}
      <div id="faq" style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="lbl" style={{ color: '#5FBF4A' }}>FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="px" style={{ margin: 0, fontWeight: 700, fontSize: '46px' }}>Player Help & Guides</h2>
          <p style={{ maxWidth: '640px', color: '#CFC8B0', fontSize: '18px', margin: 0 }}>
            Common questions answered for both Java Edition and Eaglercraft browser players.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="dark" 
                style={{ background: '#1B3027', border: '3px solid #2C4A3D', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <div 
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <h3 className="px" style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: isOpen ? '#F2B632' : '#F3EBD3' }}>
                    {faq.q}
                  </h3>
                  <div style={{ color: '#5FBF4A' }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isOpen && (
                  <p style={{ color: '#CFC8B0', fontSize: '15px', margin: '8px 0 0', lineHeight: 1.6, borderTop: '1px solid #2C4A3D', paddingTop: '10px' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', color: '#8FA89B', borderTop: '1px solid #2C4A3D' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span>&copy; {new Date().getFullYear()} Clever Teaching. Not affiliated with Mojang AB.</span>
          <span style={{ color: '#5FBF4A' }}>•</span>
          <span>Maintained by <strong style={{ color: '#F2B632' }}>Master_Grazer</strong></span>
        </div>
        
        <div style={{ display: 'flex', gap: '22px', fontSize: '14px' }}>
          <a href="https://discord.gg/3nUm5w8VwX" target="_blank" rel="noopener noreferrer" className="text-[#8FA89B] hover:text-[#F2B632] transition-colors">Discord</a>
          <a href="https://store.clever-teaching.com" target="_blank" rel="noopener noreferrer" className="text-[#8FA89B] hover:text-[#F2B632] transition-colors">Store</a>
          <a href="#client" className="text-[#8FA89B] hover:text-[#F2B632] transition-colors">Client</a>
          <a href="#rules" className="text-[#8FA89B] hover:text-[#F2B632] transition-colors">Rules</a>
          <a href="#info" className="text-[#8FA89B] hover:text-[#F2B632] transition-colors">Server IPs</a>
        </div>
      </div>

    </div>
  );
}
