import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const GrandEntry = () => {
  const [text, setText] = useState("");
  const fullText = "Every moment with you is a celebration...";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    document.getElementById("love-letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="grand-entry" className="relative min-h-screen flex flex-col items-center justify-center text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 bg-shine text-glow animate-gradient-x px-4 py-2 leading-tight">
          HAPPY BIRTHDAY<br />MY LOVE
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="h-16 mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-pink-300 italic">
          {text}
          <span className="animate-pulse">|</span>
        </h2>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToNext}
        className="animate-pulse-glow px-8 py-4 bg-primary text-white rounded-full font-bold text-xl md:text-2xl shadow-[0_0_20px_rgba(255,20,147,0.5)] border border-white/20 backdrop-blur-md transition-all z-10"
      >
        Click to Enter My Heart 💖
      </motion.button>
    </section>
  );
};
