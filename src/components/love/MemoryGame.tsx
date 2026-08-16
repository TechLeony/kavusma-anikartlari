import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart, Gift, Music, Star, Moon, Sparkles, RotateCcw } from "lucide-react";

const ICONS = [Heart, Gift, Music, Star, Moon, Sparkles];

type Card = { id: number; icon: number };

function shuffle(): Card[] {
  const deck = ICONS.flatMap((_, i) => [
    { id: i * 2, icon: i },
    { id: i * 2 + 1, icon: i },
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
      if (cardA && cardB && cardA.icon === cardB.icon) {
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
          <h3 className="truncate text-lg font-semibold text-rose-deep">Hafıza Kartları</h3>
          <p className="text-xs text-muted-foreground">Eşleşen kalpleri bul, ipucunu kazan.</p>
        </div>
        <button
          onClick={reset}
          aria-label="Oyunu yeniden başlat"
          className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground transition hover:bg-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" /> {moves} hamle
        </button>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => {
          const isOpen = flipped.includes(card.id) || matched.includes(card.id);
          const Icon = ICONS[card.icon] ?? Heart;
          return (
            <motion.button
              key={card.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                if (isOpen || flipped.length === 2) return;
                setFlipped((prev) => [...prev, card.id]);
              }}
              aria-label="Kartı çevir"
              className={`relative aspect-square rounded-2xl transition-colors ${
                isOpen ? "bg-card shadow-soft" : "gradient-romantic"
              }`}
            >
              <motion.div
                animate={{ rotateY: isOpen ? 0 : 180, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Icon className="h-6 w-6 text-rose-deep sm:h-8 sm:w-8" />
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
