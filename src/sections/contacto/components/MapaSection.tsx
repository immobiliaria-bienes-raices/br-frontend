import { MapPin } from 'lucide-react'
import type { MapaSectionProps } from '@/../product/sections/contacto/types'

export function MapaSection({ config, direccion }: MapaSectionProps) {
  // For demo purposes, using a static map placeholder
  // In production, replace with actual Google Maps embed
  const mapUrl = `https://maps.google.com/maps?q=${config.centro.lat},${config.centro.lng}&z=${config.zoom}&output=embed`

  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
            Ubicación
          </span>
          <h2 className="text-3xl font-light text-slate-900 dark:text-white tracking-tight">
            Encuéntrenos en Bogotá
          </h2>
          <div className="w-16 h-px bg-[#722F37] mx-auto mt-6" />
        </div>

        {/* Map Container */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          {/* Map Embed */}
          <div className="aspect-[21/9] bg-slate-100 dark:bg-slate-700">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la oficina"
              className="w-full h-full"
            />
          </div>

          {/* Address Overlay Card */}
          <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-900 rounded-lg shadow-xl p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#722F37] rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-1">
                  Bienes Raíces
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  {direccion.linea1}<br />
                  {direccion.linea2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
