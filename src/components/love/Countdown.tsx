import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Plane } from "lucide-react";

const REUNION_DATE = new Date("2026-09-15T18:00:00+03:00");

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    gün: Math.floor(ms / 86400000),
    saat: Math.floor((ms / 3600000) % 24),
    dakika: Math.floor((ms / 60000) % 60),
    saniye: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(REUNION_DATE));
    const id = setInterval(() => setTime(diff(REUNION_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const items: [string, number][] = time
    ? [
        ["Gün", time.gün],
        ["Saat", time.saat],
        ["Dakika", time.dakika],
        ["Saniye", time.saniye],
      ]
    : [
        ["Gün", 0],
        ["Saat", 0],
        ["Dakika", 0],
        ["Saniye", 0],
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass-card mx-auto w-full max-w-xl rounded-3xl p-5 sm:p-7"
    >
      <div className="mb-4 flex items-center justify-center gap-2 text-rose-deep">
        <Plane className="h-5 w-5 shrink-0" />
        <h2 className="text-lg font-semibold sm:text-xl">Kavuşmamıza Kalan Süre</h2>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl bg-secondary/70 px-1 py-3 text-center sm:py-4"
          >
            <motion.p
              key={`${label}-${value}`}
              initial={{ scale: 0.8, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-display text-2xl font-bold text-rose-deep sm:text-4xl"
            >
              {String(value).padStart(2, "0")}
            </motion.p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Her saniye, sarılmamıza bir adım daha yakın 💌
      </p>
    </motion.div>
  );
}
