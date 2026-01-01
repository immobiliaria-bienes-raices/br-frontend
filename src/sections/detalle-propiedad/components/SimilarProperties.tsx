'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Maximize2, BedDouble, Bath } from 'lucide-react'
import type { PropiedadSimilar } from '@/../product/sections/detalle-propiedad/types'

interface SimilarPropertiesProps {
  propiedades: PropiedadSimilar[]
  onView?: (id: string) => void
}

export function SimilarProperties({ propiedades, onView }: SimilarPropertiesProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 3

  const canGoPrev = startIndex > 0
  const canGoNext = startIndex + visibleCount < propiedades.length

  const goToPrev = () => {
    if (canGoPrev) setStartIndex(startIndex - 1)
  }

  const goToNext = () => {
    if (canGoNext) setStartIndex(startIndex + 1)
  }

  const visibleProperties = propiedades.slice(startIndex, startIndex + visibleCount)

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
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-2 block">
              Te puede interesar
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white">
              Propiedades Similares
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              disabled={!canGoPrev}
              className={`p-3 border transition-colors ${
                canGoPrev
                  ? 'border-slate-300 text-slate-600 hover:border-[#722F37] hover:text-[#722F37]'
                  : 'border-slate-200 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              disabled={!canGoNext}
              className={`p-3 border transition-colors ${
                canGoNext
                  ? 'border-slate-300 text-slate-600 hover:border-[#722F37] hover:text-[#722F37]'
                  : 'border-slate-200 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProperties.map((propiedad) => (
            <article
              key={propiedad.id}
              onClick={() => onView?.(propiedad.id)}
              className="group bg-white dark:bg-slate-800 cursor-pointer transition-all duration-500 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={propiedad.imagenPrincipal}
                  alt={propiedad.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`
                    px-3 py-1.5 text-xs font-medium uppercase tracking-wider
                    ${propiedad.modalidad === 'venta'
                      ? 'bg-[#722F37] text-white'
                      : 'bg-white text-slate-900'
                    }
                  `}>
                    {propiedad.modalidad === 'venta' ? 'Venta' : 'Arriendo'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Location */}
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <MapPin size={14} className="text-[#722F37]" />
                  <span>{propiedad.zona.nombre}, {propiedad.zona.localidad}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2 group-hover:text-[#722F37] transition-colors">
                  {propiedad.titulo}
                </h3>

                {/* Price */}
                <p className="text-xl font-light text-[#722F37] mb-4">
                  {formatPrice(propiedad.precio, propiedad.modalidad)}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Maximize2 size={14} />
                    <span>{propiedad.area} m²</span>
                  </div>
                  {propiedad.habitaciones !== null && (
                    <div className="flex items-center gap-1">
                      <BedDouble size={14} />
                      <span>{propiedad.habitaciones}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Bath size={14} />
                    <span>{propiedad.banos}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
