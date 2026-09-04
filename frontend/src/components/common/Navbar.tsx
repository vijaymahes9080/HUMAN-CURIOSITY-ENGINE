import React from 'react';
import { 
  Sparkles, 
  Network, 
  Clock, 
  GraduationCap, 
  Lightbulb, 
  Users, 
  LayoutDashboard, 
  Volume2, 
  VolumeX, 
  Settings, 
  Sun, 
  Moon,
  PlusCircle
} from 'lucide-react';
import { NavigationTab, AIProviderConfig } from '../../types';
import { soundManager } from '../../services/sound';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onNewAnalysis: () => void;
  hasResults: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  aiConfig: AIProviderConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onNewAnalysis,
  hasResults,
  soundEnabled,
  onToggleSound,
  isDarkMode,
  onToggleTheme,
  onOpenSettings,
  aiConfig
}) => {
  const handleTabClick = (tab: NavigationTab) => {
    soundManager.playClick();
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07090E]/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => handleTabClick('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 transition-all">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                HUMAN CURIOSITY ENGINE
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 truncate">
              <span>“மனிதர்கள் கேட்க மறந்த கேள்விகள்”</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400/80">Unasked Question Discovery</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => handleTabClick('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentTab === 'landing'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover</span>
          </button>

          {hasResults && (
            <button
              onClick={() => handleTabClick('results')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                currentTab === 'results' || currentTab === 'explorer'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>❓ Questions</span>
            </button>
          )}

          <button
            onClick={() => handleTabClick('blindspot_map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentTab === 'blindspot_map'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Blindspot Map</span>
          </button>

          <button
            onClick={() => handleTabClick('future_explorer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentTab === 'future_explorer'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Future 2050</span>
          </button>

          <button
            onClick={() => handleTabClick('research_mode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentTab === 'research_mode'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Research Mode</span>
          </button>

          <button
            onClick={() => handleTabClick('startup_mode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentTab === 'startup_mode'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Startup Mode</span>
          </button>

          <button
            onClick={() => handleTabClick('community')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentTab === 'community'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Community</span>
          </button>

          <button
            onClick={() => handleTabClick('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentTab === 'dashboard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2">
          {/* New Analysis Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNewAnalysis();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Exploration</span>
          </button>

          {/* AI Provider Status Pill */}
          <button
            onClick={onOpenSettings}
            title={`Active Engine: ${aiConfig.provider.toUpperCase()}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-800/80 border border-white/10 text-slate-300 hover:border-cyan-500/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="capitalize">{aiConfig.provider} AI</span>
          </button>

          {/* Audio Chime Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            title={soundEnabled ? 'Mute sound cues' : 'Enable sound cues'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleTheme();
            }}
            title="Toggle theme"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            {isDarkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenSettings();
            }}
            title="Configure AI Providers"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
