'use client'

import type { PaginaDeInicioProps } from '@/../product/sections/pagina-de-inicio/types'
import { Header } from './Header'
import { HeroSection } from './HeroSection'
import { EquipoSection } from './EquipoSection'
import { PropiedadCard } from './PropiedadCard'
import { GoogleMapSection } from './GoogleMapSection'
import { ServicioCard } from './ServicioCard'
import { ValorPropuestaCard } from './ValorPropuestaCard'
import { ContactoCTASection } from './ContactoCTASection'

/**
 * Página de Inicio - Luxury Real Estate Landing Page
 * Styled after Engel & Völkers with elegant, minimalist design
 *
 * Design Direction: Refined luxury, editorial magazine feel
 * Typography: Manrope - elegant, modern
 * Colors: #F5F2F2 (warm cream), #722F37 (wine red), slate (neutral)
 */
export function PaginaDeInicio({
  hero,
  equipo,
  propiedadesDestacadas,
  contactoOpciones,
  servicios,
  valorPropuestas,
  contactoCTA,
  mapa,
  onViewPropiedad,
  onExplorarPropiedades,
  onVerServicios,
  onContactar,
  onContactoOpcion,
  onViewEquipoMember,
}: PaginaDeInicioProps) {
  return (
    <div className="min-h-screen bg-[#F5F2F2] dark:bg-slate-900">
      {/* Header - Overlays on Hero */}
      <Header
        logo={hero.logo}
        onExplorarPropiedades={onExplorarPropiedades}
        onVerServicios={onVerServicios}
        onContactar={onContactar}
      />

      {/* Hero Section */}
      <HeroSection
        hero={hero}
        onExplorarPropiedades={onExplorarPropiedades}
        onVerServicios={onVerServicios}
      />

      {/* Conoce el Equipo - Team Section */}
      <EquipoSection
        equipo={equipo}
        onViewMember={onViewEquipoMember}
      />

      {/* Featured Properties - Engel & Völkers Style */}
      <section className="py-24 lg:py-32 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em]">
                Propiedades Exclusivas
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
              Inmuebles Destacados
            </h2>
            <div className="w-20 h-px bg-[#722F37] mx-auto mt-8" />
          </div>

          {/* Properties Grid - 2 Properties Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {propiedadesDestacadas.slice(0, 2).map((propiedad) => (
              <PropiedadCard
                key={propiedad.id}
                propiedad={propiedad}
                contactoOpciones={contactoOpciones}
                onView={() => onViewPropiedad?.(propiedad.id)}
                onContactoOpcion={onContactoOpcion}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <button
              onClick={onExplorarPropiedades}
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-medium text-sm uppercase tracking-wider hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
            >
              Ver Todas las Propiedades
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <GoogleMapSection
        propiedades={propiedadesDestacadas}
        config={mapa}
        onPropertyClick={onViewPropiedad}
      />

      {/* Value Propositions Section */}
      <section className="py-24 lg:py-32 bg-[#F5F2F2] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
              Por Qué Elegirnos
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
              Servicio Inmobiliario Integral
            </h2>
            <div className="w-20 h-px bg-[#722F37] mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {valorPropuestas.map((vp, index) => (
              <ValorPropuestaCard key={vp.id} valorPropuesta={vp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
                Nuestros Servicios
              </span>
              <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight">
                Delegue la Gestión<br />de Su Propiedad
              </h2>
            </div>
            <button
              onClick={onVerServicios}
              className="mt-8 lg:mt-0 text-white/70 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              Ver Todos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicios.map((servicio, index) => (
              <ServicioCard
                key={servicio.id}
                servicio={servicio}
                index={index}
                onLearnMore={onVerServicios}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#722F37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '150+', label: 'Propiedades' },
              { value: '50+', label: 'Clientes Felices' },
              { value: '15', label: 'Años de Experiencia' },
              { value: '100%', label: 'Compromiso' },
            ].map((stat, index) => (
              <div key={index} className="group">
                <p className="text-5xl lg:text-6xl font-light text-white mb-2 transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </p>
                <p className="text-white/60 text-xs uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <ContactoCTASection
        contactoCTA={contactoCTA}
        contactoOpciones={contactoOpciones}
        onContactar={onContactar}
        onContactoOpcion={onContactoOpcion}
      />
    </div>
  )
}
