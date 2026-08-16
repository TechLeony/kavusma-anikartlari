import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Sparkles, Gamepad2, Images, Ticket } from "lucide-react";

import { Countdown } from "@/components/love/Countdown";
import { useHeartRain } from "@/components/love/HeartRain";
import { MemoryGame } from "@/components/love/MemoryGame";
import { BalloonGame } from "@/components/love/BalloonGame";
import { Gallery, PHOTOS } from "@/components/love/Gallery";
import { LoveLetter } from "@/components/love/LoveLetter";
import { Coupons } from "@/components/love/Coupons";
import { VictoryDialog } from "@/components/love/VictoryDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "15. Ayımız Kutlu Olsun — Derya & Javanshir" },
      {
        name: "description",
        content:
          "Derya ve Javanshir'in 15. ay yıl dönümü için hazırlanmış romantik sürpriz: geri sayım, mini oyunlar, kilitli fotoğraf galerisi, aşk mektubu ve dijital kuponlar.",
      },
      { property: "og:title", content: "15. Ayımız Kutlu Olsun — Derya & Javanshir" },
      {
        property: "og:description",
        content:
          "Uzak mesafe aşkına özel interaktif sürpriz: geri sayım, oyunlar, gizli şifreli fotoğraflar ve sana özel mektup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: Index,
});

function Section({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: typeof Heart;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14"
    >
      <div className="mb-6 flex min-w-0 items-center gap-3">
        <div className="gradient-romantic grid h-11 w-11 shrink-0 place-items-center rounded-2xl shadow-soft">
          <Icon className="h-5 w-5 text-rose-deep" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-rose-deep sm:text-2xl">{title}</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function Index() {
  const { burst, overlay } = useHeartRain();
  const [unlockedPhotos, setUnlockedPhotos] = useState<string[]>([]);
  const [victory, setVictory] = useState<{ title: string; code: string } | null>(null);

  const onMemoryWin = useCallback(() => {
    setVictory({ title: "Tüm kalpleri eşleştirdin!", code: "15.05.2025" });
  }, []);

  const onBalloonWin = useCallback(() => {
    setVictory({ title: "Balonların hepsi senin!", code: "SONSUZUM" });
  }, []);

  const allUnlocked = unlockedPhotos.length === PHOTOS.length;

  return (
    <main className="min-h-screen overflow-x-hidden pb-16">
      {overlay}

      <header className="relative mx-auto w-full max-w-5xl px-4 pt-14 text-center sm:pt-20">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-2xl text-rose-soft sm:text-3xl"
        >
          Uzak ama hep yanında
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-gradient-rose mx-auto mt-3 max-w-3xl text-3xl leading-tight font-bold sm:text-5xl"
        >
          15. Ayımız Kutlu Olsun, Derya &amp; Javanshir! ❤️
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
        >
          Bu küçük dünya sadece bizim için: oyunlar oyna, şifreleri çöz, anıları aç ve sonunda
          sana yazdığım mektubu oku.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={burst}
          className="gradient-deep mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow sm:text-base"
        >
          <Heart className="h-5 w-5 fill-current" /> Seni Çok Özledim
        </motion.button>

        <div className="mt-10">
          <Countdown />
        </div>
      </header>

      <Section
        icon={Gamepad2}
        title="Mini Oyunlar"
        subtitle="Her oyunu kazandığında gizli bir ipucu açılıyor."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <MemoryGame onWin={onMemoryWin} />
          <BalloonGame onWin={onBalloonWin} />
        </div>
      </Section>

      <Section
        icon={Images}
        title="Kilitli Fotoğraf Galerisi"
        subtitle={`Açılan anı: ${unlockedPhotos.length}/${PHOTOS.length} — doğru şifreyi yaz ve kalıcı olarak aç.`}
      >
        <Gallery
          unlocked={unlockedPhotos}
          onUnlock={(id) =>
            setUnlockedPhotos((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
        />
      </Section>

      <Section icon={Sparkles} title="Sana Özel Mektup" subtitle="Kalbimden sana, harf harf.">
        <LoveLetter unlocked={allUnlocked} />
      </Section>

      <Section
        icon={Ticket}
        title="Dijital Ödüller &amp; Kuponlar"
        subtitle="İstediğin an kullan, hepsi senin hakkın."
      >
        <Coupons />
      </Section>

      <footer className="mx-auto max-w-5xl px-4 text-center text-xs text-muted-foreground">
        <p className="font-script text-lg text-rose-soft">Seni seviyorum, sonsuza kadar.</p>
        <p className="mt-1">15 ay ve daha binlercesi… D &amp; J</p>
      </footer>

      <VictoryDialog
        open={victory !== null}
        title={victory?.title ?? ""}
        code={victory?.code ?? ""}
        onClose={() => setVictory(null)}
      />
    </main>
  );
}
