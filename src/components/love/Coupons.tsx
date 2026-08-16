import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Film, PhoneCall, HandHeart, Coffee, Music4, Sparkles, Check } from "lucide-react";

const COUPONS = [
  { id: "c1", title: "Sınırsız Sarılma Kuponu", desc: "Kavuştuğumuz an, saat sınırı yok.", Icon: HandHeart },
  { id: "c2", title: "En Sevdiğin Filmi Seçme Hakkı", desc: "İtiraz etmeden izliyorum, söz.", Icon: Film },
  { id: "c3", title: "Görüntülü Arama Ziyafeti", desc: "Sabaha kadar kapatmıyoruz.", Icon: PhoneCall },
  { id: "c4", title: "Sabah Kahvesi Eşliği", desc: "Uzaktan da olsa aynı fincan keyfi.", Icon: Coffee },
  { id: "c5", title: "Şarkı İsteme Kuponu", desc: "Sana özel çalma listesi hazır.", Icon: Music4 },
  { id: "c6", title: "Bir Dilek Hakkı", desc: "Ne istersen, sorgusuz.", Icon: Sparkles },
];

const CONFETTI = Array.from({ length: 18 }, (_, i) => i);

export function Coupons() {
  const [used, setUsed] = useState<string[]>([]);
  const [celebrating, setCelebrating] = useState<string | null>(null);

  const redeem = (id: string) => {
    setUsed((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setCelebrating(id);
    window.setTimeout(() => setCelebrating((c) => (c === id ? null : c)), 1400);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COUPONS.map(({ id, title, desc, Icon }, index) => {
        const isUsed = used.includes(id);
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="glass-card relative overflow-hidden rounded-3xl p-5"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="gradient-romantic grid h-11 w-11 shrink-0 place-items-center rounded-2xl">
                <Icon className="h-5 w-5 text-rose-deep" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-rose-deep">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>

            <button
              onClick={() => redeem(id)}
              disabled={isUsed}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                isUsed
                  ? "bg-secondary text-secondary-foreground"
                  : "gradient-deep text-primary-foreground hover:brightness-110"
              }`}
            >
              {isUsed ? (
                <>
                  <Check className="h-4 w-4" /> Kullanıldı
                </>
              ) : (
                "Kullan"
              )}
            </button>

            <AnimatePresence>
              {celebrating === id && (
                <motion.div exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0">
                  {CONFETTI.map((c) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 1, x: "50%", y: "70%", scale: 0.6 }}
                      animate={{
                        opacity: 0,
                        x: `${10 + Math.random() * 80}%`,
                        y: `${Math.random() * 40}%`,
                        rotate: Math.random() * 360,
                        scale: 1,
                      }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`absolute h-2 w-2 rounded-sm ${
                        c % 3 === 0 ? "bg-rose-deep" : c % 3 === 1 ? "bg-rose-soft" : "bg-gold"
                      }`}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
