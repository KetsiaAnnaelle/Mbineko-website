import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';

const MapPanel: React.FC = () => {
    return (
        <Card className="col-span-12 lg:col-span-8 overflow-hidden">
            <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4 border-b">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="text-sm text-neutral-500">🔍</div>
                        <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Search" />
                    </div>
                    <button className="rounded-md border px-3 py-2 text-sm">June 15, 2023 — July 14, 2023 ▾</button>
                </div>
                <div className="relative h-[320px] md:h-[380px]">
                    <img src="/assets/img/forest-map.jpg" alt="Map" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute left-3 top-3 grid gap-2">
                        <button className="h-8 w-8 rounded-md bg-white shadow text-lg leading-8 text-center">+</button>
                        <button className="h-8 w-8 rounded-md bg-white shadow text-lg leading-8 text-center">−</button>
                    </div>
                    <div className="absolute left-3 bottom-3">
                        <button className="h-8 w-8 rounded-md bg-white shadow text-lg leading-8 text-center">◎</button>
                    </div>
                    <div className="absolute right-4 bottom-4 bg-white/95 rounded-md shadow px-3 py-2 text-xs">
                        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded bg-green-600" /> Protected area</div>
                        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded bg-green-300" /> Forest cover</div>
                        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded bg-red-500" /> Endangered zone</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MapPanel;
