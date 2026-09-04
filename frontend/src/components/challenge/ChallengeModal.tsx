import React, { useState } from 'react';
import { X, Swords, RefreshCw, Sparkles, CheckCircle } from 'lucide-react';
import { UnaskedQuestion } from '../../types';
import { soundManager } from '../../services/sound';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: UnaskedQuestion | null;
  onApplyChallenge: (
    question: UnaskedQuestion,
    type: 'importance' | 'already_discussed' | 'flawed_assumption' | 'contradictory_evidence' | 'custom',
    critique: string
  ) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  question,
  onApplyChallenge
}) => {
  const [selectedType, setSelectedType] = useState<'already_discussed' | 'flawed_assumption' | 'importance' | 'contradictory_evidence' | 'custom'>('already_discussed');
  const [critiqueText, setCritiqueText] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  if (!isOpen || !question) return null;

  const challengePresets = [
    {
      type: 'already_discussed',
      title: 'Already Heavily Discussed',
      desc: 'This question feels familiar. Force AI to strip out conventional arguments and dig deeper.'
    },
    {
      type: 'flawed_assumption',
      title: 'Flawed Core Premise',
      desc: 'The baseline premise or assumption is incorrect or outdated.'
    },
    {
      type: 'importance',
      title: 'Low Urgency / Trivial Focus',
      desc: 'Challenge why this matters compared to higher-order existential bottlenecks.'
    },
    {
      type: 'contradictory_evidence',
      title: 'Contradictory Empirical Data',
      desc: 'Recent technological or economic breakthroughs invalidate this dilemma.'
    },
  ];

  const handleSubmit = () => {
    soundManager.playAgentPulse(650);
    setIsRefining(true);

    setTimeout(() => {
      onApplyChallenge(question, selectedType, critiqueText.trim());
      setIsRefining(false);
      soundManager.playDiscoveryChime();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0C101B] border border-purple-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-white">Challenge This Question</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  Iterative Curiosity
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Criticize the AI reasoning to force dynamic dialectical re-analysis and higher precision.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Target Question */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
            Target Unasked Question:
          </span>
          <p className="text-sm font-semibold text-slate-200">{question.title}</p>
        </div>

        {/* Challenge Angle Presets */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Critique Angle
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {challengePresets.map((preset) => (
              <div
                key={preset.type}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedType(preset.type as any);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedType === preset.type
                    ? 'border-purple-500 bg-purple-500/15 shadow-md shadow-purple-500/10'
                    : 'border-white/5 bg-slate-900/40 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-white">{preset.title}</span>
                  {selectedType === preset.type && (
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{preset.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Provide Specific Criticisms or Counter-Evidence (Optional)
          </label>
          <textarea
            rows={3}
            value={critiqueText}
            onChange={(e) => setCritiqueText(e.target.value)}
            placeholder="e.g., Papers by MIT in 2025 already addressed this by introducing verifiable zero-knowledge proofs. Focus instead on sovereign adoption friction..."
            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-xs focus:border-purple-400 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono text-slate-500">
            AI will reformulate Question DNA & Score
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRefining}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isRefining ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dialectical Re-analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  <span>Re-analyze & Sharpen</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
