import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const FinalSurprise = () => {
  const [revealed, setRevealed] = useState(false);

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffffff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffffff']
      });
    }, 250);
  };

  const handleReveal = () => {
    setRevealed(true);
    triggerFireworks();
  };

  return (
    <section className="min-h-screen py-24 flex items-center justify-center relative">
      {!revealed ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReveal}
          className="px-10 py-6 bg-red-600 hover:bg-red-500 text-white rounded-full font-black text-2xl md:text-4xl shadow-[0_0_40px_rgba(220,38,38,0.8)] border border-red-400 animate-pulse-glow uppercase tracking-widest z-10"
        >
          DON'T CLICK THIS 😳❤️ !! BUT I KNOW YOU WILL!! OK GO AHEAD MURGI!
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 text-center backdrop-blur-xl"
          >
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-8xl font-black text-glow bg-shine mb-8 leading-tight px-4"
            >
              You are the bestESTTTT OF THEE BESTTTTTTT PERSON <br/> in my life.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-2xl md:text-4xl font-serif text-pink-200 italic max-w-3xl leading-relaxed"
            >
              Happy Birthday MERI RASMALAI. I love you more than words can ever say. 
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              onClick={triggerFireworks}
              className="mt-16 px-6 py-2 border border-white/20 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              CLICK AS MANY TIMES AS U WANT!
            </motion.button>

            {/* Erupting background hearts */}
            <div className="absolute bottom-0 w-full flex justify-center pointer-events-none">
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ y: 0, opacity: 1, scale: 0.5 }}
                   animate={{ 
                     y: -window.innerHeight - 100, 
                     opacity: 0,
                     x: (Math.random() - 0.5) * window.innerWidth
                   }}
                   transition={{ 
                     duration: 2 + Math.random() * 3, 
                     repeat: Infinity,
                     delay: Math.random() * 2 
                   }}
                   className="absolute bottom-0 text-primary text-4xl"
                 >
                   ❤️
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};
