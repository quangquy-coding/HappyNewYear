
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-3 md:gap-6">
      <TimeBox value={timeLeft.days} label="Ngày" />
      <TimeBox value={timeLeft.hours} label="Giờ" />
      <TimeBox value={timeLeft.minutes} label="Phút" />
      <TimeBox value={timeLeft.seconds} label="Giây" />
    </div>
  );
};

const TimeBox: React.FC<{ value: number, label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-1 shadow-xl">
      <span className="text-xl md:text-4xl font-black font-space text-white">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[8px] md:text-[10px] tracking-widest font-bold text-slate-500 uppercase">{label}</span>
  </div>
);

export default CountdownTimer;
