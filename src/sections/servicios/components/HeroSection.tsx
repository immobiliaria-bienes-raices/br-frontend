import type { HeroSectionProps } from '@/../product/sections/servicios/types'

export function HeroSection({ hero, onContactar, onValorar }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Decorative Element */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#722F37]" />
            <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em]">
              Nuestros Servicios
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6">
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 font-light max-w-xl mb-10 leading-relaxed">
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onContactar}
              className="group relative px-8 py-4 bg-[#722F37] text-white font-medium tracking-wider uppercase text-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#722F37]/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {hero.ctaPrimary}
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
              onClick={onValorar}
              className="px-8 py-4 border border-white/40 text-white font-medium tracking-wider uppercase text-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
            >
              {hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
