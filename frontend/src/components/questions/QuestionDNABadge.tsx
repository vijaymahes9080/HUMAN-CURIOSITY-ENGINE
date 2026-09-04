import React, { useState } from 'react';
import { Dna, ChevronDown, ChevronUp } from 'lucide-react';
import { QuestionDNA } from '../../types';
import { soundManager } from '../../services/sound';

interface QuestionDNABadgeProps {
  dna: QuestionDNA;
  initialExpanded?: boolean;
}

export const QuestionDNABadge: React.FC<QuestionDNABadgeProps> = ({
  dna,
  initialExpanded = false
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);

  const metrics = [
    { label: 'Originality', val: dna.originality, color: 'bg-cyan-400' },
    { label: 'Importance', val: dna.importance, color: 'bg-rose-400' },
    { label: 'Future Impact', val: dna.future_impact, color: 'bg-purple-400' },
    { label: 'Research Pot.', val: dna.research_potential, color: 'bg-emerald-400' },
    { label: 'Innovation Pot.', val: dna.innovation_potential, color: 'bg-amber-400' },
    { label: 'Urgency', val: dna.urgency, color: 'bg-red-400' },
    { label: 'Feasibility', val: dna.feasibility, color: 'bg-blue-400' },
    { label: 'Human Impact', val: dna.human_impact, color: 'bg-teal-400' },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden text-xs transition-all">
      <div
        onClick={() => {
          soundManager.playClick();
          setExpanded(!expanded);
        }}
        className="px-3.5 py-2 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-purple-500/20 text-purple-400">
            <Dna className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono font-semibold text-slate-200">Question DNA</span>
          <span className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
            • {dna.reasoning_pattern}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[11px] font-mono text-cyan-400 font-bold">
            {dna.curiosity_score} pts
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {expanded && (
        <div className="p-4 border-t border-white/5 bg-slate-950/50 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>{m.label}</span>
                  <span className="font-bold text-slate-200">{m.val}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${m.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div>
              <span className="text-slate-500 font-mono">Blindspot Source: </span>
              <span className="text-cyan-300 font-medium">{dna.blindspot_source}</span>
            </div>
            <div>
              <span className="text-slate-500 font-mono">Pattern: </span>
              <span className="text-purple-300 font-medium">{dna.reasoning_pattern}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
