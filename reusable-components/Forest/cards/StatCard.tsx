import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Droplets, CloudRain, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  color?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const iconMap = {
  thermometer: Thermometer,
  droplets: Droplets,
  'cloud-rain': CloudRain,
};

const colorVariants = {
  blue: {
    bg: 'from-blue-500 to-blue-600',
    icon: 'text-white',
    container: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  green: {
    bg: 'from-green-500 to-green-600', 
    icon: 'text-white',
    container: 'bg-gradient-to-br from-green-50 to-green-100'
  },
  orange: {
    bg: 'from-orange-500 to-orange-600',
    icon: 'text-white', 
    container: 'bg-gradient-to-br from-orange-50 to-orange-100'
  },
  purple: {
    bg: 'from-purple-500 to-purple-600',
    icon: 'text-white',
    container: 'bg-gradient-to-br from-purple-50 to-purple-100'
  }
};

export default function StatCard({ 
  title, 
  value, 
  color = 'blue', 
  icon, 
  trend = 'neutral',
  trendValue,
  className 
}: StatCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Thermometer;
  const colorScheme = colorVariants[color as keyof typeof colorVariants] || colorVariants.blue;
  
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={cn("w-full", className)}
    >
      <Card className="group overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            {/* Content section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {title}
                </h3>
                {TrendIcon && trendValue && (
                  <div className={cn(
                    "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                    trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{trendValue}</span>
                  </div>
                )}
              </div>
              
              <motion.p 
                className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums"
                key={value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {value}
              </motion.p>
            </div>
            
            {/* Enhanced icon container */}
            <motion.div 
              className={cn(
                "relative p-4 sm:p-5 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300",
                "bg-gradient-to-br",
                colorScheme.bg
              )}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <IconComponent className={cn(
                "h-6 w-6 sm:h-7 sm:w-7 relative z-10 transition-transform duration-300 group-hover:scale-110",
                colorScheme.icon
              )} />
            </motion.div>
          </div>
        </CardContent>
        
        {/* Subtle bottom border accent */}
        <div className={cn(
          "h-1 bg-gradient-to-r transition-all duration-300 group-hover:h-2",
          colorScheme.bg
        )} />
      </Card>
    </motion.div>
  );
}
