'use client'

import type { ServiciosProps } from '@/../product/sections/servicios/types'
import { HeroSection } from './HeroSection'
import { ValorPropuestaCard } from './ValorPropuestaCard'
import { PasoProcesoCard } from './PasoProcesoCard'
import { FAQAccordion } from './FAQAccordion'
import { ContactoCTASection } from './ContactoCTASection'

/**
 * Servicios - Service Presentation Page
 * Styled after Engel & Völkers with elegant layouts
 */
export function Servicios({
  hero,
  valorPropuestas,
  pasosProceso,
  faqItems,
  contactoCTA,
  onContactar,
  onValorar,
}: ServiciosProps) {
  return (
    <div className="min-h-screen bg-[#F5F2F2] dark:bg-slate-900">
      {/* Hero Section */}
      <HeroSection
        hero={hero}
        onContactar={onContactar}
        onValorar={onValorar}
      />

      {/* Value Propositions Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
              Por Qué Elegirnos
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
              Beneficios de Trabajar con Nosotros
            </h2>
            <div className="w-16 h-px bg-[#722F37] mx-auto mt-6" />
          </div>

          {/* Value Proposition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {valorPropuestas.map((vp, index) => (
              <ValorPropuestaCard
                key={vp.id}
                valorPropuesta={vp}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 lg:py-28 bg-[#F5F2F2] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
              Nuestro Proceso
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
              Cómo Trabajamos
            </h2>
            <div className="w-16 h-px bg-[#722F37] mx-auto mt-6" />
          </div>

          {/* Process Steps */}
          <div className="space-y-20 lg:space-y-28">
            {pasosProceso.map((paso, index) => (
              <PasoProcesoCard
                key={paso.id}
                paso={paso}
                isReversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
              Resolvemos Sus Dudas
            </h2>
            <div className="w-16 h-px bg-[#722F37] mx-auto mt-6" />
          </div>

          {/* FAQ Accordion */}
          <FAQAccordion items={faqItems} />
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
