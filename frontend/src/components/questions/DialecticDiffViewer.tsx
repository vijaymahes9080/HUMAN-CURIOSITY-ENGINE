import React from 'react';
import { ArrowRight, Sparkles, RefreshCw, ShieldCheck } from 'lucide-react';
import { QuestionChallenge } from '../../types';

interface DialecticDiffViewerProps {
  originalTitle: string;
  challenge: QuestionChallenge;
}

export const DialecticDiffViewer: React.FC<DialecticDiffViewerProps> = ({
  originalTitle,
  challenge
}) => {
  return (
    <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>DIALECTICAL QUESTION REFINEMENT DIFF</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
          Critique: {challenge.challenge_type.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-rose-500/20 text-slate-300 space-y-1">
          <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">Original Premise:</span>
          <p className="line-through text-slate-400">{originalTitle}</p>
        </div>

        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-200 space-y-1">
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Refined High-Novelty Inquiry:</span>
          <p className="font-semibold">{challenge.ai_revised_question || originalTitle}</p>
        </div>
      </div>

      {challenge.ai_reasoning_update && (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-300 font-mono leading-relaxed">
          <strong className="text-cyan-400">Synthesis Rationale: </strong>
          {challenge.ai_reasoning_update}
        </div>
      )}
    </div>
  );
};
