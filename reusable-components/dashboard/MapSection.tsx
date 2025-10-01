import React, { useState } from 'react';
import { Plus, Minus, Target } from 'lucide-react';

const MapSection: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 group hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-80 bg-gradient-to-br from-green-800 to-green-600 rounded-lg overflow-hidden">
        {/* Satellite-style map background */}
        <div className="absolute inset-0 opacity-80">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-30"></div>
        </div>

        {/* Forest areas */}
        <div className="absolute top-16 left-20 w-32 h-24 bg-green-500 rounded-lg opacity-70 animate-pulse"></div>
        <div className="absolute top-32 right-28 w-20 h-16 bg-green-600 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 left-32 w-24 h-20 bg-green-400 rounded-lg opacity-50"></div>

        {/* Endangered zone */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg opacity-80 animate-pulse shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-500 opacity-60 rounded-lg"></div>
        </div>

        {/* Control buttons */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <button 
            onClick={() => setZoom(zoom + 0.1)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center"
          >
            <Minus className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Location button */}
        <div className="absolute bottom-4 left-4">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center">
            <Target className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-700">Protected area</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-gray-700">Forest cover</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-700 italic">Endangered zone</span>
            </div>
          </div>
        </div>

        {/* Green dots (monitoring points) */}
        <div className="absolute top-20 left-24 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-28 right-16 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
};

export default MapSection;
