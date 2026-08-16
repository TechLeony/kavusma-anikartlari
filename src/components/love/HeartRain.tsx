import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";

type Particle = { id: number; x: number; size: number; duration: number; delay: number };

let counter = 0;

export function useHeartRain() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback(() => {
    const next: Particle[] = Array.from({ length: 26 }, () => ({
      id: counter++,
      x: Math.random() * 100,
      size: 16 + Math.random() * 32,
      duration: 2.6 + Math.random() * 2.2,
      delay: Math.random() * 0.8,
    }));
    setParticles((prev) => [...prev, ...next]);
    window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !next.some((n) => n.id === p.id)));
    }, 5200);
  }, []);

  const overlay = (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40, scale: 0.4 }}
            animate={{ opacity: [0, 1, 1, 0], y: -window.innerHeight - 80, scale: 1, rotate: [0, 18, -14, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
            style={{ left: `${p.x}%`, bottom: -40 }}
            className="absolute text-rose-deep"
          >
            <Heart style={{ width: p.size, height: p.size }} className="fill-current opacity-80" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return { burst, overlay };
}
