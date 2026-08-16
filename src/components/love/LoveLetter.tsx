import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, X, Lock } from "lucide-react";

const LETTER = [
  "Sevgili Derya'm,",
  "Bugün birlikteliğimizin 15. ayı. Aramızdaki mesafeyi ölçen haritalar var ama kalbimin sana olan yakınlığını ölçebilen hiçbir şey yok. Sabah gözlerimi açtığımda ilk düşündüğüm, gece uyurken son gülümsediğim sensin.",
  "Bazı günler zor, biliyorum. Ekranlara sarılmak yetmiyor, sesin yerine gelen sinyaller yetmiyor. Ama her 'iyi geceler aşkım' mesajın bana bir gün daha güç veriyor. Sen benim en huzurlu limanımsın.",
  "Sana bir söz veriyorum: Bu mesafe geçici, biz kalıcıyız. Kavuşacağımız gün seni öyle bir sarmalayacağım ki geçen bütün aylar tek bir nefeste eriyecek.",
  "15 ay geride kaldı, önümüzde koca bir ömür var. İyi ki varsın, iyi ki benimsin.",
  "Sonsuz sevgiyle,\nJavanshir ❤️",
];

export function LoveLetter({ unlocked }: { unlocked: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: unlocked ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => unlocked && setOpen(true)}
        className={`glass-card relative mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-3xl px-6 py-10 text-center ${
          unlocked ? "cursor-pointer" : "cursor-not-allowed opacity-80"
        }`}
      >
        <div className="gradient-romantic grid h-20 w-28 place-items-center rounded-2xl shadow-soft">
          {unlocked ? (
            <Mail className="h-10 w-10 text-rose-deep" />
          ) : (
            <Lock className="h-9 w-9 text-rose-deep" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-rose-deep sm:text-2xl">Sana Özel Mektup</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          {unlocked
            ? "Zarf açılmaya hazır. Dokun ve kalbimi oku."
            : "Tüm fotoğrafların şifresini çöz, mektup kendiliğinden açılacak."}
        </p>
        {unlocked && (
          <span className="gradient-deep rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground">
            Mektubu Aç
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-rose-deep/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, rotateX: -8 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-cream p-6 shadow-glow sm:p-10"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Mektubu kapat"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-secondary text-rose-deep transition hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
              <h4 className="font-script text-3xl text-rose-deep sm:text-4xl">Aşkıma…</h4>
              <div className="letter-scroll mt-5 max-h-[55vh] space-y-4 overflow-y-auto pr-4 text-[15px] leading-relaxed text-foreground/85">
                {LETTER.map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
