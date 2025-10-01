import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressCardProps {
  label: string;
  value: number;
  color?: string;
  className?: string;
}

const colorVariants = {
  green: {
    dot: 'bg-green-500',
    bar: 'bg-green-500',
    glow: 'shadow-green-500/25'
  },
  blue: {
    dot: 'bg-blue-500',
    bar: 'bg-blue-500', 
    glow: 'shadow-blue-500/25'
  },
  purple: {
    dot: 'bg-purple-500',
    bar: 'bg-purple-500',
    glow: 'shadow-purple-500/25'
  },
  orange: {
    dot: 'bg-orange-500',
    bar: 'bg-orange-500',
    glow: 'shadow-orange-500/25'
  },
  red: {
    dot: 'bg-red-500',
    bar: 'bg-red-500',
    glow: 'shadow-red-500/25'
  }
};

export default function ProgressCard({ label, value, color = 'green', className }: ProgressCardProps) {
  const colorScheme = colorVariants[color as keyof typeof colorVariants] || colorVariants.green;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("group", className)}
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
        <div className="flex items-center space-x-4">
          {/* Animated status indicator */}
          <motion.div 
            className={cn(
              "w-4 h-4 rounded-full shadow-lg transition-all duration-300",
              colorScheme.dot,
              colorScheme.glow
            )}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="flex-1 min-w-0">
            {/* Header with improved spacing */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {label}
              </span>
              <motion.span 
                className="text-lg font-bold text-gray-900 tabular-nums"
                key={value}
                initial={{ scale: 1.2, color: colorScheme.bar.replace('bg-', 'text-') }}
                animate={{ scale: 1, color: '#111827' }}
                transition={{ duration: 0.3 }}
              >
                {value}%
              </motion.span>
            </div>
            
            {/* Enhanced progress bar */}
            <div className="relative">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full transition-all duration-500 relative overflow-hidden",
                    colorScheme.bar
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
              
              {/* Progress glow effect */}
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  colorScheme.glow
                )}
                style={{ 
                  width: `${Math.max(0, Math.min(100, value))}%`,
                  boxShadow: `0 0 20px ${colorScheme.bar.replace('bg-', '')}`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
