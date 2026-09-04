import React from 'react';
import { 
  ArrowLeft, 
  Flame, 
  Swords, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  GraduationCap, 
  Lightbulb, 
  Clock, 
  Layers, 
  AlertTriangle, 
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { UnaskedQuestion } from '../types';
import { CuriosityScoreBadge } from '../components/questions/CuriosityScoreBadge';
import { QuestionDNABadge } from '../components/questions/QuestionDNABadge';
import { DiscoveryPathVisualizer } from '../components/questions/DiscoveryPathVisualizer';
import { soundManager } from '../services/sound';

interface ExplorerPageProps {
  question: UnaskedQuestion;
  onBack: () => void;
  onChallenge: (question: UnaskedQuestion) => void;
  onToggleSave: (questionId: string) => void;
  onSelectRelated: (relatedTitle: string) => void;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({
  question,
  onBack,
  onChallenge,
  onToggleSave,
  onSelectRelated
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Back and Actions Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Questions</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onChallenge(question);
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Challenge Question</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onToggleSave(question.id);
            }}
            className={`p-2 rounded-xl text-xs border transition-all ${
              question.is_saved
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900 border-white/10'
            }`}
          >
            {question.is_saved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Question Hero Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              UNASKED QUESTION EXPLORER
            </span>
            <span className="text-xs font-mono text-slate-400">
              Domain: <strong className="text-slate-200">{question.topic}</strong>
            </span>
          </div>

          <CuriosityScoreBadge score={question.curiosity_score} size="lg" />
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight">
          {question.title}
        </h1>

        <div className="pt-2">
          <QuestionDNABadge dna={question.dna} initialExpanded={true} />
        </div>
      </div>

      {/* Explainable AI Discovery Path */}
      <DiscoveryPathVisualizer path={question.discovery_path} />

      {/* 2-Column Deep Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Why This Question Matters */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4" />
            <span>1. WHY THIS QUESTION MATTERS</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {question.why_it_matters}
          </p>
        </div>

        {/* Hidden Blindspot */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>2. THE HIDDEN HUMAN BLINDSPOT</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {question.hidden_blindspot}
          </p>
        </div>

        {/* What Humans Commonly Assume */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold">
            <Layers className="w-4 h-4" />
            <span>3. UNEXAMINED BASELINE ASSUMPTIONS</span>
          </div>
          <ul className="space-y-2">
            {question.common_assumptions.map((ass, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 font-mono font-bold shrink-0">•</span>
                <span>{ass}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future Impact (2030 - 2050) */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
            <Clock className="w-4 h-4" />
            <span>4. FUTURE TIMELINE RIPPLES (2030–2050)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
              <span className="font-mono font-bold text-amber-400 mr-2">2030:</span>
              <span className="text-slate-300">{question.future_impact.year_2030}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
              <span className="font-mono font-bold text-amber-400 mr-2">2040:</span>
              <span className="text-slate-300">{question.future_impact.year_2040}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
              <span className="font-mono font-bold text-amber-400 mr-2">2050:</span>
              <span className="text-slate-300">{question.future_impact.year_2050}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Innovation & Breakthrough Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Research Opportunity */}
        <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 bg-emerald-950/10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>ACADEMIC RESEARCH PAPER BREAKTHROUGH</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white mb-1">
              {question.research_opportunities.paper_title}
            </h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {question.research_opportunities.abstract_concept}
            </p>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-[11px] text-slate-400 font-mono space-y-1">
              <div><strong className="text-emerald-400">Methodology:</strong> {question.research_opportunities.methodology}</div>
              <div><strong className="text-emerald-400">Target Breakthrough:</strong> {question.research_opportunities.potential_breakthrough}</div>
            </div>
          </div>
        </div>

        {/* Startup Venture Blueprint */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 bg-cyan-950/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>STARTUP VENTURE BLUEPRINT</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {question.startup_opportunity.market_size}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-1">
              {question.startup_opportunity.title} — {question.startup_opportunity.pitch_hook}
            </h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {question.startup_opportunity.solution}
            </p>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-[11px] text-slate-400 font-mono space-y-1">
              <div><strong className="text-cyan-400">MVP Idea:</strong> {question.startup_opportunity.mvp_idea}</div>
              <div><strong className="text-cyan-400">Business Model:</strong> {question.startup_opportunity.business_model}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Related Questions & Navigation */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-slate-300 text-xs font-mono font-bold">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>EXPLORE RELATED UNASKED QUESTIONS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.related_questions.map((rel, idx) => (
            <div
              key={idx}
              onClick={() => {
                soundManager.playClick();
                onSelectRelated(rel);
              }}
              className="p-3.5 rounded-xl border border-white/5 bg-slate-950/50 hover:border-cyan-500/40 hover:bg-cyan-500/5 cursor-pointer transition-all flex items-center justify-between group"
            >
              <span className="text-xs text-slate-300 group-hover:text-cyan-200">{rel}</span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
