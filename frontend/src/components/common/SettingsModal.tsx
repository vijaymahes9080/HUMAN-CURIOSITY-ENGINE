import React, { useState } from 'react';
import { X, Cpu, Key, Check, Info } from 'lucide-react';
import { AIProviderConfig } from '../../types';
import { soundManager } from '../../services/sound';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AIProviderConfig;
  onSaveConfig: (config: AIProviderConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  const [provider, setProvider] = useState<'mock' | 'gemini' | 'openai' | 'ollama'>(config.provider);
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [ollamaUrl, setOllamaUrl] = useState(config.ollamaUrl || 'http://localhost:11434');
  const [temperature, setTemperature] = useState(config.temperature ?? 0.7);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    soundManager.playClick();
    onSaveConfig({
      provider,
      apiKey: apiKey.trim(),
      ollamaUrl: ollamaUrl.trim(),
      temperature
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0E131F] border border-white/10 rounded-2xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">AI Intelligence Engine</h3>
              <p className="text-xs text-slate-400">Select active multi-agent reasoning provider</p>
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

        {/* Provider Selector Cards */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Active Provider
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'mock', name: 'Curiosity Neural Mock', desc: 'Zero-config local engine (Instant)', badge: 'Recommended' },
              { id: 'gemini', name: 'Google Gemini', desc: 'Gemini 2.5 Flash / 1.5 Pro', badge: 'Cloud' },
              { id: 'openai', name: 'OpenAI GPT-4o', desc: 'GPT-4o / GPT-4o-mini', badge: 'Cloud' },
              { id: 'ollama', name: 'Ollama Local LLM', desc: 'Llama 3 / DeepSeek / Mistral', badge: 'Local' },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setProvider(item.id as 'mock' | 'gemini' | 'openai' | 'ollama');
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  provider === item.id
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                    : 'border-white/10 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-white">{item.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-cyan-400 border border-white/10">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* API Key or Config inputs */}
          {provider !== 'mock' && provider !== 'ollama' && (
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span>{provider === 'gemini' ? 'Gemini API Key' : 'OpenAI API Key'}</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-sm focus:border-cyan-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500">
                Keys are stored locally in your browser and never transmitted elsewhere.
              </p>
            </div>
          )}

          {provider === 'ollama' && (
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-medium text-slate-300">Ollama Base URL</label>
              <input
                type="text"
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
          )}

          {/* Temperature Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span>Reasoning Temperature (Divergence)</span>
              <span className="font-mono text-cyan-400">{temperature}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Precise / Analytical</span>
              <span>Divergent / Wild Curiosity</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex items-start gap-2 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              The <strong>Curiosity Neural Mock</strong> engine runs 100% offline out-of-the-box with full multi-agent simulation across hundreds of domains.
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
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
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-white" /> : null}
            <span>{savedSuccess ? 'Saved' : 'Apply Settings'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
