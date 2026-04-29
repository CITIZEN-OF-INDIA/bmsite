import confetti from 'canvas-confetti';

export const fireRandomConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff1493', '#9400d3', '#ffd700']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff1493', '#9400d3', '#ffd700']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

export const fireMassiveConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff1493', '#9400d3', '#ffd700'] });
  fire(0.2, { spread: 60, colors: ['#ff1493', '#9400d3', '#ffd700'] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ff1493', '#9400d3', '#ffd700'] });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#ff1493', '#9400d3', '#ffd700'] });
  fire(0.1, { spread: 120, startVelocity: 45, colors: ['#ff1493', '#9400d3', '#ffd700'] });
};
