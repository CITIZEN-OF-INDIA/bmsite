import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const LoveTimer = () => {
  const [time, setTime] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Arbitrary past date: 2022-07-15
    const startDate = new Date('2022-07-15T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Rough approximation for years/months
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const exactDays = remainingDays % 30;

      setTime({
        years, months, days: exactDays, hours, minutes, seconds
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center p-4 glass-panel rounded-2xl min-w-[100px]">
      <motion.span 
        key={value}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-mono font-bold text-glow text-white"
      >
        {value.toString().padStart(2, '0')}
      </motion.span>
      <span className="text-xs uppercase tracking-widest text-primary mt-2">{label}</span>
    </div>
  );

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif text-pink-200 mb-12"
        >
          Time since I fell for you
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TimeUnit label="Years" value={time.years} />
          <TimeUnit label="Months" value={time.months} />
          <TimeUnit label="Days" value={time.days} />
          <TimeUnit label="Hours" value={time.hours} />
          <TimeUnit label="Minutes" value={time.minutes} />
          <TimeUnit label="Seconds" value={time.seconds} />
        </div>

        <p className="mt-12 text-muted-foreground font-serif italic">
          And every second has been the best of my life.
        </p>
      </div>
    </section>
  );
};
