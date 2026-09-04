import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  ArrowRight 
} from 'lucide-react';
import { AgentProgressStep } from '../types';
import { INITIAL_AGENT_STEPS } from '../services/curiosityEngine';
import { soundManager } from '../services/sound';

interface DiscoveryPageProps {
  topic: string;
  onComplete: () => void;
}

export const DiscoveryPage: React.FC<DiscoveryPageProps> = ({ topic, onComplete }) => {
  const [steps, setSteps] = useState<AgentProgressStep[]>(() => JSON.parse(JSON.stringify(INITIAL_AGENT_STEPS)));
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(10);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    // Simulate multi-agent reasoning cascade step-by-step
    const runPipeline = (index: number) => {
      if (index >= INITIAL_AGENT_STEPS.length) {
        soundManager.playDiscoveryChime();
        timer = setTimeout(() => {
          onComplete();
        }, 1200);
        return;
      }

      setCurrentAgentIndex(index);
      soundManager.playAgentPulse(480 + index * 40);

      setSteps((prev) => {
        const next = [...prev];
        next[index].status = 'running';
        next[index].progress = 50;
        return next;
      });

      timer = setTimeout(() => {
        setSteps((prev) => {
          const next = [...prev];
          next[index].status = 'completed';
          next[index].progress = 100;
          return next;
        });

        setOverallProgress(Math.round(((index + 1) / INITIAL_AGENT_STEPS.length) * 100));
        runPipeline(index + 1);
      }, 700);
    };

    runPipeline(0);

    return () => {
      clearTimeout(timer);
    };
  }, [topic, onComplete]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      
      {/* Header with Topic Breadcrumb */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          <span>Curiosity Orchestrator Running</span>
        </div>

        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          Investigating: <span className="gradient-text-cyan">“{topic}”</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-mono">
          8 Agentic AI modules are dissecting assumptions, blindspots, and second-order future consequences...
        </p>
      </div>

      {/* Overall Progress Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Pipeline Execution Progress</span>
          <span className="text-cyan-400 font-bold">{overallProgress}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Agents Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {steps.map((agent, idx) => {
          const isCurrent = idx === currentAgentIndex && agent.status === 'running';
          const isDone = agent.status === 'completed';

          return (
            <div
              key={agent.agent_id}
              className={`p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/40'
                  : isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-white/5 bg-slate-900/40 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{agent.icon}</span>
                  <div>
                    <h4 className="font-semibold text-xs text-white flex items-center gap-2">
                      <span>{agent.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">#0{idx + 1}</span>
                    </h4>
                  </div>
                </div>

                <div>
                  {isDone && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Ready</span>
                    </span>
                  )}
                  {isCurrent && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/40 animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Reasoning</span>
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-mono leading-relaxed line-clamp-2">
                {agent.thought}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
