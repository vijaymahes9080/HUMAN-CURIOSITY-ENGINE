import React, { useState } from 'react';
import { 
  Sparkles, 
  Filter, 
  Search, 
  Download, 
  SlidersHorizontal, 
  Flame, 
  Network,
  Share2
} from 'lucide-react';
import { UnaskedQuestion } from '../types';
import { QuestionCard } from '../components/questions/QuestionCard';
import { soundManager } from '../services/sound';

interface ResultsPageProps {
  topic: string;
  questions: UnaskedQuestion[];
  onExplore: (question: UnaskedQuestion) => void;
  onChallenge: (question: UnaskedQuestion) => void;
  onToggleSave: (questionId: string) => void;
  onUpvote: (questionId: string) => void;
  onOpenBlindspotMap: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  topic,
  questions,
  onExplore,
  onChallenge,
  onToggleSave,
  onUpvote,
  onOpenBlindspotMap
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'novelty' | 'future'>('score');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Unasked Questions' },
    { id: 'system_blindspot', label: 'System Blindspots' },
    { id: 'ethical_vacuum', label: 'Ethical Vacuums' },
    { id: 'reverse_paradigm', label: 'Reverse Paradigms' },
    { id: 'unexamined_assumption', label: 'Assumptions' },
    { id: 'missing_stakeholder', label: 'Missing Stakeholders' },
  ];

  // Filter & sort
  const filtered = questions.filter((q) => {
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.hidden_blindspot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.why_it_matters.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score') return b.curiosity_score - a.curiosity_score;
    if (sortBy === 'novelty') return b.dna.originality - a.dna.originality;
    return b.dna.future_impact - a.dna.future_impact;
  });

  const handleExportJSON = () => {
    soundManager.playClick();
    const blob = new Blob([JSON.stringify({ topic, questions }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curiosity-engine-${topic.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Header & Topic Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVERY REPORT</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Unasked Questions for <span className="gradient-text-cyan">“{topic}”</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {questions.length} high-novelty questions uncovered across 5 analytical dimensions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBlindspotMap();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Network className="w-4 h-4" />
            <span>Open Blindspot Map</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="p-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            title="Export full curiosity report (JSON)"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or blindspots..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => {
              soundManager.playClick();
              setSortBy(e.target.value as any);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-300 text-xs font-mono focus:border-cyan-400 focus:outline-none"
          >
            <option value="score">Sort: Curiosity Score</option>
            <option value="novelty">Sort: Originality / Novelty</option>
            <option value="future">Sort: Future Impact (2050)</option>
          </select>
        </div>

      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sorted.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            onExplore={onExplore}
            onChallenge={onChallenge}
            onToggleSave={onToggleSave}
            onUpvote={onUpvote}
          />
        ))}
      </div>

    </div>
  );
};
