import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#05070B] py-8 text-slate-500 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-base">🧠</span>
          <div>
            <p className="font-heading font-semibold text-slate-300">HUMAN CURIOSITY ENGINE</p>
            <p className="text-[11px] text-slate-500">“AI that discovers the questions humanity forgot to ask.”</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-slate-400">
          <span>8-Agent Reasoning Architecture</span>
          <span>•</span>
          <span>Question DNA v2</span>
          <span>•</span>
          <span>Zero-Discount Economics</span>
          <span>•</span>
          <span className="text-cyan-400">Vijay Mahes</span>
        </div>
      </div>
    </footer>
  );
};
