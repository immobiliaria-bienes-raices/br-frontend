import type { PaginaDeInicioProps } from '@/../product/sections/pagina-de-inicio/types'
import { HeroSection } from './HeroSection'
import { PropiedadesCarousel } from './PropiedadesCarousel'
import { ServicioCard } from './ServicioCard'
import { ValorPropuestaCard } from './ValorPropuestaCard'
import { ContactoCTASection } from './ContactoCTASection'

/**
 * Página de Inicio - Landing page for Bienes Raíces: Inmobiliaria
 * Styled after Engel & Völkers with elegant, minimalist design
 *
 * Typography: Manrope
 * Colors: #F5F2F2 (primary), #77333B (secondary/Ruby Wine), slate (neutral)
 */
export function PaginaDeInicio({
  hero,
  propiedadesDestacadas,
  servicios,
  valorPropuestas,
  contactoCTA,
  onViewPropiedad,
  onExplorarPropiedades,
  onVerServicios,
  onContactar,
}: PaginaDeInicioProps) {
  return (
    <div className="min-h-screen bg-[#F5F2F2] dark:bg-slate-900">
      {/* Hero Section */}
      <HeroSection
        hero={hero}
        onExplorarPropiedades={onExplorarPropiedades}
        onVerServicios={onVerServicios}
      />

      {/* Featured Properties Carousel */}
      <PropiedadesCarousel
        propiedades={propiedadesDestacadas}
        onViewPropiedad={onViewPropiedad}
      />

      {/* Value Propositions Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-[#77333B] text-sm font-medium uppercase tracking-widest mb-3 block">
              Por Qué Elegirnos
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white">
              Servicio inmobiliario integral
            </h2>
          </div>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {valorPropuestas.map((vp) => (
              <ValorPropuestaCard key={vp.id} valorPropuesta={vp} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-[#F5F2F2] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-[#77333B] text-sm font-medium uppercase tracking-widest mb-3 block">
                Nuestros Servicios
              </span>
              <h2 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white">
                Delegue la gestión de su propiedad
              </h2>
            </div>

            <button
              onClick={onVerServicios}
              className="mt-6 md:mt-0 text-[#77333B] font-medium text-sm uppercase tracking-wide hover:underline underline-offset-4"
            >
              Ver todos los servicios
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicios.map((servicio) => (
              <ServicioCard
                key={servicio.id}
                servicio={servicio}
                onLearnMore={onVerServicios}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-light text-white mb-2">150+</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Propiedades</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-light text-white mb-2">50+</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Clientes Felices</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-light text-white mb-2">15</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Años de Experiencia</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-light text-white mb-2">100%</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Compromiso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <ContactoCTASection
        contactoCTA={contactoCTA}
        onContactar={onContactar}
      />
    </div>
  )
}
