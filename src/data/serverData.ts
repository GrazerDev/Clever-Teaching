export interface Gamemode {
  id: string;
  name: string;
  tag: 'ACTIVE' | 'MAINTENANCE' | 'IN PROGRESS';
  version: string;
  description: string;
  longDescription: string;
  features: string[];
  commands: { cmd: string; desc: string }[];
  icon: string;
  badgeColor: string;
}

export interface StaffMember {
  name: string;
  role: string;
  tagColor: string;
  rankType: 'OWNER' | 'LEAD_DEV' | 'ADMIN' | 'MOD';
  discord?: string;
  bio: string;
  avatarSeed?: string;
  specialBadge?: string;
}

export interface Rank {
  name: string;
  tagline: string;
  price: string;
  popular?: boolean;
  color: string;
  badgeBg: string;
  perks: string[];
}

export interface RuleSection {
  id: string;
  title: string;
  summary: string;
  rules: { title: string; desc: string; penalty: string }[];
}

export interface DevLog {
  version: string;
  date: string;
  author: string;
  authorRole: string;
  headline: string;
  summary: string;
  improvements: string[];
  metrics: { label: string; value: string }[];
}

export const SERVER_IPS = {
  java: {
    address: 'Java.clever-teaching.com',
    port: 25565,
    versions: '1.8.x - 1.21.4 (Java + Cracked)',
  },
  eaglerMain: {
    address: 'wss://clever-teaching.com',
    description: 'Direct browser connection for Eaglercraft Web clients',
  },
  eaglerMirrors: [
    { url: 'wss://pellaschools.net', note: 'School Unblock Mirror 1' },
    { url: 'wss://monkeys.education', note: 'Fast CDN Mirror 2' },
    { url: 'wss://help-algebra.com', note: 'Educational Mask Mirror 3' },
    { url: 'wss://teaching-clever.org', note: 'Backup Proxy Mirror 4' },
    { url: 'wss://eaglercraft.app', note: 'Global Gateway Mirror 5' },
    { url: 'wss://clever-instruction.com', note: 'Low Latency Mirror 6' },
  ],
};

export const GAMEMODES: Gamemode[] = [
  {
    id: 'survival',
    name: 'Survival SMP',
    tag: 'ACTIVE',
    version: '1.20.4 - 1.21.x',
    description: 'Classic Minecraft survival enriched with custom plugins, immense 50,000 block borders, and community events.',
    longDescription: 'Our flagship Survival server delivers pure vanilla charm enhanced with balanced economic systems, land protection (`/claim`), 60+ custom enchantments, player warps, and community world boss events.',
    features: [
      'GriefDefender Land Claims - 100% grief-proof claims',
      'Player-run shops & Auction House (`/ah`)',
      '60+ Vanilla-Friendly Custom Enchantments',
      'McMMO MMO Skill Leveling (Acrobatics, Mining, Swords)',
      'Custom Seasonal Quests & Community Dragon Raids',
    ],
    commands: [
      { cmd: '/claim', desc: 'Create land claim with golden shovel' },
      { cmd: '/ah', desc: 'Browse the server-wide player auction house' },
      { cmd: '/pwarp', desc: 'Teleport to player community warps & shops' },
      { cmd: '/skills', desc: 'View your McMMO progression levels' },
    ],
    icon: 'Pickaxe',
    badgeColor: '#38A169',
  },
  {
    id: 'lifesteal',
    name: 'Lifesteal SMP',
    tag: 'ACTIVE',
    version: '1.20.x - 1.21.x',
    description: 'A vanilla-spirited, high-octane PvP Lifesteal server with custom heart recipes and quality of life features.',
    longDescription: 'Kill players to steal their permanent hearts. Lose all your hearts and get banned to the Nether for 24 hours unless a teammate crafts a Revive Beacon. Featuring custom Netherite Outpost KOTHs and active bounties.',
    features: [
      'Heart Stealing on PvP Kill (Up to 20 Max Hearts)',
      'Custom Heart Crafting & Revive Beacon Altars',
      'Netherite Outpost KOTH every 3 hours with mythic loot',
      'Player Bounty Hunter Board (`/bounty`)',
      'Anti-Combat Logging with real-time combat timer',
    ],
    commands: [
      { cmd: '/withdrawhearts <amount>', desc: 'Convert your hearts into tradeable physical items' },
      { cmd: '/bounty add <player> <amount>', desc: 'Place a bounty reward on an enemy player' },
      { cmd: '/outpost', desc: 'View current KOTH Outpost capture status & rewards' },
    ],
    icon: 'Heart',
    badgeColor: '#E53E3E',
  },
  {
    id: 'prisons',
    name: 'OP Prisons',
    tag: 'ACTIVE',
    version: '1.8.x - 1.21.x',
    description: 'Mine, level up, upgrade enchantments and grind your way to the top of the Prison food chain.',
    longDescription: 'Progress from Mine A all the way to Mine Z and unlock 10 Prestige Ranks. Features explosive pickaxe custom enchants, auto-sell backpacks, private cells, gang wars, and underground drug & contraband markets.',
    features: [
      'A to Z Themed Mines + 10 Extreme Prestige Tiers',
      'Explosive Pickaxe Enchants (Jackhammer, Laser, Nuke)',
      'Auto-Sell Smart Backpacks & Pet Multipliers',
      'Cell Building & Gang Territory Wars with cash rewards',
      'Black Market Token Trader with ultra-rare gear',
    ],
    commands: [
      { cmd: '/rankup', desc: 'Ascend to the next prison mine tier' },
      { cmd: '/prestige', desc: 'Prestige your rank once reaching Mine Z' },
      { cmd: '/enchants', desc: 'Open custom pickaxe enchantment menu' },
      { cmd: '/gang', desc: 'Create and manage your prison gang' },
    ],
    icon: 'Shield',
    badgeColor: '#DD6B20',
  },
  {
    id: 'skyblock',
    name: 'SkyBlock',
    tag: 'ACTIVE',
    version: '1.20.x',
    description: 'Start with a humble floating island and expand your empire using limited resources and automation.',
    longDescription: 'Take to the skies on an isolated island. Construct automated minion farms, conquer custom Slayer Bosses, participate in island top value rankings, and trade on the global economy.',
    features: [
      'Automated Minions (Ore, Crop, Mob, Wood collection)',
      'Custom Slayer Boss Dungeons (Revenant, Tarantula)',
      'Dynamic Island Upgrades & Co-op team management',
      'Island Top `/is top` leaderboard with monthly store credit prizes',
      'Custom Ore Generators with Cobblestone upgrades',
    ],
    commands: [
      { cmd: '/is', desc: 'Open island control panel and teleport home' },
      { cmd: '/is invite <player>', desc: 'Invite a friend to your SkyBlock island' },
      { cmd: '/is top', desc: 'Inspect top island values across the server' },
      { cmd: '/minions', desc: 'Manage your automated worker minions' },
    ],
    icon: 'Cloud',
    badgeColor: '#3182CE',
  },
  {
    id: 'duels',
    name: 'Duels & Practice',
    tag: 'ACTIVE',
    version: '1.8 - 1.21',
    description: 'Practice and challenge players in competitive PvP modes like Crystal, Mace, NoDebuff, and UHC.',
    longDescription: 'Zero-latency arena combat powered by Master_Grazer\'s custom packet tickrate optimizer. Queue up for Ranked or Unranked matches with custom kit editors, instant rematches, and live spectator cams.',
    features: [
      'Crystal PvP, Mace & Wind Charge, NoDebuff, UHC, Bow, Sumo',
      'Ranked ELO Matchmaking with seasonal leaderboards',
      'Custom Kit Editor (`/kiteditor`) with customizable hotbars',
      'Live Spectator Mode & Match Replay analysis',
      'Fight-recording stats: K/D, win rate, best streak',
    ],
    commands: [
      { cmd: '/duel <player>', desc: 'Send an instant duel challenge to a player' },
      { cmd: '/queue', desc: 'Open the ranked and casual matchmaking queue' },
      { cmd: '/spectate <player>', desc: 'Watch an active duel in spectator mode' },
    ],
    icon: 'Swords',
    badgeColor: '#9F7AEA',
  },
  {
    id: 'minigames',
    name: 'Bedwars & Mini-Games',
    tag: 'ACTIVE',
    version: '1.8.8 Preferred',
    description: 'Thrilling 1.8 fast-paced combat where you defend your bed, gather resources, and destroy enemy bases.',
    longDescription: 'Solo, Doubles, 3v3v3v3, and 4v4v4v4 Bedwars modes with custom shopkeepers, upgraded island diamond & emerald generators, victory cosmetics, and rotating party games like TNT Tag & The Bridge.',
    features: [
      'Classic 1.8.8 hit-detection & knockback mechanics',
      'Fast-acting shopkeeper with quick-buy layout',
      'Custom kill effects, projectile trails, and final kill dances',
      'Party System (`/party`) for seamless queueing with friends',
      'Weekly tournament brackets with Discord announcements',
    ],
    commands: [
      { cmd: '/bw join', desc: 'Quick-join an open Bedwars game' },
      { cmd: '/party create', desc: 'Form a party with friends' },
      { cmd: '/cosmetics', desc: 'Select your unlocked Bedwars trails & effects' },
    ],
    icon: 'Gamepad2',
    badgeColor: '#D69E2E',
  },
  {
    id: 'creative',
    name: 'Creative Plots',
    tag: 'MAINTENANCE',
    version: '1.20.4',
    description: 'Infinite building space with PlotSquared and FastAsyncWorldEdit. Upgrading for next season.',
    longDescription: 'Currently being revamped by Master_Grazer with upgraded sandbox security, custom armor stand tools, head databases, and builder showcase competitions.',
    features: [
      'Giant 64x64 mergeable player plots',
      'FastAsyncWorldEdit (FAWE) access for builder ranks',
      'Custom Heads database with 50,000+ decorative blocks',
      'Plot music & custom time/weather control',
    ],
    commands: [
      { cmd: '/plot auto', desc: 'Claim an available creative plot' },
      { cmd: '/plot home', desc: 'Teleport to your claimed plots' },
    ],
    icon: 'Sparkles',
    badgeColor: '#ECC94B',
  },
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    name: 'MasterMonkey',
    role: 'Server Owner & Founder',
    rankType: 'OWNER',
    tagColor: '#EF4444',
    bio: 'Founder of Clever Teaching. Oversees overarching vision, community growth, and server operations since day one.',
    discord: 'MasterMonkey#0001',
    avatarSeed: 'MasterMonkey',
  },
  {
    name: 'AllforHim0064',
    role: 'Server Owner & Operations',
    rankType: 'OWNER',
    tagColor: '#EF4444',
    bio: 'Co-owner managing server funding, store management, partner relations, and community safety.',
    discord: 'AllforHim#0064',
    avatarSeed: 'AllforHim0064',
  },
  {
    name: 'Master_Grazer',
    role: 'Lead Systems & Network Developer',
    rankType: 'LEAD_DEV',
    tagColor: '#10B981',
    bio: 'Head of Infrastructure, Custom Plugin Architecture, Sentinel Anti-Cheat, and High-Throughput Network Routing across Java & Eaglercraft.',
    discord: 'Master_Grazer',
    avatarSeed: 'Master_Grazer',
    specialBadge: 'HEAD DEVELOPER ⭐',
  },
  {
    name: 'TheProIndex',
    role: 'Senior Administrator',
    rankType: 'ADMIN',
    tagColor: '#F59E0B',
    bio: 'Lead in-game administrator handling player disputes, economy auditing, and staff coordination.',
    discord: 'TheProIndex#2211',
    avatarSeed: 'TheProIndex',
  },
  {
    name: 'Demi',
    role: 'Administrator & Community Lead',
    rankType: 'ADMIN',
    tagColor: '#F59E0B',
    bio: 'Manages community events, ticket escalations, player feedback, and server social channels.',
    discord: 'Demi#9982',
    avatarSeed: 'Demi',
  },
  {
    name: 'Icebox123',
    role: 'Head Moderator',
    rankType: 'MOD',
    tagColor: '#3B82F6',
    bio: 'Head Moderator overseeing chat moderation, anti-cheat surveillance, and community enforcement across all realms.',
    discord: 'Icebox123#8712',
    avatarSeed: 'Icebox123',
  },
  {
    name: 'Nighttime_',
    role: 'Server Moderator',
    rankType: 'MOD',
    tagColor: '#3B82F6',
    bio: 'Dedicated moderator maintaining a positive, family-friendly, and cheat-free environment 24/7.',
    discord: 'Nighttime_#4431',
    avatarSeed: 'Nighttime_',
  },
];

export const DEV_CHANGELOGS: DevLog[] = [
  {
    version: 'v3.2.0-PROD',
    date: 'Current Release',
    author: 'Master_Grazer',
    authorRole: 'Lead Systems & Network Developer',
    headline: 'High-Throughput Velocity Routing & Sentinel Combat Defense',
    summary: 'Engine overhaul replacing legacy Spigot network layers with a custom high-performance Netty buffer pipeline, slashing Eaglercraft WebSocket packet latency and eliminating reach & killaura exploits.',
    improvements: [
      'Sub-12ms Network Routing: Migrated to custom-tuned Velocity proxy with real-time compression for browser Eaglercraft connections.',
      'Sentinel Anti-Cheat Engine: Fully server-authoritative combat validation. Detects reach, auto-clickers, and packet timer spoofing with 0 false positives.',
      'Cross-Server Inventory Sync: Zero-delay Redis pub/sub bridge ensuring rank permissions, global economy, and friends list persist seamlessly.',
      'PaperMC Kernel Memory Optimization: Custom JVM ZGC flags maintaining rock-solid 20.0 TPS even during 100-player Crystal PvP team battles.',
      'Zero-Delay Prison Mine Resets: Asynchronous chunk packet dispatcher preventing main-thread lag when resetting massive 150x150 A-Z mines.',
    ],
    metrics: [
      { label: 'Server TPS', value: '20.0 / 20.0' },
      { label: 'Avg Network Ping', value: '14ms' },
      { label: 'Packet Throughput', value: '128K pkt/s' },
      { label: 'Max Concurrency', value: '1,500' },
    ],
  },
  {
    version: 'v3.1.4',
    date: 'Previous Patch',
    author: 'Master_Grazer',
    authorRole: 'Lead Systems & Network Developer',
    headline: 'Lifesteal SMP Balance & Custom Heart Forge Overhaul',
    summary: 'Reworked heart drop mechanics, combat tagging persistence, and introduced the Netherite Outpost KOTH automated scheduler.',
    improvements: [
      'Heart Item Duplication Patch: Patched async item frame & death event edge cases.',
      'Combat Tagging System: 15-second combat tag with spawn-point blocking preventing combat logging.',
      'KOTH Zone Automation: Added automated holographic capture zones with broadcast announcements.',
    ],
    metrics: [
      { label: 'Combat Log Exploits', value: '0%' },
      { label: 'Heart Sync Uptime', value: '100%' },
      { label: 'Event Latency', value: '<5ms' },
    ],
  },
];

export const RANKS: Rank[] = [
  {
    name: 'VIP',
    tagline: 'Basic but Bountiful - Stand out with key perks',
    price: '$4.99',
    color: '#10B981',
    badgeBg: '#064E3B',
    perks: [
      'Green [VIP] Chat Prefix & Tablist Badge',
      'Fly mode in all Hubs & Lobbies (`/fly`)',
      'Join Full Server Priority Pass (Slot bypass)',
      '1x VIP Monthly Crate Key (`/crate`)',
      'Access to 2 Private Vaults (`/pv 1-2`)',
      'Special VIP Discord Role & Chat Access',
    ],
  },
  {
    name: 'VIP+',
    tagline: 'People definitely notice you now in chat',
    price: '$9.99',
    color: '#06B6D4',
    badgeBg: '#164E63',
    perks: [
      'Cyan [VIP+] Chat Prefix with colored chat',
      'All VIP Perks Included',
      '2x VIP+ Monthly Crate Keys',
      'Access to 4 Private Vaults (`/pv 1-4`)',
      'Access to `/hat` command for any block',
      'Custom Particle Footstep Trail in hubs',
      '50% Bonus McMMO Skill EXP Boost',
    ],
  },
  {
    name: 'MVP',
    tagline: "You'll be the talk of the server in no time",
    price: '$19.99',
    popular: true,
    color: '#3B82F6',
    badgeBg: '#1E3A8A',
    perks: [
      'Royal Blue [MVP] Prefix & Glowing Tablist',
      'All VIP & VIP+ Perks Included',
      '4x MVP Monthly Crate Keys',
      'Access to 8 Private Vaults (`/pv 1-8`)',
      'Custom Nickname Command (`/nick`)',
      'Virtual Crafting Table & EnderChest (`/craft`, `/ec`)',
      'Keep EXP on Death in Survival SMP',
      'Access to Beta Gamemode Testing Server',
    ],
  },
  {
    name: 'MVP+',
    tagline: 'Remembered forever and always by the whole community',
    price: '$34.99',
    color: '#A855F7',
    badgeBg: '#581C87',
    perks: [
      'Royal Purple [MVP+] Animated Chat Prefix',
      'All Lower Tier Perks Included',
      '8x MVP+ Mythic Monthly Crate Keys',
      'Access to 14 Private Vaults (`/pv 1-14`)',
      'Custom Join & Leave Announcements in chat',
      '2x Auto-Sell Backpack multiplier in OP Prisons',
      'Full Access to all Hub Disguises & Wings',
      'Direct Priority Support in Discord tickets',
    ],
  },
  {
    name: 'CUSTOM / TITAN',
    tagline: 'The highest honour; everything becomes about you!',
    price: '$69.99',
    color: '#F59E0B',
    badgeBg: '#78350F',
    perks: [
      'Custom Choice of Prefix, Colors & Title',
      'Unlimited Private Vaults (`/pv 1-30`)',
      '15x Titan God Crate Keys monthly',
      'Personal Custom Discord Soundboard & Role',
      'Direct Chat with Developers (Master_Grazer & Owners)',
      'Custom In-Game Cosmetic Effect created for you',
      'Permanent Immunity to AFK Kick in all realms',
      'Server-wide broadcast whenever you log in',
    ],
  },
];

export const RULES: RuleSection[] = [
  {
    id: 'general',
    title: '01. General Community Conduct',
    summary: 'Treat all players with respect and keep our community friendly and safe.',
    rules: [
      {
        title: 'Respect All Players & Staff',
        desc: 'Harassment, hate speech, racism, homophobia, doxxing, or targeted bullying will result in an immediate severe ban.',
        penalty: 'Temp Ban (7-30 days) to Permanent Ban',
      },
      {
        title: 'Keep Chat School-Appropriate',
        desc: 'Clever Teaching is accessed by students, kids, and adults alike. Keep topics suitable for all ages.',
        penalty: 'Warning -> 1-24h Mute',
      },
      {
        title: 'No Advertising or Scamming',
        desc: 'Promoting external Minecraft servers, scam links, trade scams, or phishing URLs is strictly forbidden.',
        penalty: 'Permanent IP & Account Ban',
      },
    ],
  },
  {
    id: 'gameplay',
    title: '02. Fair Play & Gameplay Integrity',
    summary: 'Never use unauthorized modifications, cheats, or bugs to gain unfair advantage.',
    rules: [
      {
        title: 'No Cheating, Hacking, or Illegal Clients',
        desc: 'Killaura, reach, speed, flight, timer, X-Ray texture packs, baritone bots, and auto-clickers (>16 CPS) are strictly blocked by Sentinel Anti-Cheat.',
        penalty: 'Permanent Blacklist Ban',
      },
      {
        title: 'No Bug Exploitation or Duplication',
        desc: 'If you discover an item duplication, economy glitch, or out-of-bounds bug, report it immediately to Master_Grazer for a reward instead of abusing it.',
        penalty: 'Inventory Wipe + 30-Day Ban',
      },
      {
        title: 'No Alt Accounts to Evade Bans',
        desc: 'Logging in on a secondary account while your primary is muted or banned will double the penalty on all accounts.',
        penalty: 'Permanent IP Blacklist',
      },
      {
        title: 'No Griefing Outside PvP Realms',
        desc: 'Griefing or stealing within claimed land in Survival is prohibited. In Lifesteal, raiding is allowed.',
        penalty: 'Rollback + 3-Day Temp Ban',
      },
    ],
  },
  {
    id: 'punishments',
    title: '03. Progressive Punishments & Appeals',
    summary: 'Understand the penalty tiers and how to legitimately appeal a staff punishment.',
    rules: [
      {
        title: 'Punishment Escalation Ladder',
        desc: 'First minor offense: Warning. Second offense: 1-12h Mute. Third: 1-7d Temp Ban. Extreme/Malicious: Permanent Ban.',
        penalty: 'Progressive Escalation',
      },
      {
        title: 'How to File an Appeal',
        desc: 'Banned players can open a ticket in the official Discord (`#appeals`). Include your in-game username, ban reason, and honest context.',
        penalty: 'Reviewed within 24 hours by Admins',
      },
    ],
  },
];

export const VOTE_SITES = [
  { name: 'TopG Minecraft List', url: 'https://topg.org', reward: '1x Vote Crate Key + 500 Coins' },
  { name: 'Planet Minecraft', url: 'https://planetminecraft.com', reward: '1x Vote Crate Key + 500 Coins' },
  { name: 'Minecraft-MP', url: 'https://minecraft-mp.com', reward: '1x Vote Crate Key + 500 Coins' },
  { name: 'Minecraft Server List', url: 'https://minecraft-server-list.com', reward: '1x Vote Crate Key + 1x Vote Token' },
];
