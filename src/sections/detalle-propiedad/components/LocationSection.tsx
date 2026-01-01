import { MapPin } from 'lucide-react'
import type { Coordenadas, MapaConfig } from '@/../product/sections/detalle-propiedad/types'

interface LocationSectionProps {
  direccion: string
  zona: {
    nombre: string
    localidad: string
  }
  coordenadas: Coordenadas
  config: MapaConfig
}

export function LocationSection({ direccion, zona, coordenadas, config }: LocationSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
          Ubicación
        </h2>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <MapPin size={16} className="text-[#722F37]" />
          <span>{direccion}</span>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-[300px] lg:h-[400px] bg-slate-100 dark:bg-slate-700">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="locationGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#locationGrid)" />
          </svg>
        </div>

        {/* Center Marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Marker */}
            <div className="w-12 h-12 bg-[#722F37] rounded-full flex items-center justify-center shadow-lg">
              <MapPin size={24} className="text-white" />
            </div>
            {/* Pulse */}
            <div className="absolute inset-0 bg-[#722F37] rounded-full animate-ping opacity-30" />
          </div>
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-4">
          <p className="font-medium text-slate-900 dark:text-white mb-1">
            {zona.nombre}, {zona.localidad}
          </p>
          <p className="text-sm text-slate-500">
            Coordenadas: {coordenadas.lat.toFixed(4)}, {coordenadas.lng.toFixed(4)}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Integración con Google Maps próximamente
          </p>
        </div>
      </div>

      {/* Neighborhood Info */}
      <div className="p-6">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider mb-3">
          Sobre el Barrio
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {zona.nombre} es uno de los sectores más apreciados de {zona.localidad},
          conocido por su excelente ubicación, acceso a vías principales,
          cercanía a centros comerciales, restaurantes y zonas verdes.
          Una zona ideal para quienes buscan calidad de vida con todas las comodidades.
        </p>
      </div>
    </div>
  )
}
