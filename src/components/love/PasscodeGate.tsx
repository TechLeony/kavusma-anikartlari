import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, LockKeyhole } from "lucide-react";

const PASSCODE = "1705";
const UNLOCK_STORAGE_KEY = "derya-javanshir-unlocked";

export function PasscodeGate({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "true");
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code === PASSCODE) {
      setError(false);
      setOpening(true);
      window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
      window.setTimeout(() => {
        setUnlocked(true);
      }, 1200);
      return;
    }

    setError(true);
  };

  if (unlocked) return <>{children}</>;

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass-card relative w-full max-w-sm overflow-hidden rounded-3xl p-7 text-center shadow-glow"
      >
        <AnimatePresence>
          {opening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-card/85 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.35, 1], opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="grid place-items-center gap-3 text-rose-deep"
              >
                <Heart className="h-16 w-16 fill-current" />
                <p className="font-script text-3xl">aciliyorr...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="gradient-romantic mx-auto grid h-18 w-18 place-items-center rounded-3xl shadow-soft"
        >
          <LockKeyhole className="h-8 w-8 text-rose-deep" />
        </motion.div>

        <h1 className="text-gradient-rose mt-5 text-3xl leading-tight font-bold">
          Hayatiminnn askii bitanemmeee
        </h1>
        <p className="mt-3 text-sm font-semibold text-muted-foreground">
          Ipucu: evett deme tarihimizz
        </p>

        <input
          value={code}
          onChange={(event) => {
            setCode(event.target.value.replace(/\D/g, "").slice(0, 4));
            setError(false);
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          autoFocus
          aria-label="4 haneli passcode"
          className="mt-6 w-full rounded-2xl border border-rose-soft/40 bg-card px-5 py-4 text-center font-display text-3xl font-bold tracking-[0.45em] text-rose-deep outline-none transition focus:border-rose-deep focus:ring-4 focus:ring-rose-soft/25"
          placeholder="0000"
        />
        {error && <p className="mt-3 text-sm font-semibold text-destructive">Yokkii askim tekrar dene ❤️</p>}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          disabled={code.length !== 4 || opening}
          className="gradient-deep mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          baslaa <Heart className="h-4 w-4 fill-current" />
        </motion.button>
      </motion.form>
    </main>
  );
}
