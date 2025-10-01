import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Sparkline: React.FC<{color?: string}> = ({color = '#16A34A'}) => (
  <svg viewBox="0 0 200 60" className="w-full h-24">
    <polyline fill="none" stroke={color} strokeWidth="3" points="0,40 20,35 40,38 60,34 80,20 100,22 120,18 140,12 160,10 180,6 200,8" />
  </svg>
);

const Bars: React.FC = () => (
  <div className="flex items-end gap-1 h-24">
    {Array.from({length:24}).map((_,i)=> (
      <div key={i} className="w-2 bg-neutral-300 rounded" style={{height: 6 + (i%7)*12}} />
    ))}
  </div>
);

const TrendsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-12 lg:col-span-6">
        <CardContent className="p-4">
          <div className="text-sm text-neutral-600 mb-3">Forest Cover Evolution</div>
          <Sparkline />
        </CardContent>
      </Card>
      <Card className="col-span-12 sm:col-span-6 lg:col-span-3">
        <CardContent className="p-4">
          <div className="text-sm text-neutral-600 mb-3">At-Risk Zones</div>
          <Bars />
        </CardContent>
      </Card>
      <Card className="col-span-12 sm:col-span-6 lg:col-span-3">
        <CardContent className="p-4">
          <div className="text-sm text-neutral-600 mb-3">AI Predictions</div>
          <Sparkline color="#ef4444" />
          <div className="text-xs text-neutral-500 mt-2 flex justify-between"><span>Current</span><span>Week</span><span>Weeks</span><span>Ytd</span></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsRow;
