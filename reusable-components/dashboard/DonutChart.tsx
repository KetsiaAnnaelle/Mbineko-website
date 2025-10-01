import React from 'react';

interface DonutData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutData[];
  size?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, size = 120 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  
  let accumulatedPercentage = 0;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const offset = circumference - (accumulatedPercentage / 100) * circumference;
          const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
          
          accumulatedPercentage += percentage;
          
          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                animation: `draw 1.5s ease-out forwards`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">{data[0]?.value}%</div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
