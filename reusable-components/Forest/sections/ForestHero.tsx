import { MapPin, Thermometer, Shield, Mountain } from 'lucide-react';
import type { Forest } from '@/types/forest';

interface ForestHeroProps {
  forest: Forest;
}

export default function ForestHero({ forest }: ForestHeroProps) {
  return (
    <section className="relative h-[75vh] overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${forest.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/20 rounded-full animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="h-20" />
        
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#228B22]/15 border border-emerald-400/30 backdrop-blur-sm">
                <Shield className="h-4 w-4 text-[#228B22]" />
                <span className="text-sm font-medium text-[#228B22]">Réserve de Biosphère UNESCO</span>
              </div>

              {/* Main Title */}
              <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-none">
                <div className="text-white drop-shadow-2xl">
                  {forest.name.split(' ').slice(0, 2).join(' ')}
                </div>
                <div className="text-[#228B22] drop-shadow-2xl">
                  {forest.name.split(' ').slice(2).join(' ')}
                </div>
              </h1>

              {/* Location and Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#228B22] " />
                  <span className="text-lg font-semibold">{forest.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-[#228B22] " />
                  <span className="text-lg font-semibold">{forest.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-[#228B22] " />
                  <span className="text-lg font-semibold">{forest.temperature}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed">
                {forest.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 left-10 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </section>
  );
}
