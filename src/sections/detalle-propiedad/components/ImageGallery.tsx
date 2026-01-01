'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-slate-100">
          <img
            src={images[currentIndex]}
            alt={`${alt} - Imagen ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Image Counter */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 text-white text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 left-4 p-2 bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
          >
            <Maximize2 size={20} />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 text-slate-900 hover:bg-white transition-colors shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 text-slate-900 hover:bg-white transition-colors shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              className={`
                flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 overflow-hidden transition-all duration-300
                ${idx === currentIndex
                  ? 'ring-2 ring-[#722F37] opacity-100'
                  : 'opacity-60 hover:opacity-100'
                }
              `}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-3 text-white hover:bg-white/10 transition-colors z-10"
          >
            <X size={28} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white text-lg">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image */}
          <img
            src={images[currentIndex]}
            alt={`${alt} - Imagen ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {/* Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={36} />
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => goToImage(idx)}
                className={`
                  flex-shrink-0 w-16 h-16 overflow-hidden transition-all duration-300
                  ${idx === currentIndex
                    ? 'ring-2 ring-white opacity-100'
                    : 'opacity-50 hover:opacity-100'
                  }
                `}
              >
                <img
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
