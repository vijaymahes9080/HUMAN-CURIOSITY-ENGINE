import React from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Eye, 
  GraduationCap, 
  Lightbulb, 
  Bookmark, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { CuriosityProfileStats, UnaskedQuestion } from '../types';
import { CuriosityScoreBadge } from '../components/questions/CuriosityScoreBadge';
import { soundManager } from '../services/sound';

interface DashboardPageProps {
  stats: CuriosityProfileStats;
  savedQuestions: UnaskedQuestion[];
  onSelectQuestion: (question: UnaskedQuestion) => void;
  onExploreTopic: (topic: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  stats,
  savedQuestions,
  onSelectQuestion,
  onExploreTopic
}) => {
  const evolutionEvents = [
    {
      date: 'Today',
      topic: 'Autonomous Warfare & Drone Swarms',
      type: 'Discovery',
      summary: 'Uncovered 5 high-novelty questions on sub-millisecond automated ceasefires and legal vacuums.'
    },
    {
      date: 'Yesterday',
      topic: 'Cellular Longevity & Age Reversal',
      type: 'Startup Opportunity',
      summary: 'Generated venture blueprint for LongHorizon AI & Intergenerational Asset Pricing.'
    },
    {
      date: '3 Days Ago',
      topic: 'Climate Geoengineering',
      type: 'Research Paper',
      summary: 'Formulated empirical study on localized precipitation feedback loops in non-signatory nations.'
    },
    {
      date: '1 Week Ago',
      topic: 'Artificial Intelligence & Cognitive Scaling',
      type: 'Dialectical Challenge',
      summary: 'Challenged conventional benchmark assumptions; refined question to focus on Goodhart metric gaming.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* User Curiosity Profile Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
              🧠
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-2xl text-white">Vijay Mahes</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Tier 1 Curiosity Pioneer
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Curiosity Velocity: <strong className="text-emerald-400">94.2 Avg Score</strong> • 7-Day Discovery Streak 🔥
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onExploreTopic('Quantum Computing Economy');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
          >
            Explore Next Frontier
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span>DISCOVERED</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-heading font-extrabold text-3xl text-white">{stats.questions_discovered}</p>
          <p className="text-[11px] text-slate-400 font-mono">Unasked Questions mapped</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-purple-400">
            <span>BLINDSPOTS</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <p className="font-heading font-extrabold text-3xl text-white">{stats.blindspots_found}</p>
          <p className="text-[11px] text-slate-400 font-mono">Hidden systemic blindspots</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>RESEARCH IDEAS</span>
            <GraduationCap className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-heading font-extrabold text-3xl text-white">{stats.research_ideas_generated}</p>
          <p className="text-[11px] text-slate-400 font-mono">Novel paper concepts</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>STARTUP VENTURES</span>
            <Lightbulb className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-heading font-extrabold text-3xl text-white">{stats.startup_opportunities_mapped}</p>
          <p className="text-[11px] text-slate-400 font-mono">Validated opportunity blueprints</p>
        </div>

      </div>

      {/* 2-Column: Saved Bookmarks & Curiosity Evolution Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Saved Questions Bookmarks */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Bookmark className="w-4 h-4" />
              <span>SAVED CURIOSITY BOOKMARKS ({savedQuestions.length})</span>
            </div>
          </div>

          {savedQuestions.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 font-mono space-y-2">
              <p>No saved questions yet.</p>
              <p className="text-slate-400">Click the bookmark icon on any question card to save it here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectQuestion(q);
                  }}
                  className="p-3.5 rounded-xl border border-white/5 bg-slate-950/60 hover:border-amber-500/30 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{q.topic}</span>
                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-amber-200 line-clamp-1">
                      {q.title}
                    </h4>
                  </div>
                  <CuriosityScoreBadge score={q.curiosity_score} size="sm" showLabel={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Curiosity Evolution Timeline */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
              <Calendar className="w-4 h-4" />
              <span>CURIOSITY EVOLUTION TIMELINE</span>
            </div>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            {evolutionEvents.map((evt, idx) => (
              <div key={idx} className="relative space-y-1">
                {/* Timeline Dot */}
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950 shadow-md shadow-cyan-500/30" />
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{evt.date}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[10px] font-mono text-purple-300">{evt.type}</span>
                </div>

                <h4 className="font-semibold text-xs text-white">{evt.topic}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{evt.summary}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
