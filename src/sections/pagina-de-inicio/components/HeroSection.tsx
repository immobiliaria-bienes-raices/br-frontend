'use client'

import { useState, useEffect, useRef } from 'react'
import type { Hero } from '@/../product/sections/pagina-de-inicio/types'

interface HeroSectionProps {
  hero: Hero
  onExplorarPropiedades?: () => void
  onVerServicios?: () => void
}

export function HeroSection({ hero, onExplorarPropiedades, onVerServicios }: HeroSectionProps) {
  const hasVideos = hero.backgroundVideos && hero.backgroundVideos.length > 0
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const transitionDuration = hero.videoTransitionDuration || 10

  // Auto-slide videos
  useEffect(() => {
    if (!hasVideos || hero.backgroundVideos!.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % hero.backgroundVideos!.length)
        setIsTransitioning(false)
      }, 1000) // Crossfade duration
    }, transitionDuration * 1000)

    return () => clearInterval(interval)
  }, [hasVideos, hero.backgroundVideos, transitionDuration])

  // Ensure videos play
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {
          // Autoplay might be blocked, that's okay
        })
      }
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - Video or Image */}
      <div className="absolute inset-0 z-0">
        {hasVideos ? (
          // Video Background with Crossfade
          <>
            {hero.backgroundVideos!.map((videoSrc, index) => (
              <video
                key={index}
                ref={(el) => { videoRefs.current[index] = el }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentVideoIndex && !isTransitioning
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
              />
            ))}
          </>
        ) : (
          // Fallback Image Background
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 animate-subtle-zoom"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          />
        )}

        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70" />
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-[#722F37]" />
          <div className="w-2 h-2 bg-[#722F37] rotate-45" />
          <div className="w-12 h-px bg-[#722F37]" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          {hero.subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplorarPropiedades}
            className="group relative px-10 py-4 bg-[#722F37] text-white font-medium tracking-wider uppercase text-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#722F37]/30"
          >
            <span className="relative z-10 flex items-center gap-3">
              {hero.ctaText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8a3a42] to-[#722F37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button
            onClick={onVerServicios}
            className="px-10 py-4 border border-white/40 text-white font-medium tracking-wider uppercase text-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
          >
            {hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50">
        <span className="text-[10px] uppercase tracking-[0.3em]">Desplazar</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-20 left-8 w-20 h-20 border-l border-t border-white/20" />
      <div className="absolute top-20 right-8 w-20 h-20 border-r border-t border-white/20" />
      <div className="absolute bottom-20 left-8 w-20 h-20 border-l border-b border-white/20" />
      <div className="absolute bottom-20 right-8 w-20 h-20 border-r border-b border-white/20" />

      <style>{`
        @keyframes subtle-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
