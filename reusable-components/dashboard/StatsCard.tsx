import React from 'react';

interface StatsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default StatsCard;
