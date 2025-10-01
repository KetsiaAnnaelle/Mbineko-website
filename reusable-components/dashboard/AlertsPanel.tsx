import React from 'react';
import { Flame, TreePine, Shield, Clock } from 'lucide-react';

interface Alert {
  id: number;
  type: 'wildfire' | 'illegal-logging' | 'unauthorized-entry';
  time: string;
  status: 'detected' | 'resolved';
}

const alerts: Alert[] = [
  { id: 1, type: 'wildfire', time: '4:54 AM', status: 'detected' },
  { id: 2, type: 'illegal-logging', time: '3:12 PM', status: 'resolved' },
  { id: 3, type: 'unauthorized-entry', time: '', status: 'detected' },
  { id: 4, type: 'illegal-logging', time: '12:29 AM', status: 'detected' },
  { id: 5, type: 'wildfire', time: '8:19 AM', status: 'detected' },
];

const AlertsPanel: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'wildfire':
        return <Flame className="w-5 h-5" />;
      case 'illegal-logging':
        return <TreePine className="w-5 h-5" />;
      case 'unauthorized-entry':
        return <Shield className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'wildfire':
        return 'bg-red-500';
      case 'illegal-logging':
        return 'bg-orange-500';
      case 'unauthorized-entry':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'wildfire':
        return 'Wildfire';
      case 'illegal-logging':
        return 'Illegal Logging';
      case 'unauthorized-entry':
        return 'Unauthorized Entry';
      default:
        return 'Alert';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-10 h-10 ${getColor(alert.type)} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200`}>
              {getIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                {getTitle(alert.type)}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {alert.status}
              </p>
            </div>
            {alert.time && (
              <span className="text-xs text-gray-400 font-mono">
                {alert.time}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
