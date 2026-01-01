import type { Propiedad, MapaConfig } from '@/../product/sections/pagina-de-inicio/types'
import { MapPin } from 'lucide-react'

interface GoogleMapSectionProps {
  propiedades: Propiedad[]
  config: MapaConfig
  onPropertyClick?: (id: string) => void
}

export function GoogleMapSection({ propiedades, config, onPropertyClick }: GoogleMapSectionProps) {
  return (
    <section className="relative bg-slate-100 dark:bg-slate-800">
      {/* Map Container */}
      <div className="relative h-[500px] lg:h-[600px]">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGrid)" />
            </svg>
          </div>

          {/* Map Placeholder Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm max-w-md mx-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#722F37]/10 rounded-full flex items-center justify-center">
                <MapPin size={32} className="text-[#722F37]" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
                Mapa de Propiedades
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Integración con Google Maps próximamente.
                <br />
                <span className="text-xs text-slate-500">
                  API Key: {config.apiKeyPlaceholder}
                </span>
              </p>
              <p className="text-xs text-slate-500">
                Centro: {config.centro.lat.toFixed(4)}, {config.centro.lng.toFixed(4)} | Zoom: {config.zoom}
              </p>
            </div>
          </div>
        </div>

        {/* Property Markers Overlay (Visual Representation) */}
        <div className="absolute inset-0 pointer-events-none">
          {propiedades.map((propiedad, index) => {
            // Create a pseudo-random position based on the property's actual coordinates
            // This creates a visual representation without actual map integration
            const offsetX = ((propiedad.coordenadas.lng - config.centro.lng) * 1000 + 50) % 80
            const offsetY = ((propiedad.coordenadas.lat - config.centro.lat) * 1000 + 50) % 60

            return (
              <div
                key={propiedad.id}
                className="absolute pointer-events-auto cursor-pointer group"
                style={{
                  left: `${20 + offsetX + index * 25}%`,
                  top: `${20 + offsetY + index * 15}%`,
                }}
                onClick={() => onPropertyClick?.(propiedad.id)}
              >
                {/* Marker */}
                <div className="relative">
                  <div className="w-10 h-10 bg-[#722F37] rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <MapPin size={20} className="text-white" />
                  </div>
                  {/* Pulse Animation */}
                  <div className="absolute inset-0 bg-[#722F37] rounded-full animate-ping opacity-30" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white dark:bg-slate-800 px-3 py-2 shadow-xl text-xs whitespace-nowrap">
                    <p className="font-medium text-slate-900 dark:text-white">{propiedad.titulo}</p>
                    <p className="text-[#722F37]">
                      {new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(propiedad.precio)}
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-slate-800" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Properties Quick List */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider">
              {propiedades.length} Propiedades en el Mapa
            </h3>
            <div className="flex gap-4">
              {propiedades.map((propiedad) => (
                <button
                  key={propiedad.id}
                  onClick={() => onPropertyClick?.(propiedad.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-[#722F37] hover:text-white transition-all duration-300 text-sm"
                >
                  <MapPin size={14} />
                  <span className="hidden sm:inline">{propiedad.zona.nombre}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
