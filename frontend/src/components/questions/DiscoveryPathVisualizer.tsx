import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { DiscoveryPathStep } from '../../types';

interface DiscoveryPathVisualizerProps {
  path: DiscoveryPathStep[];
}

export const DiscoveryPathVisualizer: React.FC<DiscoveryPathVisualizerProps> = ({ path }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-white">AI Discovery Path (Explainable AI)</h4>
            <p className="text-[11px] text-slate-400">Step-by-step conceptual derivation from topic to unasked question</p>
          </div>
        </div>

        <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-3 h-3" />
          <span>Verifiable Reasoning</span>
        </span>
      </div>

      {/* Breadcrumb Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {path.map((step, idx) => (
          <div
            key={step.stage + idx}
            className="p-3 rounded-xl border border-white/5 bg-slate-950/60 relative group hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400">0{idx + 1}. {step.stage}</span>
                {idx < path.length - 1 && (
                  <ArrowRight className="hidden md:block w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                )}
              </div>
              <h5 className="font-semibold text-xs text-white mb-1">{step.concept}</h5>
              <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
