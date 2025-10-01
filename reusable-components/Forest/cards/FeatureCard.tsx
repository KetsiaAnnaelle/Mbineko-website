import { Card, CardContent } from "@/components/ui/card";
import { Map, BarChart3, User } from "lucide-react";
import type { Feature } from "@/types/forest";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

const iconMap = {
  map: Map,
  analytics: BarChart3,
  user: User,
};

const iconColors = {
  map: 'from-blue-500 to-cyan-500',
  analytics: 'from-purple-500 to-pink-500',
  user: 'from-green-500 to-emerald-500',
};

const iconBackgrounds = {
  map: 'from-blue-50 to-cyan-50',
  analytics: 'from-purple-50 to-pink-50',
  user: 'from-green-50 to-emerald-50',
};

export default function FeatureCard({ feature, className }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Map;
  const iconGradient = iconColors[feature.icon as keyof typeof iconColors];
  const iconBg = iconBackgrounds[feature.icon as keyof typeof iconBackgrounds];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("w-full", className)}
    >
      <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl backdrop-blur-sm">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="relative p-8 sm:p-10 flex flex-col items-center text-center">
          {/* Animated icon container */}
          <motion.div 
            className={cn(
              "relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-6 sm:mb-8",
              "bg-gradient-to-br shadow-lg group-hover:shadow-xl transition-all duration-300",
              iconBg
            )}
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity duration-300" 
                 style={{ background: `linear-gradient(135deg, ${iconGradient})` }} />
            <IconComponent className={cn(
              "relative h-10 w-10 sm:h-12 sm:w-12 transition-all duration-300",
              "text-gray-700 group-hover:scale-110"
            )} />
          </motion.div>

          {/* Title with improved typography */}
          <motion.h3 
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description with better readability */}
          <motion.p 
            className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {feature.description}
          </motion.p>
        </CardContent>

        {/* Subtle border animation */}
        <div className="absolute inset-0 rounded-2xl border border-gray-100/50 group-hover:border-gray-200/70 transition-all duration-300" />
      </Card>
    </motion.div>
  );
}
