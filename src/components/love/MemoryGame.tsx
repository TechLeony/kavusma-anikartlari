import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart, Image, RotateCcw } from "lucide-react";

export const MEMORY_IMAGES = [
  {
    id: "memory-1",
    src: "/photos/memory-1.jpeg",
    alt: "Birinci hafıza fotoğrafı",
  },
  {
    id: "memory-2",
    src: "/photos/memory-2.jpeg",
    alt: "İkinci hafıza fotoğrafı",
  },
  {
    id: "memory-3",
    src: "/photos/memory-3.jpeg",
    alt: "Üçüncü hafıza fotoğrafı",
  },
  {
    id: "memory-4",
    src: "/photos/memory-4.jpeg",
    alt: "Dördüncü hafıza fotoğrafı",
  },
  {
    id: "memory-5",
    src: "/photos/memory-5.jpeg",
    alt: "Beşinci hafıza fotoğrafı",
  },
  {
    id: "memory-6",
    src: "/photos/memory-6.jpeg",
    alt: "Altıncı hafıza fotoğrafı",
  },
  {
    id: "memory-7",
    src: "/photos/memory-7.jpeg",
    alt: "Yedinci hafıza fotoğrafı",
  },
  {
    id: "memory-8",
    src: "/photos/memory-8.jpeg",
    alt: "Sekizinci hafıza fotoğrafı",
  },
];

type Card = { id: number; pair: number };

function shuffle(): Card[] {
  const deck = MEMORY_IMAGES.flatMap((_, i) => [
    { id: i * 2, pair: i },
    { id: i * 2 + 1, pair: i },
  ]);
  return deck.sort(() => Math.random() - 0.5);
}

export function MemoryGame({ onWin }: { onWin: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => setCards(shuffle()), []);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const a = flipped[0]!;
    const b = flipped[1]!;
    const cardA = cards.find((c) => c.id === a);
    const cardB = cards.find((c) => c.id === b);
    const id = window.setTimeout(() => {
      if (cardA && cardB && cardA.pair === cardB.pair) {
        setMatched((prev) => [...prev, a, b]);
      }
      setFlipped([]);
      setMoves((m) => m + 1);
    }, 700);
    return () => clearTimeout(id);
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length === 0 || matched.length !== cards.length) return;
    const id = window.setTimeout(onWin, 500);
    return () => clearTimeout(id);
  }, [matched, cards, onWin]);

  const reset = () => {
    setCards(shuffle());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-rose-deep">Eslestirrr bizii</h3>
        </div>
        <button
          onClick={reset}
          aria-label="Oyunu yeniden başlat"
          className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground transition hover:bg-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" /> {moves} hamle
        </button>
      </div>

      <div className="mt-4 grid w-full grid-cols-4 gap-1.5 sm:gap-3">
        {cards.map((card) => {
          const isOpen = flipped.includes(card.id) || matched.includes(card.id);
          const photo = MEMORY_IMAGES[card.pair];
          return (
            <motion.button
              key={card.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                if (isOpen || flipped.length === 2) return;
                setFlipped((prev) => [...prev, card.id]);
              }}
              aria-label="Kartı çevir"
              className={`relative aspect-square overflow-hidden rounded-xl transition-colors sm:rounded-2xl ${
                isOpen ? "bg-card shadow-soft" : "gradient-romantic"
              }`}
            >
              <motion.div
                animate={{ rotateY: isOpen ? 0 : 180, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {photo ? (
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                ) : (
                  <Image className="h-6 w-6 text-rose-deep sm:h-8 sm:w-8" />
                )}
              </motion.div>
              {!isOpen && (
                <Heart className="absolute inset-0 m-auto h-5 w-5 text-primary-foreground/70 sm:h-6 sm:w-6" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
