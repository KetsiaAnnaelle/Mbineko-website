import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { BarChart3, TrendingUp, Leaf, Wind } from 'lucide-react';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// 🔹 Exemple de données (à remplacer si tu en as depuis ton API)
const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 70 },
  { name: 'Jun', value: 90 },
];

// 🔹 Typage correct du CustomTooltip
interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: { value: number; dataKey: string }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-emerald-600 font-semibold">
          {`${payload[0].value} ${
            payload[0].dataKey === 'value'
              ? payload[0].value && Number(payload[0].value) > 100
                ? 'kg/m²'
                : '%'
              : ''
          }`}
        </p>
      </div>
    );
  }
  return null;
};

export default function ForestDashboard() {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');

  // Responsive : changer le type de graphique selon la taille d'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartType('area');
      } else {
        setChartType('line');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#10b981" fill="#a7f3d0" />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        );
      default:
        return <div>Aucun graphique disponible</div>;
    }
  };

  const chartContent = renderChart();

  return (
    <section className="p-6 bg-gray-50 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-600" />
          Statistiques de la forêt
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-lg ${chartType === 'line' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}
          >
            Courbe
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded-lg ${chartType === 'area' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}
          >
            Zone
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-lg ${chartType === 'bar' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}
          >
            Barres
          </button>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          {chartContent}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
          <Leaf className="w-6 h-6 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Couverture végétale</p>
            <p className="font-bold text-gray-800">78%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
          <Wind className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Qualité de l'air</p>
            <p className="font-bold text-gray-800">92%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          <div>
            <p className="text-sm text-gray-500">Évolution annuelle</p>
            <p className="font-bold text-gray-800">+12%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
