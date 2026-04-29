import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const Cake = () => {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const allOut = candles.every(c => !c);

  const blowCandle = (index: number) => {
    if (!candles[index]) return;
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.every(c => !c)) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff1493', '#ff69b4', '#ffd700']
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff1493', '#ff69b4', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section id="cake" className="py-24 flex flex-col items-center justify-center min-h-[80vh] relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl text-primary font-bold text-glow" style={{ fontFamily: 'var(--font-serif)' }}>
          Make a Wish
        </h2>
        <p className="text-lg text-muted-foreground mt-2">Click each candle to blow it out.</p>
      </motion.div>

      <div className="relative w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-end group">
        {/* Candles Container */}
        <div className="absolute top-10 flex justify-center space-x-6 w-full z-20 px-8">
          {candles.map((isLit, idx) => (
            <motion.div 
              key={idx}
              className="relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => blowCandle(idx)}
            >
              {/* Flame */}
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0, y: 10 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-8 bg-yellow-400 rounded-full animate-flicker shadow-[0_0_15px_#ffd700] mix-blend-screen"
                    style={{ filter: 'blur(1px)' }}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-orange-500 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Candle Stick */}
              <div className="w-3 h-16 bg-gradient-to-r from-pink-200 to-pink-100 rounded-t-sm shadow-md border-b-0 border border-white/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,20,147,0.2)_5px,rgba(255,20,147,0.2)_10px)]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cake Top */}
        <div className="w-[80%] h-12 bg-pink-300 rounded-[50%] absolute bottom-32 z-10 shadow-[inset_0_-5px_10px_rgba(0,0,0,0.1)] border border-pink-200" />
        
        {/* Frosting Drips */}
        <div className="w-full absolute bottom-28 z-10 flex justify-around px-4 drop-shadow-md">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-6 h-8 bg-pink-300 rounded-b-full shadow-sm" style={{ height: `${20 + Math.random() * 20}px` }} />
          ))}
        </div>

        {/* Cake Body Base */}
        <div className="w-[80%] h-32 bg-gradient-to-b from-pink-400 to-pink-500 rounded-b-[20px] relative z-0 shadow-xl border border-pink-400/50 flex flex-col justify-center gap-4">
           {/* Decorative lines */}
           <div className="w-full h-2 bg-pink-300/50" />
           <div className="w-full h-2 bg-pink-300/50" />
        </div>

        {/* Cake Stand */}
        <div className="w-[90%] h-6 bg-white/20 backdrop-blur-sm rounded-[50%] absolute -bottom-2 z-0 border border-white/30 shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
      </div>

      <AnimatePresence>
        {allOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-primary/50 text-center shadow-[0_0_50px_rgba(255,20,147,0.4)] z-30"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-glow-gold text-yellow-400 mb-4" style={{ fontFamily: 'var(--font-script)' }}>
              Your wish is my command! ✨
            </h3>
            <p className="text-xl text-white">Happy Birthday, my everything.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
