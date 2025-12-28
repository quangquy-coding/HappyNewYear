
import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Loader2, Plus, Download } from 'lucide-react';
import { generateNewYearImage } from '../services/gemini';

interface Card {
  id: string;
  url: string;
  prompt: string;
}

const NewYearGallery: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [generating, setGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const handleGenerate = async () => {
    if (generating) return;
    const prompt = customPrompt || 'Future Tokyo with neon 2026 signage';
    setGenerating(true);
    try {
      const imageUrl = await generateNewYearImage(prompt);
      if (imageUrl) {
        setCards([{ id: Date.now().toString(), url: imageUrl, prompt }, ...cards]);
        setCustomPrompt('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-right duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">VISION GALLERY</h2>
        <p className="text-slate-400">Generate high-fidelity concept art for your 2026 goals.</p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="flex gap-2 bg-slate-900/80 p-2 rounded-3xl border border-slate-800 shadow-2xl focus-within:border-cyan-500 transition-colors">
          <input 
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Describe your 2026 vision..."
            className="flex-1 bg-transparent px-6 py-3 text-white focus:outline-none"
          />
          <button 
            onClick={handleGenerate}
            disabled={generating}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-4 rounded-2xl transition-all disabled:opacity-50"
          >
            {generating ? <Loader2 className="animate-spin w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.length === 0 && !generating && (
           <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-600">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No visions generated yet. Start the evolution above.</p>
           </div>
        )}

        {generating && (
          <div className="aspect-video bg-slate-900 animate-pulse rounded-[2rem] border border-slate-800 flex items-center justify-center">
            <Loader2 className="animate-spin text-cyan-500 w-12 h-12" />
          </div>
        )}

        {cards.map((card) => (
          <div key={card.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 aspect-video hover:border-cyan-500/50 transition-all duration-500">
            <img 
              src={card.url} 
              alt={card.prompt} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
              <p className="text-white text-sm font-medium line-clamp-2 mb-4">"{card.prompt}"</p>
              <div className="flex gap-2">
                <a 
                  href={card.url} 
                  download={`vision-2026-${card.id}.png`}
                  className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Download className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewYearGallery;
