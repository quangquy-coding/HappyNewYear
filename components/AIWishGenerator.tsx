
import React, { useState } from 'react';
import { Send, Loader2, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { generateNewYearWish } from '../services/gemini';

const AIWishGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [mood, setMood] = useState('inspiring');
  const [wish, setWish] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const result = await generateNewYearWish(name, mood);
      setWish(result || 'May the neon lights of 2026 guide your path to infinite success.');
    } catch (error) {
      console.error(error);
      setWish('The stars aligned, but the transmission failed. May 2026 be your greatest year yet!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">AI WISHLIST</h2>
        <p className="text-slate-400">Personalized poetic visions for the upcoming year.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">Your Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">Vibe of 2026</label>
            <div className="grid grid-cols-2 gap-3">
              {['Cyberpunk', 'Zen Nature', 'Minimalist', 'Extravagant'].map((v) => (
                <button
                  key={v}
                  onClick={() => setMood(v)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${mood === v ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !name}
            className="w-full py-5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl font-bold text-white hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
            GENERATE VISION
          </button>
        </div>

        <div className="relative min-h-[350px] bg-slate-900 p-10 rounded-[2rem] border border-slate-800 flex flex-col items-center justify-center text-center group">
          {wish ? (
            <>
              <div className="absolute top-6 right-6">
                <button 
                  onClick={copyToClipboard}
                  className="p-3 bg-slate-950 rounded-xl hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-2xl font-light italic leading-relaxed text-slate-200">
                "{wish}"
              </p>
              <div className="mt-8 text-xs font-black tracking-widest text-cyan-500 uppercase">
                2026 DESTINY ENCODED
              </div>
            </>
          ) : (
            <div className="space-y-4 opacity-30 grayscale group-hover:opacity-50 transition-opacity">
              <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto flex items-center justify-center">
                <Sparkles className="w-10 h-10" />
              </div>
              <p>Your future greeting will appear here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIWishGenerator;
