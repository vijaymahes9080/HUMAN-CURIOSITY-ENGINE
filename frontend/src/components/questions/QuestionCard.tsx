import React from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight, 
  Swords, 
  Share2, 
  Check, 
  Layers,
  Sparkles
} from 'lucide-react';
import { UnaskedQuestion } from '../../types';
import { CuriosityScoreBadge } from './CuriosityScoreBadge';
import { QuestionDNABadge } from './QuestionDNABadge';
import { soundManager } from '../../services/sound';

interface QuestionCardProps {
  question: UnaskedQuestion;
  index: number;
  onExplore: (question: UnaskedQuestion) => void;
  onChallenge: (question: UnaskedQuestion) => void;
  onToggleSave: (questionId: string) => void;
  onUpvote: (questionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  onExplore,
  onChallenge,
  onToggleSave,
  onUpvote
}) => {
  const [copied, setCopied] = React.useState(false);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'system_blindspot':
        return { label: '🌍 System Blindspot', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
      case 'ethical_vacuum':
        return { label: '⚖️ Ethical Vacuum', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
      case 'reverse_paradigm':
        return { label: '🔄 Reverse Paradigm', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      case 'missing_stakeholder':
        return { label: '👥 Missing Stakeholder', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'unexamined_assumption':
        return { label: '🧠 Unexamined Assumption', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
      default:
        return { label: '🔮 Future Paradox', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    }
  };

  const badge = getCategoryBadge(question.category);

  const handleShare = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(`🧠 Unasked Question: "${question.title}" — Discovered via Human Curiosity Engine (Curiosity Score: ${question.curiosity_score}/100)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="glass-card rounded-2xl p-6 relative group border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
      
      {/* Top Meta Row */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              #{String(index + 1).padStart(2, '0')}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
              {badge.label}
            </span>
          </div>

          <CuriosityScoreBadge score={question.curiosity_score} size="md" />
        </div>

        {/* Main Question Heading */}
        <h3 
          onClick={() => {
            soundManager.playClick();
            onExplore(question);
          }}
          className="font-heading font-bold text-lg md:text-xl text-white group-hover:text-cyan-200 transition-colors leading-snug cursor-pointer mb-3"
        >
          {question.title}
        </h3>

        {/* Blindspot snippet */}
        <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-2">
          <span className="font-semibold text-slate-300">Hidden Blindspot: </span>
          {question.hidden_blindspot}
        </p>

        {/* Question DNA Component */}
        <div className="mb-5">
          <QuestionDNABadge dna={question.dna} />
        </div>
      </div>

      {/* Bottom Action Toolbar */}
      <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Interactive Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onExplore(question);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Explore Deeply</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onChallenge(question);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Challenge this question to trigger AI dialectical refinement"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Challenge</span>
            {question.challenges.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] font-mono flex items-center justify-center">
                {question.challenges.length}
              </span>
            )}
          </button>
        </div>

        {/* Right Social & Save Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundManager.playClick();
              onUpvote(question.id);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1 border transition-all ${
              question.user_voted
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900 border-white/10 hover:border-white/20'
            }`}
            title="Upvote curiosity significance"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>{question.upvotes}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onToggleSave(question.id);
            }}
            className={`p-2 rounded-lg text-xs border transition-all ${
              question.is_saved
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900 border-white/10 hover:border-white/20'
            }`}
            title={question.is_saved ? 'Saved in dashboard' : 'Save to curiosity profile'}
          >
            {question.is_saved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10 hover:border-white/20 transition-all"
            title="Copy question link & summary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

    </div>
  );
};
