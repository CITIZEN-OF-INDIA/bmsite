import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LetterLine = ({ children, delay }: { children: React.ReactNode, delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      className="mb-6 text-lg md:text-xl font-serif leading-relaxed"
    >
      {children}
    </motion.p>
  );
};

export const LoveLetter = () => {
  return (
    <section id="love-letter" className="min-h-screen py-24 px-4 flex justify-center items-center relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Decorative sparkles */}
        <div className="absolute top-20 left-10 text-4xl animate-pulse">✨</div>
        <div className="absolute top-40 right-20 text-3xl animate-float">💖</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-pulse-glow" style={{animationDelay: '1s'}}>🌟</div>
        <div className="absolute bottom-40 right-10 text-4xl animate-float" style={{animationDelay: '2s'}}>💝</div>
      </div>

      <div className="max-w-3xl w-full glass-panel p-8 md:p-12 rounded-[2rem] relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl text-primary mb-10 text-center text-glow"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          My Dearest...
        </motion.h2>

        <div className="text-white/90">
          <LetterLine delay={0.2}>
            Happy Birthday to the most incredible person in my life! 🎉 From the moment we met, you've brought a kind of magic into my world that I never knew existed.
          </LetterLine>
          
          <LetterLine delay={0.4}>
            I still smile every time I think about our little inside jokes, the way your eyes light up when you're excited, and even how you steal the covers at night. 😂❤️
          </LetterLine>

          <LetterLine delay={0.6}>
            You inspire me every single day. Your kindness, your strength, and your beautiful soul make me fall in love with you all over again, day after day.
          </LetterLine>

          <LetterLine delay={0.8}>
            I promise to always be by your side, to hold your hand through every adventure, and to make sure you know just how deeply you are loved. 🥺
          </LetterLine>

          <LetterLine delay={1.0}>
            Today is all about you. Here's to celebrating the masterpiece that is you, and to all the beautiful birthdays we'll share in the future. 🥂
          </LetterLine>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 text-right"
          >
            <p className="text-2xl md:text-4xl text-primary" style={{ fontFamily: 'var(--font-handwriting)' }}>
              Yours forever, <br />
              <span className="text-4xl">❤️</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
