import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MetricCover: React.FC = () => (
  <Card className="col-span-12 sm:col-span-6 lg:col-span-4">
    <CardContent className="p-4">
      <div className="text-sm text-neutral-600 mb-3">Current Forest Cover</div>
      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 36 36" className="h-20 w-20">
            <path className="text-neutral-200" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32" />
            <path className="text-green-600" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="72,100" d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-semibold">72%</div>
        </div>
        <div className="text-3xl font-bold">52%</div>
      </div>
    </CardContent>
  </Card>
);

const MetricDeforested: React.FC = () => (
  <Card className="col-span-12 sm:col-span-6 lg:col-span-4">
    <CardContent className="p-4">
      <div className="text-sm text-neutral-600 mb-3">Deforested Area This M.</div>
      <div className="text-4xl font-bold mb-3">120 <span className="text-base align-top">ha</span></div>
      <div className="flex items-end gap-1">
        {Array.from({length:12}).map((_,i)=> (
          <div key={i} className="w-3 rounded bg-green-500" style={{height: 6 + i*6}} />
        ))}
      </div>
    </CardContent>
  </Card>
);

const MetricIncidents: React.FC = () => (
  <Card className="col-span-12 sm:col-span-6 lg:col-span-4">
    <CardContent className="p-4">
      <div className="text-sm text-neutral-600 mb-3">Incidents by Type</div>
      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 36 36" className="h-20 w-20 rotate-[-90deg]">
            <circle cx="18" cy="18" r="16" stroke="#F97316" strokeWidth="4" fill="none" strokeDasharray="40 60" />
            <circle cx="18" cy="18" r="16" stroke="#EF4444" strokeWidth="4" fill="none" strokeDasharray="30 70" strokeDashoffset="40" />
            <circle cx="18" cy="18" r="16" stroke="#9CA3AF" strokeWidth="4" fill="none" strokeDasharray="30 70" strokeDashoffset="70" />
          </svg>
        </div>
        <ul className="text-sm space-y-1">
          <li><span className="inline-block h-2 w-2 rounded-full bg-orange-500 mr-2"/> 40% Wildfire</li>
          <li><span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"/> Illegal logging</li>
          <li><span className="inline-block h-2 w-2 rounded-full bg-neutral-400 mr-2"/> Unauthorized</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);

const MetricsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <MetricCover />
      <MetricDeforested />
      <MetricIncidents />
    </div>
  );
};

export default MetricsRow;
