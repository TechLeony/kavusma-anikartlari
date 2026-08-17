import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";

type Balloon = { id: number; x: number; duration: number; size: number; color: string };

const TARGET = 15;
const BALLOON_COLORS = [
  "#f9a8d4",
  "#fbcfe8",
  "#c4b5fd",
  "#bae6fd",
  "#bbf7d0",
  "#fde68a",
  "#fecaca",
];

export function BalloonGame({ onWin }: { onWin: () => void }) {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const counter = useRef(0);
  const won = useRef(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      counter.current += 1;
      const b: Balloon = {
        id: counter.current,
        x: 6 + Math.random() * 82,
        duration: 3.6 + Math.random() * 2.4,
        size: 30 + Math.random() * 22,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)] ?? "#fbcfe8",
      };
      setBalloons((prev) => [...prev, b]);
      window.setTimeout(() => {
        setBalloons((prev) => prev.filter((p) => p.id !== b.id));
      }, b.duration * 1000);
    }, 620);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (score >= TARGET && !won.current) {
      won.current = true;
      setRunning(false);
      setBalloons([]);
      onWin();
    }
  }, [score, onWin]);

  const start = () => {
    won.current = false;
    setScore(0);
    setBalloons([]);
    setRunning(true);
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-rose-deep">Bebisiminn balonlarıııı</h3>
          <p className="text-xs text-muted-foreground">
            Hadii {TARGET} balon patlat daa, hediyee kapp
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground">
          {score} / {TARGET}
        </span>
      </div>

      <div className="relative mt-4 h-64 overflow-hidden rounded-2xl bg-secondary/50 sm:h-72">
        <AnimatePresence>
          {balloons.map((b) => (
            <motion.button
              key={b.id}
              initial={{ y: 280, opacity: 0 }}
              animate={{ y: -80, opacity: 1, x: [0, 12, -12, 0] }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: b.duration, ease: "linear" }}
              style={{ left: `${b.x}%` }}
              onClick={() => {
                setBalloons((prev) => prev.filter((p) => p.id !== b.id));
                setScore((s) => s + 1);
              }}
              aria-label="Balonu patlat"
              className="absolute bottom-0"
            >
              <span
                className="relative block rounded-full drop-shadow-md"
                style={{ width: b.size, height: b.size * 1.2, backgroundColor: b.color }}
              >
                <span className="absolute left-1/4 top-1/5 h-2 w-2 rounded-full bg-white/60" />
                <span
                  className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2"
                  style={{
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: `8px solid ${b.color}`,
                  }}
                />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>

        {!running && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={start}
              className="gradient-deep flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
            >
              <Play className="h-4 w-4" /> {score >= TARGET ? "Tekrar Oyna" : "Başla"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
