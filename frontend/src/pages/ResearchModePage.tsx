import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Zap, 
  Flame, 
  FileText, 
  FlaskConical, 
  Copy, 
  Check,
  Sparkles
} from 'lucide-react';
import { ResearchDomainReport } from '../types';
import { soundManager } from '../services/sound';

interface ResearchModePageProps {
  topic: string;
  report: ResearchDomainReport;
}

export const ResearchModePage: React.FC<ResearchModePageProps> = ({ topic, report }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'paper' | 'methodology'>('paper');
  const [copied, setCopied] = useState(false);

  const currentBlindspot = report.research_blindspots[0] || {
    headline: 'Cognitive Decay Under Autonomous Offloading',
    description: 'Investigating human diagnostic regression in AI-saturated fields.',
    paper_concept: 'Algorithmic Atrophy: Empirical Tracking of Human Intuition Degradation',
    suggested_methodology: 'Multi-cohort randomized trial with adversarial failure injections.'
  };

  const handleCopy = (text: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC & R&D RESEARCH WORKBENCH</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Research Blindspots: <span className="gradient-text-cyan">“{topic}”</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Isolating crowded consensus from unexplored, publishable breakthrough inquiries.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
          Peer-Review Grade Inquiry
        </span>
      </div>

      {/* 3-Column Domain Landscape Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Already Heavily Researched */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-slate-500" />
            <span>ALREADY HEAVILY RESEARCHED (CROWDED)</span>
          </div>

          <ul className="space-y-2.5">
            {report.already_researched.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-slate-600 font-mono">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emerging Areas */}
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-cyan-950/10 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>EMERGING FRONTIERS</span>
          </div>

          <ul className="space-y-2.5">
            {report.emerging_areas.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                <span className="text-cyan-400 font-mono">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Research Blindspot */}
        <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/20 space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
            <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>PRIMARY RESEARCH BLINDSPOT</span>
          </div>

          <h4 className="font-heading font-bold text-base text-white">
            {currentBlindspot.headline}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed">
            {currentBlindspot.description}
          </p>
        </div>

      </div>

      {/* Generator Tools: Problem, Paper Idea, Methodology */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        
        {/* Tool Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('paper');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'paper'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Novel Paper Concept</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('problem');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'problem'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Research Problem Statement</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('methodology');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'methodology'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-white/5'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Suggested Experimental Protocol</span>
            </button>
          </div>

          <button
            onClick={() => handleCopy(currentBlindspot.paper_concept)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 border border-white/10 hover:border-emerald-400 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Concept'}</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/5 space-y-4">
          {activeTab === 'paper' && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Paper Title & Hypothesis</span>
              <h3 className="font-heading font-bold text-lg text-white">
                {currentBlindspot.paper_concept}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong>Abstract Outline:</strong> While contemporary literature on {topic} prioritizes operational throughput and parameter scaling, this paper investigates the unmeasured degradation of foundational human heuristics under total algorithmic delegation. We introduce a longitudinal observation model and empirically test crisis-recovery variance across 300 expert practitioners.
              </p>
            </div>
          )}

          {activeTab === 'problem' && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Formal Problem Statement</span>
              <p className="text-sm text-slate-200 leading-relaxed">
                “There exists no standardized quantitative framework for measuring irreversible tacit knowledge loss and emergency intervention failure rates in human-in-the-loop systems operating over 5+ year deployment timelines in {topic}.”
              </p>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Suggested Methodology & Verification</span>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {currentBlindspot.suggested_methodology}
              </p>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 font-mono">
                Protocol: Double-blind intervention cohort testing with periodic unannounced offline black-swan simulation drills.
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
