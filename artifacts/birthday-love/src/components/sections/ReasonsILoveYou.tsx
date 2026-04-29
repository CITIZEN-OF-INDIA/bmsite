import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REASONS = [
  "Because you make the mundane moments feel extraordinary.",
  "Your smile instantly brightens up my darkest days.",
  "You support my crazy dreams and believe in me.",
  "The way you scrunch your nose when you laugh.",
  "Because you are incredibly kind to everyone you meet.",
  "You give the absolute best hugs.",
  "We can talk for hours or sit in silence and it's perfect.",
  "Your passion and drive inspire me to be better.",
  "Because you remember the little details about me.",
  "You're not just my partner, you're my bestestt wifeyyyyyyy.",
  "The way you look at me makes me feel invincible.",
  "Because loving you is the easiest thing I've ever done."
];

export const ReasonsILoveYou = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REASONS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % REASONS.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + REASONS.length) % REASONS.length);
  };

  return (
    <section className="py-24 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-primary/5 skew-y-3 origin-top-left -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-primary mb-16 text-glow"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          12 Reasons I Love You
        </motion.h2>

        <div className="relative h-64 md:h-80 flex items-center justify-center perspective-1000">
          <button 
            onClick={prev}
            className="absolute left-0 md:left-10 z-20 p-3 rounded-full bg-background/50 border border-white/10 hover:bg-primary/20 hover:text-primary transition-all"
          >
            <ChevronLeft size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-lg glass-panel p-8 md:p-12 rounded-3xl absolute flex flex-col items-center justify-center text-center shadow-2xl border-primary/30"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <span className="text-5xl md:text-7xl text-primary/20 absolute top-4 left-4 font-serif">"</span>
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-white relative z-10">
                {REASONS[currentIndex]}
              </p>
              <span className="text-5xl md:text-7xl text-primary/20 absolute bottom-0 right-4 font-serif">"</span>
              <div className="mt-8 text-sm text-primary font-bold tracking-widest uppercase">
                Reason {currentIndex + 1} of {REASONS.length}
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={next}
            className="absolute right-0 md:right-10 z-20 p-3 rounded-full bg-background/50 border border-white/10 hover:bg-primary/20 hover:text-primary transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {REASONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? "bg-primary scale-125" : "bg-white/20 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
