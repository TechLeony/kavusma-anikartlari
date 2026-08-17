import { motion } from "motion/react";
import { Heart, Mail } from "lucide-react";

export const LOVE_LETTER_TEXT = `Guzell kizimm Derya'mm,

İyii kii hayatimaa girmissin guzell bitanemm, senii bu hayatta her seydenn cok seviyorumm, sen benim hayatimaa girdiginden
berii herr seyii cok guzellestirdin, adeta renk kattin benim hayatima, ben seninle cok mutluyum, evet bazen salakliklar yapabiliyorum,
dusuncesiz davranabiliyorum, ama ben senii cook seviyorumm, iyii ki benimlesin, iyi kii beni seviyorsunn,
benn hep senin yaninda olacagimm, sana iyi bir partner olmaya calisacagimm bir lifetime soz vermekk sanaa,
Iyii kii bana evett demissin 15 ay oncee, seninle gecirdigim her bir saniye icin sukurler olsunn,

Senii cook ama cookkk seviyorumm hayatimin anlamiii💖💖💖`;

export function LoveLetter() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card mx-auto w-full max-w-2xl rounded-3xl bg-cream/90 p-6 shadow-glow sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="gradient-romantic grid h-13 w-13 shrink-0 place-items-center rounded-2xl">
          <Mail className="h-6 w-6 text-rose-deep" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-rose-deep sm:text-2xl">Love uuuu</h3>
        </div>
      </div>
      <div className="mt-6 space-y-4 whitespace-pre-line text-[15px] leading-8 text-foreground/85 sm:text-base">
        {LOVE_LETTER_TEXT}
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-rose-deep">
        <Heart className="h-4 w-4 fill-current" /> Cimbaaa
      </div>
    </motion.article>
  );
}
