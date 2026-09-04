import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  Sparkles, 
  Swords, 
  MessageSquare, 
  PlusCircle, 
  Search, 
  TrendingUp,
  Bookmark,
  Share2
} from 'lucide-react';
import { UnaskedQuestion } from '../types';
import { CuriosityScoreBadge } from '../components/questions/CuriosityScoreBadge';
import { soundManager } from '../services/sound';

interface CommunityUniversePageProps {
  questions: UnaskedQuestion[];
  onExplore: (question: UnaskedQuestion) => void;
  onChallenge: (question: UnaskedQuestion) => void;
  onUpvote: (questionId: string) => void;
}

export const CommunityUniversePage: React.FC<CommunityUniversePageProps> = ({
  questions,
  onExplore,
  onChallenge,
  onUpvote
}) => {
  const [filter, setFilter] = useState<'trending' | 'highest_score' | 'debated'>('trending');
  const [search, setSearch] = useState('');

  const displayQuestions = [...questions].sort((a, b) => {
    if (filter === 'highest_score') return b.curiosity_score - a.curiosity_score;
    if (filter === 'debated') return b.challenges.length - a.challenges.length;
    return (b.upvotes + b.curiosity_score) - (a.upvotes + a.curiosity_score);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>INTELLECTUAL QUESTION UNIVERSE</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Community Discourse & Question Curation
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            A high-signal intellectual salon for discovering, challenging, and elevating unasked questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            {displayQuestions.length} Public Questions Indexed
          </span>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {[
            { id: 'trending', label: '🔥 Trending Inquiries' },
            { id: 'highest_score', label: '⭐ Highest Curiosity Score' },
            { id: 'debated', label: '⚔️ Most Challenged' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(tab.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search community questions..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-xs focus:border-rose-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        {displayQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="glass-card rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Left Info */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  TOPIC: {q.topic.toUpperCase()}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {q.dna.reasoning_pattern}
                </span>
              </div>

              <h3 
                onClick={() => {
                  soundManager.playClick();
                  onExplore(q);
                }}
                className="font-heading font-bold text-base sm:text-lg text-white hover:text-rose-200 transition-colors cursor-pointer"
              >
                {q.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-1">
                {q.hidden_blindspot}
              </p>
            </div>

            {/* Right Score & Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <CuriosityScoreBadge score={q.curiosity_score} size="md" />

              <button
                onClick={() => {
                  soundManager.playClick();
                  onUpvote(q.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                  q.user_voted
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
                }`}
                title="Upvote significance"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>{q.upvotes}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onChallenge(q);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Swords className="w-3.5 h-3.5" />
                <span>Challenge</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
