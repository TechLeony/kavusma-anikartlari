import { AnimatePresence, motion } from "motion/react";
import { PartyPopper, X } from "lucide-react";

export function VictoryDialog({
  open,
  title,
  message,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-rose-deep/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl bg-card p-7 text-center shadow-glow"
          >
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-secondary text-rose-deep transition hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.div
              animate={{ rotate: [0, -12, 12, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="gradient-romantic mx-auto grid h-16 w-16 place-items-center rounded-full"
            >
              <PartyPopper className="h-8 w-8 text-rose-deep" />
            </motion.div>
            <h3 className="mt-4 text-xl font-semibold text-rose-deep">{title}</h3>
            <p className="mt-3 rounded-2xl bg-secondary px-4 py-3 text-base font-semibold text-rose-deep">
              {message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
