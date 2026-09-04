import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  AlertTriangle, 
  Zap, 
  HelpCircle, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Info,
  ArrowRight
} from 'lucide-react';
import { BlindspotNode, BlindspotLink, UnaskedQuestion } from '../types';
import { soundManager } from '../services/sound';

interface BlindspotMapPageProps {
  topic: string;
  nodes: BlindspotNode[];
  links: BlindspotLink[];
  questions: UnaskedQuestion[];
  onSelectQuestion: (question: UnaskedQuestion) => void;
}

export const BlindspotMapPage: React.FC<BlindspotMapPageProps> = ({
  topic,
  nodes,
  links,
  questions,
  onSelectQuestion
}) => {
  const [selectedNode, setSelectedNode] = useState<BlindspotNode | null>(nodes[0] || null);
  const [filterType, setFilterType] = useState<string>('all');
  const [zoom, setZoom] = useState(1);

  // Position nodes radially or hierarchically
  const positionedNodes = nodes.map((node, index) => {
    if (node.type === 'topic') return { ...node, x: 450, y: 80 };
    if (node.type === 'assumption') return { ...node, x: 180 + (index % 3) * 260, y: 220 };
    if (node.type === 'blindspot') return { ...node, x: 160 + (index % 3) * 280, y: 380 };
    if (node.type === 'contradiction') return { ...node, x: 280 + (index % 2) * 320, y: 520 };
    return { ...node, x: 120 + (index % 5) * 160, y: 660 }; // question
  });

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'topic': return { fill: 'fill-cyan-500/20', stroke: 'stroke-cyan-400', text: 'text-cyan-300' };
      case 'assumption': return { fill: 'fill-indigo-500/20', stroke: 'stroke-indigo-400', text: 'text-indigo-300' };
      case 'blindspot': return { fill: 'fill-purple-500/20', stroke: 'stroke-purple-400', text: 'text-purple-300' };
      case 'contradiction': return { fill: 'fill-amber-500/20', stroke: 'stroke-amber-400', text: 'text-amber-300' };
      default: return { fill: 'fill-rose-500/20', stroke: 'stroke-rose-400', text: 'text-rose-300' };
    }
  };

  const handleNodeClick = (node: BlindspotNode) => {
    soundManager.playClick();
    setSelectedNode(node);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <Network className="w-3.5 h-3.5" />
            <span>INTERACTIVE KNOWLEDGE GRAPH</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Human Blindspot Map: <span className="gradient-text-violet">“{topic}”</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Visualize how unexamined baseline assumptions create blindspots and manifest as unasked questions.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Topic
          </span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Assumptions
          </span>
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Blindspots
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Contradictions
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Questions
          </span>
        </div>
      </div>

      {/* Main Graph Canvas & Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive SVG Graph */}
        <div className="lg:col-span-2 glass-panel rounded-3xl border border-white/10 p-4 relative overflow-hidden min-h-[580px] flex items-center justify-center">
          
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <svg
            viewBox="0 0 900 760"
            className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-200 select-none"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Draw Links */}
            {links.map((link, idx) => {
              const src = positionedNodes.find((n) => n.id === link.source);
              const tgt = positionedNodes.find((n) => n.id === link.target);
              if (!src || !tgt) return null;

              return (
                <line
                  key={idx}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Draw Nodes */}
            {positionedNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const color = getNodeColor(node.type);

              return (
                <g
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer group"
                >
                  {/* Glow ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 42 : 32}
                    className={`${color.fill} ${color.stroke} transition-all duration-300`}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />

                  {/* Icon or Type label */}
                  <text
                    x={node.x}
                    y={(node.y || 0) + 4}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-slate-200 font-bold pointer-events-none select-none"
                  >
                    {node.type === 'topic' ? '🧠' : node.type === 'assumption' ? 'ASSUME' : node.type === 'blindspot' ? 'BLIND' : node.type === 'contradiction' ? 'PARADOX' : '❓'}
                  </text>

                  {/* Label Text below node */}
                  <text
                    x={node.x}
                    y={(node.y || 0) + 48}
                    textAnchor="middle"
                    className="text-[10px] font-sans fill-slate-300 font-medium pointer-events-none"
                  >
                    {node.label.length > 22 ? node.label.slice(0, 22) + '...' : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Detail Inspector Drawer */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <Info className="w-4 h-4" />
              <span>NODE INSPECTOR</span>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Type: {selectedNode.type}
                  </span>
                  <h4 className="font-heading font-bold text-base text-white">
                    {selectedNode.label}
                  </h4>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Systemic Significance
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedNode.description || 'This node represents an active structural component in the curiosity reasoning graph.'}
                  </p>
                </div>

                {selectedNode.type === 'question' && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const target = questions.find((q) => q.title.toLowerCase().includes(selectedNode.label.slice(0, 20).toLowerCase())) || questions[0];
                        onSelectQuestion(target);
                      }}
                      className="w-full py-2.5 rounded-xl font-heading font-semibold text-xs bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/20 transition-all cursor-pointer"
                    >
                      <span>Explore Unasked Question</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">
                Click any node in the graph above to inspect its reasoning and downstream questions.
              </p>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-[11px] text-slate-400 font-mono">
            💡 <strong>Graph Insight:</strong> Blindspots emerge at the intersection of accepted assumptions and unmeasured externalities.
          </div>
        </div>

      </div>

    </div>
  );
};
