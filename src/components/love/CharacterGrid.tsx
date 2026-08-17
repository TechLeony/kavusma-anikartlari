import { motion } from "motion/react";
import { Cat, Fish, Heart } from "lucide-react";

export const CHARACTER_SLOTS = [
  {
    id: "cat",
    title: "Minik Bebek 🐱",
    image: "",
    Icon: Cat,
  },
  {
    id: "capybara",
    title: "Isirann capybara 🦫",
    image: "",
    Icon: Heart,
  },
  {
    id: "fish",
    title: "Minikk cucee 🐣",
    image: "",
    Icon: Fish,
  },
];

export function CharacterGrid() {
  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-bold text-rose-deep sm:text-2xl">Minik Kizim</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CHARACTER_SLOTS.map(({ id, title, image, Icon }, index) => (
          <motion.button
            key={id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group overflow-hidden rounded-2xl border border-rose-soft/30 bg-card/75 text-left shadow-soft"
          >
            <div className="aspect-square overflow-hidden bg-secondary/70">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Icon className="h-12 w-12 text-rose-deep" />
                </div>
              )}
            </div>
            <div className="p-4 text-center">
              <h3 className="text-base font-semibold text-rose-deep">{title}</h3>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
