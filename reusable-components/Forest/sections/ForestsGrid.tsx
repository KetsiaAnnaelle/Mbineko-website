import ForestCard from "../cards/ForestCard";
import type { Forest } from "@/types/forest";
import { motion } from "framer-motion";
// import { TreePine } from "lucide-react";

interface ForestsGridProps {
  forests: Forest[];
  onForestSelect: (forest: Forest) => void;
}

export default function ForestsGrid({ forests, onForestSelect }: ForestsGridProps) {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "rgba(34, 139, 34, 0.25)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
             Forêts analysables
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Sélectionnez une forêt et découvrez ses données environnementales en temps réel.
          </p>
        </div>

        {/* Animation en cascade */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {forests.map((forest) => (
            <ForestCard
              key={forest.id}
              forest={forest}
              onExplore={() => onForestSelect(forest)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
