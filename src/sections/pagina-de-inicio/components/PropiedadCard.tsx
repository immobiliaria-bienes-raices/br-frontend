import type { PropiedadCardProps } from '@/../product/sections/pagina-de-inicio/types'
import { MapPin, Maximize2, BedDouble, Bath, Car } from 'lucide-react'

export function PropiedadCard({ propiedad, onView }: PropiedadCardProps) {
  const formatPrice = (precio: number, modalidad: string) => {
    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)

    return modalidad === 'arriendo' ? `${formatted}/mes` : formatted
  }

  return (
    <article
      onClick={onView}
      className="group cursor-pointer bg-white dark:bg-slate-800 overflow-hidden transition-all duration-500 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={propiedad.imagenPrincipal}
          alt={propiedad.titulo}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className={`
            px-3 py-1.5 text-xs font-medium uppercase tracking-wider
            ${propiedad.modalidad === 'venta'
              ? 'bg-[#77333B] text-white'
              : 'bg-white text-slate-900'
            }
          `}>
            {propiedad.modalidad === 'venta' ? 'Venta' : 'Arriendo'}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider bg-slate-900/80 text-white">
            {propiedad.tipo}
          </span>
        </div>

        {/* View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-6 py-3 bg-white text-slate-900 font-medium text-sm uppercase tracking-wide">
            Ver Detalles
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-2">
          <MapPin size={14} className="text-[#77333B]" />
          <span className="text-sm">{propiedad.zona.nombre}, {propiedad.zona.localidad}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3 group-hover:text-[#77333B] transition-colors">
          {propiedad.titulo}
        </h3>

        {/* Price */}
        <p className="text-xl font-semibold text-[#77333B] mb-4">
          {formatPrice(propiedad.precio, propiedad.modalidad)}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Maximize2 size={16} />
            <span className="text-sm">{propiedad.area} m²</span>
          </div>

          {propiedad.habitaciones !== null && (
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <BedDouble size={16} />
              <span className="text-sm">{propiedad.habitaciones}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Bath size={16} />
            <span className="text-sm">{propiedad.banos}</span>
          </div>

          {propiedad.parqueadero && (
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Car size={16} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
