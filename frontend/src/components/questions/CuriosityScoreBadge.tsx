import React from 'react';
import { Flame } from 'lucide-react';

interface CuriosityScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const CuriosityScoreBadge: React.FC<CuriosityScoreBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true
}) => {
  const getGradient = () => {
    if (score >= 95) return 'from-amber-400 via-rose-500 to-purple-600 text-amber-200 border-amber-400/40 shadow-amber-500/20';
    if (score >= 90) return 'from-cyan-400 to-blue-600 text-cyan-200 border-cyan-400/40 shadow-cyan-500/20';
    if (score >= 80) return 'from-emerald-400 to-teal-600 text-emerald-200 border-emerald-400/40 shadow-emerald-500/20';
    return 'from-slate-400 to-slate-600 text-slate-200 border-slate-400/40 shadow-slate-500/10';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-lg px-4 py-2 gap-2'
  }[size];

  return (
    <div 
      className={`inline-flex items-center font-mono font-bold rounded-xl border bg-gradient-to-r ${getGradient()} shadow-lg backdrop-blur-md select-none transition-transform hover:scale-105 ${sizeClasses}`}
      title={`Curiosity Novelty & Importance Score: ${score}/100`}
    >
      <Flame className={`shrink-0 ${size === 'lg' ? 'w-5 h-5 text-amber-300 animate-bounce' : 'w-3.5 h-3.5 text-amber-300'}`} />
      {showLabel && <span className="text-[11px] font-sans font-medium opacity-90">Curiosity:</span>}
      <span className="tracking-tight">{score}</span>
      <span className="text-[10px] opacity-70">/100</span>
    </div>
  );
};
