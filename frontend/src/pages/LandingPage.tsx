import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Compass, 
  Zap, 
  ShieldAlert, 
  Cpu, 
  RefreshCw 
} from 'lucide-react';
import { SAMPLE_PROMPT_PILLS } from '../services/curiosityEngine';
import { soundManager } from '../services/sound';

interface LandingPageProps {
  onStartDiscovery: (topic: string) => void;
  isLoading?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDiscovery, isLoading = false }) => {
  const [topicInput, setTopicInput] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topicInput.trim() || isLoading) return;
    soundManager.playAgentPulse(440);
    onStartDiscovery(topicInput.trim());
  };

  const handlePillClick = (pill: string) => {
    soundManager.playClick();
    setTopicInput(pill);
    onStartDiscovery(pill);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Background Accent Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-8">
        
        {/* Top Tagline Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-500/10 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Curiosity Intelligence System • Not a Chatbot</span>
        </div>

        {/* Main Hero Header */}
        <div className="space-y-4">
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            What are we <br className="hidden sm:inline" />
            <span className="gradient-text-cyan">forgetting to ask?</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            AI that discovers the questions humanity forgot to ask. We analyze hidden assumptions, systemic blindspots, and future risks before they arrive.
          </p>
        </div>

        {/* Big Search / Topic Input Card */}
        <div className="max-w-2xl mx-auto w-full">
          <form 
            onSubmit={handleSubmit}
            className="glass-panel rounded-2xl p-2 sm:p-2.5 border border-white/15 focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/20 transition-all shadow-2xl flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="w-full flex items-center px-3 gap-2">
              <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Enter a topic, problem, industry, or future scenario..."
                disabled={isLoading}
                className="w-full bg-transparent py-3 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!topicInput.trim() || isLoading}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>DISCOVER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Curiosity Sparks / Topic Pills */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-mono uppercase text-slate-500 tracking-wider font-semibold">
            Or ignite curiosity with high-novelty domains:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {SAMPLE_PROMPT_PILLS.map((pill) => (
              <button
                key={pill}
                onClick={() => handlePillClick(pill)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer select-none"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Paradigm Shift Feature Comparison */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          
          <div className="p-5 rounded-2xl border border-white/5 bg-slate-950/40 opacity-70">
            <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-mono">
              <Zap className="w-4 h-4 text-slate-500" />
              <span>Traditional AI Model</span>
            </div>
            <p className="text-xs font-mono text-slate-400 mb-2">Human $\rightarrow$ Question $\rightarrow$ AI $\rightarrow$ Answer</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Provides direct answers to predefined, conventional questions without questioning the premise.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-purple-950/20 shadow-lg shadow-cyan-500/5">
            <div className="flex items-center gap-2 mb-2 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Human Curiosity Engine</span>
            </div>
            <p className="text-xs font-mono text-cyan-200 mb-2">Topic $\rightarrow$ Multi-Agent Blindspots $\rightarrow$ Unasked Questions $\rightarrow$ Innovation</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explores what humans are ignoring, unmeasured metrics, and second-order future risks.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
