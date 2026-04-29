import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useEffect } from "react";
import confetti from "canvas-confetti";

import { GrandEntry } from "./components/sections/GrandEntry";
import { LoveLetter } from "./components/sections/LoveLetter";
import { Gallery } from "./components/sections/Gallery";
import { Cake } from "./components/sections/Cake";
import { Games } from "./components/sections/Games";
import { ReasonsILoveYou } from "./components/sections/ReasonsILoveYou";
import { LoveTimer } from "./components/sections/LoveTimer";
import { FinalSurprise } from "./components/sections/FinalSurprise";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <GrandEntry />
      <LoveLetter />
      <Gallery />
      <ReasonsILoveYou />
      <Cake />
      <Games />
      <LoveTimer />
      <FinalSurprise />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Periodic random confetti burst (every 25-40 seconds)
    const triggerRandomConfetti = () => {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff1493', '#ff69b4', '#ffb6c1']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff1493', '#ff69b4', '#ffb6c1']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();

      const nextTimeout = Math.random() * (40000 - 25000) + 25000;
      setTimeout(triggerRandomConfetti, nextTimeout);
    };

    const initialTimeout = Math.random() * (40000 - 25000) + 25000;
    const timerId = setTimeout(triggerRandomConfetti, initialTimeout);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <FloatingHearts />
          <MusicPlayer />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
