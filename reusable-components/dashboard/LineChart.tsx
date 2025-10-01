import React from 'react';

interface LineChartProps {
  data: number[];
  color?: string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  color = "#10B981",
  height = 80 
}) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <svg width="100%" height={height + 20} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: '1000',
            animation: 'drawLine 2s ease-out forwards'
          }}
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = height - ((value - minValue) / range) * height;
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={y}
              r="4"
              fill={color}
              className="opacity-0"
              style={{
                animation: `fadeIn 0.5s ease-out forwards`,
                animationDelay: `${1.5 + index * 0.1}s`
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default LineChart;
