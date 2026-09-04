import React from 'react';
import { Flame } from 'lucide-react';

interface CuriosityScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export const CuriosityScoreGauge: React.FC<CuriosityScoreGaugeProps> = ({
  score,
  size = 140,
  strokeWidth = 10
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const getColor = () => {
    if (score >= 95) return '#F59E0B'; // Amber / Gold
    if (score >= 90) return '#06B6D4'; // Cyan
    if (score >= 80) return '#10B981'; // Emerald
    return '#8B5CF6'; // Purple
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Value Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Flame className="w-4 h-4 text-amber-400 animate-pulse mb-0.5" />
        <span className="font-heading font-extrabold text-2xl text-white tracking-tight leading-none">
          {score}
        </span>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Curiosity
        </span>
      </div>
    </div>
  );
};
