import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, Heart, Loader2, Sparkles, X } from "lucide-react";

export type Photo = {
  id: string;
  url: string;
  caption: string;
};

export const GALLERY_PHOTOS: Photo[] = [
  {
    id: "gallery-1",
    url: "/photos/gallery-1.jpeg",
    caption: "Asigimm sanaa ❤️",
  },
  {
    id: "gallery-2",
    url: "/photos/gallery-2.jpeg",
    caption: "I'll love u FOR EVER 💘",
  },
  {
    id: "gallery-3",
    url: "/photos/gallery-3.jpeg",
    caption: "coook tatliyizz 🥰",
  },
];

export function Gallery() {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<Photo | null>(null);

  const revealPhotos = () => {
    if (loading || revealed) return;
    setLoading(true);
    window.setTimeout(() => {
      setRevealed(true);
      setLoading(false);
    }, 1700);
  };

  return (
    <>
      {!revealed ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl p-7 text-center"
        >
          <div className="gradient-romantic grid h-16 w-16 place-items-center rounded-2xl shadow-soft">
            {loading ? (
              <Loader2 className="h-7 w-7 animate-spin text-rose-deep" />
            ) : (
              <Camera className="h-7 w-7 text-rose-deep" />
            )}
          </div>
          <h3 className="mt-4 text-xl font-semibold text-rose-deep">Bakk bakiimmm bizee</h3>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.p
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-3 text-sm font-semibold text-rose-deep"
              >
                seni coookk seviyorumm asktanemm... ❤️
              </motion.p>
            ) : (
              <motion.p
                key="ready"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-3 max-w-md text-sm text-muted-foreground"
              >
                nomm nommm nomm
              </motion.p>
            )}
          </AnimatePresence>
          <button
            onClick={revealPhotos}
            disabled={loading}
            className="gradient-deep mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-70"
          >
            <Sparkles className="h-4 w-4" /> Aççç
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.18, duration: 0.5 }}
              className="glass-card overflow-hidden rounded-3xl"
            >
              <button
                onClick={() => setActive(photo)}
                className="block w-full overflow-hidden bg-secondary/50 p-3"
                aria-label={`${photo.caption} büyüt`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="aspect-4/5 w-full rounded-2xl object-contain transition duration-500 hover:scale-[1.02]"
                />
              </button>
              <figcaption className="flex items-start gap-2 p-4 text-sm font-semibold text-rose-deep">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-current text-rose-deep" />
                <span>{photo.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-rose-deep/85 p-3 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Kapat"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-card text-rose-deep shadow-soft"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={active.url}
              alt={active.caption}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-4xl rounded-3xl object-contain shadow-glow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
