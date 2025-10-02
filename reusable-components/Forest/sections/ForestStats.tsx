import type { ReactNode } from 'react';
import { MapPin, Download, Thermometer, Droplets, Leaf, TreePine } from 'lucide-react';
import { Link, useLocation } from 'react-router';

// Mock data for demonstration
const mockForest = {
  stats: {
    china: 10,
    india: 50, 
    brazil: 30,
    others: 10
  },
  humidity: 72
};

// 🔹 Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'active' | 'destructive' | 'outline' | 'export';
}

const Button = ({ children, variant = 'default', className = '', ...props }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95';
  
  // Correction : Utiliser un type plus spécifique pour la clé
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    default: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm',
    primary: 'bg-green-500 text-white hover:bg-green-600 shadow-lg',
    active: 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-lg',
    outline: 'bg-white border-2 text-gray-700 hover:bg-gray-50',
    export: 'text-white font-semibold shadow-lg'
  };
  
  const variantClass = variants[variant || 'default'];
  
  return (
    <button className={`${baseClasses} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

// 🔹 Progress Card Component
interface ProgressCardProps {
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

const ProgressCard = ({ label, value, color, bgColor }: ProgressCardProps) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-32 bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-full ${bgColor} transition-all duration-700 ease-out`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <span className="text-gray-600 font-semibold min-w-[3rem] text-right">{value}%</span>
      </div>
    </div>
  );
};

// 🔹 Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  bgColor: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard = ({ title, value, bgColor, textColor, icon: IconComponent }: StatCardProps) => {
  return (
    <div className={`${bgColor} rounded-2xl p-6 shadow-sm border-0 transition-all duration-200 hover:shadow-md hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${textColor} opacity-80 mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        </div>
        <div className={`p-3 bg-white bg-opacity-20 rounded-xl`}>
          <IconComponent className={`h-6 w-6 ${textColor}`} />
        </div>
      </div>
    </div>
  );
};

// 🔹 ForestStats Component
interface ForestStatsProps {
  forest?: typeof mockForest;
}

export default function ForestStats({ forest = mockForest }: ForestStatsProps) {
  const location = useLocation();
  const isStatisticsPage = location.pathname.includes('/statistics');

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-0 backdrop-blur-sm">
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/forests">
                  <Button 
                    variant={!isStatisticsPage ? "primary" : "default"} 
                    className={!isStatisticsPage ? "bg-green-500 hover:bg-green-600" : "bg-gray-100 border-gray-200 hover:bg-gray-200"}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Vue d'ensemble
                  </Button>
                </Link>
                
                {/* <Link to="/forests/statistics">
                  <Button 
                    variant={isStatisticsPage ? "active" : "default"}
                    className={isStatisticsPage ? 
                      "bg-blue-500 text-white hover:bg-blue-600 shadow-lg transform scale-105" : 
                      "bg-gray-100 border-gray-200 hover:bg-gray-200"
                    }
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Statistiques
                  </Button>
                </Link> */}
                
                {/* <Button variant="default" className="bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600">
                  Cartes
                </Button> */}
                
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm text-gray-600 mr-2">6 mois</span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <Button variant="export" className="bg-red-500 hover:bg-red-600">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                
                {/* <Button variant="export" className="bg-green-600 hover:bg-green-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Excel
                </Button> */}
              </div>

              {/* Forest Composition Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <TreePine className="h-6 w-6 mr-3 text-green-600" />
                  Constitution de la forêt
                </h3>
                <div className="space-y-1 bg-gray-50 rounded-2xl p-6">
                  <ProgressCard 
                    label="Chêne" 
                    value={forest.stats.china} 
                    color="bg-red-500"
                    bgColor="bg-red-500"
                  />
                  <ProgressCard 
                    label="Iroko" 
                    value={forest.stats.india} 
                    color="bg-green-500"
                    bgColor="bg-green-500"
                  />
                  <ProgressCard 
                    label="Sapelli" 
                    value={forest.stats.brazil} 
                    color="bg-amber-500"
                    bgColor="bg-amber-500"
                  />
                  <ProgressCard 
                    label="Ébène" 
                    value={forest.stats.others} 
                    color="bg-blue-500"
                    bgColor="bg-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Panel */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Données Clées</h4>
            
            <StatCard 
              title="Température moy"
              value="18,5 °C"
              bgColor="bg-gradient-to-br from-blue-400 to-blue-500"
              textColor="text-white"
              icon={Thermometer}
            />
            
            <StatCard 
              title="Humidité"
              value={`${forest.humidity}%`}
              bgColor="bg-gradient-to-br from-green-400 to-green-500"
              textColor="text-white"
              icon={Droplets}
            />
            
            <StatCard 
              title="CO2 absorbé"
              value="1,6T/j"
              bgColor="bg-gradient-to-br from-red-400 to-red-500"
              textColor="text-white"
              icon={Leaf}
            />
            
            <StatCard 
              title="Biomasse"
              value="2,95T"
              bgColor="bg-gradient-to-br from-amber-400 to-orange-500"
              textColor="text-white"
              icon={TreePine}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
