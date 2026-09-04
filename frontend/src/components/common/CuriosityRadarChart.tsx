import React from 'react';
import { QuestionDNA } from '../../types';

interface CuriosityRadarChartProps {
  dna: QuestionDNA;
  size?: number;
}

export const CuriosityRadarChart: React.FC<CuriosityRadarChartProps> = ({
  dna,
  size = 220
}) => {
  const center = size / 2;
  const radius = (size / 2) - 25;

  const axes = [
    { label: 'Orig', val: dna.originality },
    { label: 'Imp', val: dna.importance },
    { label: 'Fut', val: dna.future_impact },
    { label: 'Res', val: dna.research_potential },
    { label: 'Inn', val: dna.innovation_potential },
    { label: 'Urg', val: dna.urgency },
    { label: 'Feas', val: dna.feasibility },
    { label: 'Hum', val: dna.human_impact },
  ];

  const count = axes.length;
  const angleStep = (Math.PI * 2) / count;

  const points = axes.map((axis, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (axis.val / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center select-none">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background concentric polygons */}
        {[0.25, 0.5, 0.75, 1.0].map((level) => {
          const polyPoints = axes.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = level * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={level}
              points={polyPoints}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon with cyan/purple gradient fill */}
        <polygon
          points={points}
          fill="rgba(6, 182, 212, 0.25)"
          stroke="#06B6D4"
          strokeWidth="2"
        />

        {/* Vertex dots */}
        {axes.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const r = (axis.val / 100) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="#38BDF8"
              stroke="#0D1117"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Axis labels */}
        {axes.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + (radius + 14) * Math.cos(angle);
          const y = center + (radius + 14) * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y + 3}
              textAnchor="middle"
              className="text-[9px] font-mono fill-slate-400 font-bold"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
