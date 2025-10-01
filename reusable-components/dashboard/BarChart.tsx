import React from 'react';

interface BarChartProps {
  data: number[];
  color?: string;
  maxHeight?: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  color = "#10B981",
  maxHeight = 60 
}) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="flex items-end justify-center space-x-1 h-16">
      {data.map((value, index) => {
        const height = (value / maxValue) * maxHeight;
        return (
          <div
            key={index}
            className="w-3 rounded-t transition-all duration-500 hover:opacity-80"
            style={{
              height: `${height}px`,
              backgroundColor: color,
              animationDelay: `${index * 0.1}s`
            }}
          />
        );
      })}
    </div>
  );
};

export default BarChart;
