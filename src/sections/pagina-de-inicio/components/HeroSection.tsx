import type { Hero } from '@/../product/sections/pagina-de-inicio/types'

interface HeroSectionProps {
  hero: Hero
  onExplorarPropiedades?: () => void
  onVerServicios?: () => void
}

export function HeroSection({ hero, onExplorarPropiedades, onVerServicios }: HeroSectionProps) {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Decorative Line */}
          <div className="w-16 h-0.5 bg-[#77333B] mx-auto mb-8" />

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-6">
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplorarPropiedades}
              className="group relative px-8 py-4 bg-[#77333B] text-white font-medium tracking-wide uppercase text-sm overflow-hidden transition-all duration-300 hover:bg-[#5a272e]"
            >
              <span className="relative z-10">{hero.ctaText}</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              onClick={onVerServicios}
              className="px-8 py-4 border border-white/30 text-white font-medium tracking-wide uppercase text-sm hover:bg-white/10 transition-all duration-300"
            >
              {hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs uppercase tracking-widest">Desplazar</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
