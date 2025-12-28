
import React, { useState } from 'react';
import { Sparkles, Zap, Quote, Rocket } from 'lucide-react';
import FireworkCanvas from './components/FireworkCanvas';
import CountdownTimer from './components/CountdownTimer';
import { generateNewYearWish } from './services/gemini';

const App: React.FC = () => {
  const [wish, setWish] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const getNewWish = async () => {
    setLoading(true);
    try {
      const result = await generateNewYearWish("Bạn", "Năm mới 2026 Bính Ngọ, mã đáo thành công, vạn sự như ý");
      setWish(result || '');
    } catch (error) {
      setWish("Chúc bạn năm mới 2026 Bính Ngọ: Mạnh mẽ như thần mã, thành công rực rỡ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#020617] text-white overflow-hidden flex flex-col items-center justify-between p-4 md:p-8">
      {/* Nền pháo hoa */}
      <FireworkCanvas active={true} />

      {/* Trang trí góc */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-orange-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Header: Năm và Badge */}
      <div className="relative z-10 flex flex-col items-center gap-2 pt-4">
        <div className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase animate-pulse">
          Năm Bính Ngọ 2026
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none text-center">
          HAPPY <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">NEW YEAR</span>
        </h1>
      </div>

      {/* Main Container: Linh vật và Lời chúc */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6">
        
        {/* Hình ảnh Linh vật (Horse 2026) */}
        <div className="relative group w-full max-w-md aspect-[16/9] md:aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-orange-500/10">
          <img 
            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=1000" 
            alt="Mã Đáo Thành Công 2026"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-0 w-full text-center">
             <div className="flex items-center justify-center gap-2 text-orange-400 font-space font-bold italic tracking-widest text-lg">
                <Rocket className="w-5 h-5" />
                MÃ ĐÁO THÀNH CÔNG
             </div>
          </div>
        </div>

        {/* Khung lời chúc AI */}
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[2.5rem] flex flex-col items-center gap-4 text-center">
          <div className="min-h-[60px] md:min-h-[80px] flex items-center justify-center">
            {loading ? (
              <div className="flex items-center gap-2 text-orange-400 animate-pulse text-sm md:text-base">
                <Sparkles className="animate-spin w-4 h-4" />
                <span>AI đang khởi tạo vận may...</span>
              </div>
            ) : (
              <p className="text-base md:text-xl font-medium italic text-slate-200 leading-relaxed px-2">
                {wish || "Chạm vào nút bên dưới để nhận thông điệp năm mới từ trí tuệ nhân tạo."}
              </p>
            )}
          </div>

          <button 
            onClick={getNewWish}
            disabled={loading}
            className="group relative px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center gap-2 shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="relative z-10 w-4 h-4 fill-current" />
            <span className="relative z-10 text-sm">NHẬN LỜI CHÚC 2026</span>
          </button>
        </div>
      </div>

      {/* Footer: Countdown & Copyright */}
      <div className="relative z-10 w-full flex flex-col items-center gap-4 pb-4">
        <div className="scale-75 md:scale-90 origin-bottom">
          <CountdownTimer targetDate="2026-01-01T00:00:00" />
        </div>
        <p className="text-[10px] tracking-[0.2em] text-slate-500 font-bold uppercase">
          Nexus Vision 2026 • AI Powered Experience
        </p>
      </div>
    </div>
  );
};

export default App;
