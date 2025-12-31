'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CarouselProps } from '@/../product/sections/pagina-de-inicio/types'
import { PropiedadCard } from './PropiedadCard'

export function PropiedadesCarousel({ propiedades, onViewPropiedad }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }

  const maxIndex = Math.max(0, propiedades.length - itemsPerView.desktop)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2F2] dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[#77333B] text-sm font-medium uppercase tracking-widest mb-3 block">
              Propiedades Destacadas
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white">
              Encuentre su próximo hogar
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-[#77333B] hover:border-[#77333B] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-[#77333B] hover:border-[#77333B] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop + 2)}%)`
            }}
          >
            {propiedades.map((propiedad) => (
              <div
                key={propiedad.id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
              >
                <PropiedadCard
                  propiedad={propiedad}
                  onView={() => onViewPropiedad?.(propiedad.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(i)
              }}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${i === currentIndex
                  ? 'w-8 bg-[#77333B]'
                  : 'w-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-[#77333B]/50'
                }
              `}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
