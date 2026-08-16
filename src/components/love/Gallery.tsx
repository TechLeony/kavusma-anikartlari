import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock, LockOpen, X, Heart } from "lucide-react";

export type Photo = {
  id: string;
  url: string;
  code: string;
  hint: string;
  caption: string;
};

export const PHOTOS: Photo[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
    code: "15.05.2025",
    hint: "Hafıza Kartları ipucu (tarih)",
    caption: "Her şeyin başladığı gün… O günden beri kalbim hep sende.",
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1200&q=80",
    code: "SONSUZUM",
    hint: "Aşk Balonları ipucu (kelime)",
    caption: "Aramızdaki kilometreler var ama sen hep bir nefes kadar yakınsın.",
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
    code: "15.05.2025",
    hint: "Hafıza Kartları ipucu (tarih)",
    caption: "15 ay, 15 bin gülüş, sayısız 'iyi geceler aşkım'.",
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1465495910306-9f5b1a3a0d9c?auto=format&fit=crop&w=1200&q=80",
    code: "SONSUZUM",
    hint: "Aşk Balonları ipucu (kelime)",
    caption: "Bir gün aynı şehirde, aynı masada, aynı kahvenin başında olacağız.",
  },
];

function normalize(value: string) {
  return value.trim().toLocaleUpperCase("tr-TR");
}

export function Gallery({
  unlocked,
  onUnlock,
}: {
  unlocked: string[];
  onUnlock: (id: string) => void;
}) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<Photo | null>(null);

  const tryUnlock = (photo: Photo) => {
    const value = normalize(inputs[photo.id] ?? "");
    if (value === normalize(photo.code)) {
      onUnlock(photo.id);
      setErrors((p) => ({ ...p, [photo.id]: false }));
    } else {
      setErrors((p) => ({ ...p, [photo.id]: true }));
    }
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {PHOTOS.map((photo, index) => {
          const isOpen = unlocked.includes(photo.id);
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={photo.url}
                  alt={isOpen ? photo.caption : "Kilitli romantik anı fotoğrafı"}
                  loading="lazy"
                  onClick={() => isOpen && setActive(photo)}
                  className={`h-full w-full object-cover transition duration-500 ${
                    isOpen ? "cursor-pointer hover:scale-105" : "scale-105 blur-lg brightness-90"
                  }`}
                />
                {!isOpen && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-rose-deep/25 text-primary-foreground">
                    <Lock className="h-8 w-8" />
                    <p className="px-4 text-center text-xs font-semibold">{photo.hint}</p>
                  </div>
                )}
                {isOpen && (
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-rose-deep">
                    <LockOpen className="h-3.5 w-3.5" /> Açıldı
                  </span>
                )}
              </div>

              <div className="p-4">
                {isOpen ? (
                  <p className="text-sm text-muted-foreground">{photo.caption}</p>
                ) : (
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                    <input
                      value={inputs[photo.id] ?? ""}
                      onChange={(e) => setInputs((p) => ({ ...p, [photo.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && tryUnlock(photo)}
                      placeholder="Şifre / tarih gir…"
                      aria-label="Gizli şifre"
                      className={`min-w-0 rounded-full border bg-card px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring ${
                        errors[photo.id] ? "border-destructive" : "border-border"
                      }`}
                    />
                    <button
                      onClick={() => tryUnlock(photo)}
                      className="gradient-deep shrink-0 rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                    >
                      Aç
                    </button>
                    {errors[photo.id] && (
                      <p className="col-span-2 text-xs text-destructive">
                        Olmadı aşkım, oyunlardan gelen ipucunu dene 💕
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-rose-deep/80 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-card shadow-glow"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Kapat"
                className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-card/90 text-rose-deep shadow-soft transition hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
              <img src={active.url} alt={active.caption} className="max-h-[70vh] w-full object-cover" />
              <figcaption className="flex items-start gap-2 p-5 text-sm text-muted-foreground">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-current text-rose-deep" />
                <span>{active.caption}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
