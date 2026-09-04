import React from 'react';
import { 
  Lightbulb, 
  Target, 
  Cpu, 
  DollarSign, 
  Rocket, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { UnaskedQuestion } from '../types';
import { soundManager } from '../services/sound';

interface StartupModePageProps {
  topic: string;
  questions: UnaskedQuestion[];
  onSelectQuestion: (question: UnaskedQuestion) => void;
}

export const StartupModePage: React.FC<StartupModePageProps> = ({
  topic,
  questions,
  onSelectQuestion
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>VENTURE & INNOVATION BLUEPRINTS</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Startup Opportunities for <span className="gradient-text-gold">“{topic}”</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Every unasked question is an unbuilt billion-dollar venture category.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30">
          Problem $\rightarrow$ Solution $\rightarrow$ MVP
        </span>
      </div>

      {/* Venture Cards Grid */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const startup = q.startup_opportunity;
          return (
            <div
              key={q.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-amber-500/30 transition-all space-y-6"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-lg">
                    💡
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                      {startup.title}
                    </h3>
                    <p className="text-xs text-amber-400 font-mono">
                      “{startup.pitch_hook}”
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    {startup.market_size}
                  </span>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectQuestion(q);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>View Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Underlying Unasked Question */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                  Derived from Unasked Question:
                </span>
                <p className="text-xs font-medium text-slate-300">{q.title}</p>
              </div>

              {/* 4-Box Blueprint Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400 font-bold">
                    <Target className="w-3.5 h-3.5" />
                    <span>THE PROBLEM</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{startup.problem}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>THE SOLUTION</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{startup.solution}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 font-bold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>TECH STACK</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {startup.technology.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>BUSINESS MODEL</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{startup.business_model}</p>
                </div>

              </div>

              {/* MVP Idea Box */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
                <Rocket className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-mono text-amber-300 font-bold text-xs uppercase">
                    Suggested 30-Day MVP:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{startup.mvp_idea}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
