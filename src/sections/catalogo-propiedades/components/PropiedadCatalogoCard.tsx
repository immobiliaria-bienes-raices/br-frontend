import { Heart, MapPin, Bed, Bath, Car, Maximize2 } from 'lucide-react'
import type { PropiedadCatalogoCardProps } from '@/../product/sections/catalogo-propiedades/types'

function formatPrecio(precio: number, modalidad: 'venta' | 'arriendo'): string {
  if (precio >= 1000000000) {
    return `$${(precio / 1000000000).toFixed(1).replace('.0', '')} mil M`
  }
  if (precio >= 1000000) {
    return `$${(precio / 1000000).toFixed(0)} M${modalidad === 'arriendo' ? '/mes' : ''}`
  }
  return `$${precio.toLocaleString('es-CO')}${modalidad === 'arriendo' ? '/mes' : ''}`
}

export function PropiedadCatalogoCard({
  propiedad,
  esFavorito = false,
  onView,
  onToggleFavorito,
}: PropiedadCatalogoCardProps) {
  const {
    titulo,
    tipo,
    modalidad,
    precio,
    area,
    habitaciones,
    banos,
    parqueadero,
    zona,
    imagenPrincipal,
    esNuevo,
    esDestacado,
  } = propiedad

  return (
    <article
      className="group relative bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 dark:border-slate-800"
      onClick={onView}
    >
      {/* Horizontal Layout Container */}
      <div className="flex flex-col sm:flex-row">
        {/* Image Container - Fixed width on desktop */}
        <div className="relative w-full sm:w-72 lg:w-80 flex-shrink-0">
          <div className="aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden">
            <img
              src={imagenPrincipal}
              alt={titulo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {esNuevo && (
              <span className="px-2.5 py-1 text-xs font-semibold tracking-wide uppercase bg-emerald-500 text-white rounded">
                Nuevo
              </span>
            )}
            {esDestacado && (
              <span className="px-2.5 py-1 text-xs font-semibold tracking-wide uppercase bg-[#722F37] text-white rounded">
                Destacado
              </span>
            )}
          </div>

          {/* Modalidad Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 text-xs font-medium tracking-wide uppercase bg-slate-900/80 text-white rounded backdrop-blur-sm">
              {modalidad}
            </span>
          </div>

          {/* Gradient Overlay - Mobile only */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent sm:hidden" />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col">
          {/* Top Row: Location & Favorite */}
          <div className="flex items-start justify-between gap-4 mb-2">
            {/* Location */}
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">
                {zona.nombre}, {zona.localidad}
              </span>
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorito?.()
              }}
              className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  esFavorito
                    ? 'fill-[#722F37] text-[#722F37]'
                    : 'text-slate-400 hover:text-[#722F37]'
                }`}
              />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-[#722F37] transition-colors line-clamp-2">
            {titulo}
          </h3>

          {/* Property Type */}
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {tipo}
          </p>

          {/* Spacer to push features and price to bottom */}
          <div className="flex-1" />

          {/* Bottom Row: Features & Price */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {/* Features */}
            <div className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5" title="Área">
                <Maximize2 className="w-4 h-4" />
                <span className="font-medium">{area} m²</span>
              </div>

              {habitaciones !== null && (
                <div className="flex items-center gap-1.5" title="Habitaciones">
                  <Bed className="w-4 h-4" />
                  <span className="font-medium">{habitaciones}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5" title="Baños">
                <Bath className="w-4 h-4" />
                <span className="font-medium">{banos}</span>
              </div>

              {parqueadero && (
                <div className="flex items-center gap-1.5" title="Parqueadero">
                  <Car className="w-4 h-4" />
                  <span className="font-medium">Sí</span>
                </div>
              )}
            </div>

            {/* Price */}
            <p className="text-xl sm:text-2xl font-bold text-[#722F37] dark:text-[#a8545c] whitespace-nowrap">
              {formatPrecio(precio, modalidad)}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
