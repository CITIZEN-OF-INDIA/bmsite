import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const CatchLove = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHearts((prev) => {
        if (prev.length > 5) return prev;
        return [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
          },
        ];
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const catchHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((s) => s + 1);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
    setIsPlaying(true);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
      {!isPlaying && timeLeft === 30 && (
        <div className="text-center z-10">
          <h3 className="text-2xl font-bold mb-4 text-primary">Catch My Love</h3>
          <p className="text-muted-foreground mb-6">Catch as many hearts as you can in 30 seconds!</p>
          <button onClick={startGame} className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors">
            Start Game
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-4 left-4 text-xl font-bold text-primary">Score: {score}</div>
          <div className="absolute top-4 right-4 text-xl font-bold text-yellow-400">{timeLeft}s</div>
          
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.button
                key={h.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => catchHeart(h.id)}
                className="absolute text-primary hover:text-white transition-colors"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <Heart size={48} fill="currentColor" className="animate-pulse" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isPlaying && timeLeft <= 0 && (
        <div className="text-center z-10">
          <h3 className="text-3xl font-bold mb-4 text-primary text-glow">Time's Up!</h3>
          <p className="text-xl text-white mb-2">You caught <span className="font-bold text-2xl text-yellow-400">{score}</span> hearts!</p>
          <p className="text-muted-foreground italic mb-6">But honestly, you already have my whole heart anyway. 💖</p>
          <button onClick={startGame} className="px-6 py-3 bg-primary/20 border border-primary/50 text-white rounded-full hover:bg-primary/40 transition-colors">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const Quiz = () => {
  const questions = [
    { q: "What's my favorite thing about you?", opts: ["Your smile", "Your laugh", "Everything", "All of the above"], a: 3 },
    { q: "Who loves who more?", opts: ["I love you more", "You love me more", "It's a tie", "Nope, definitely me"], a: 0 },
    { q: "What's the best day of my life?", opts: ["The day we met", "Today", "Every day with you", "When you said yes to me"], a: 2 },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl min-h-[400px] flex flex-col items-center justify-center text-center">
      {!finished ? (
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <h3 className="text-2xl font-bold mb-8 text-primary">{questions[currentQ].q}</h3>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQ].opts.map((opt, i) => (
              <button
                key={i}
                onClick={handleAnswer}
                className="p-4 rounded-xl bg-background/50 border border-white/10 hover:border-primary hover:bg-primary/10 transition-all text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-4xl font-bold text-glow text-primary mb-4" style={{ fontFamily: 'var(--font-script)' }}>
            You pass! (You always do)
          </h3>
          <p className="text-xl text-white">You own my heart completely. 💘</p>
        </motion.div>
      )}
    </div>
  );
};

export const Games = () => {
  const [tab, setTab] = useState<"catch" | "quiz">("catch");

  return (
    <section id="games" className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Play With My Heart</h2>
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setTab("catch")}
            className={`px-6 py-2 rounded-full font-bold transition-all ${tab === "catch" ? "bg-primary text-white shadow-lg shadow-primary/50" : "bg-muted text-muted-foreground"}`}
          >
            Catch Love
          </button>
          <button
            onClick={() => setTab("quiz")}
            className={`px-6 py-2 rounded-full font-bold transition-all ${tab === "quiz" ? "bg-primary text-white shadow-lg shadow-primary/50" : "bg-muted text-muted-foreground"}`}
          >
            Love Quiz
          </button>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {tab === "catch" ? (
            <motion.div key="catch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CatchLove />
            </motion.div>
          ) : (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
