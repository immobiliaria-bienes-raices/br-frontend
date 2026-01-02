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
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imagenPrincipal}
          alt={titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
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

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorito?.()
          }}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 transition-colors shadow-lg"
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

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-xs font-medium truncate">
            {zona.nombre}, {zona.localidad}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1 mb-2 group-hover:text-[#722F37] transition-colors">
          {titulo}
        </h3>

        {/* Price */}
        <p className="text-xl font-bold text-[#722F37] dark:text-[#a8545c] mb-3">
          {formatPrecio(precio, modalidad)}
        </p>

        {/* Property Type */}
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
          {tipo}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4" />
            <span>{area} m²</span>
          </div>

          {habitaciones !== null && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span>{habitaciones}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{banos}</span>
          </div>

          {parqueadero && (
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
