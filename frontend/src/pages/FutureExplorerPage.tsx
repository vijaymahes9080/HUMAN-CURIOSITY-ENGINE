import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  AlertCircle, 
  TrendingUp, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { FutureHorizonAnalysis } from '../types';
import { soundManager } from '../services/sound';

interface FutureExplorerPageProps {
  topic: string;
  horizons: FutureHorizonAnalysis[];
}

export const FutureExplorerPage: React.FC<FutureExplorerPageProps> = ({ topic, horizons }) => {
  const [selectedYear, setSelectedYear] = useState<2030 | 2035 | 2040 | 2050>(2030);

  const currentHorizon = horizons.find((h) => h.year === selectedYear) || horizons[0];

  const handleYearSelect = (year: 2030 | 2035 | 2040 | 2050) => {
    soundManager.playClick();
    setSelectedYear(year);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>TEMPORAL CASCADE SIMULATOR</span>
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
          What should humanity ask before <span className="gradient-text-violet">{selectedYear}</span> arrives?
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-mono">
          Simulating long-term second-order consequences and unforeseen systemic risks for <strong className="text-slate-200">“{topic}”</strong>.
        </p>
      </div>

      {/* Year Selection Tabs (2030, 2035, 2040, 2050) */}
      <div className="flex items-center justify-center gap-3">
        {([2030, 2035, 2040, 2050] as const).map((year) => {
          const isSelected = selectedYear === year;
          return (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`px-6 py-3 rounded-2xl font-mono font-bold text-sm sm:text-base border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-slate-900/60 text-slate-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{year} Horizon</span>
            </button>
          );
        })}
      </div>

      {/* Active Horizon Card */}
      {currentHorizon && (
        <div className="space-y-6">
          
          {/* Overview Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                Scenario Title
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                Year {currentHorizon.year} Projection
              </span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-white">
              {currentHorizon.headline}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentHorizon.scenario_overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  <span>TREND ACCELERATION</span>
                </div>
                <p className="text-xs text-slate-300">{currentHorizon.trend_acceleration}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>PRIMARY UNMEASURED BLINDSPOT</span>
                </div>
                <p className="text-xs text-slate-300">{currentHorizon.primary_blindspot}</p>
              </div>
            </div>
          </div>

          {/* Critical Unasked Questions List */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Critical Questions Humanity Must Address Before {currentHorizon.year}:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentHorizon.critical_unasked_questions.map((q, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/40 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        CRITICAL QUESTION #0{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        Urgency: {q.urgency}/100
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-white leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs text-slate-300 space-y-1">
                    <span className="font-mono text-rose-400 font-bold text-[10px] uppercase block">
                      Consequence if Ignored:
                    </span>
                    <p className="text-[11px] text-slate-400">{q.consequence_if_ignored}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
