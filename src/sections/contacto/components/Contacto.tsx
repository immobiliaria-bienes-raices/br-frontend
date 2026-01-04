'use client'

import type { ContactoProps } from '@/../product/sections/contacto/types'
import { Header } from './Header'
import { ContactForm } from './ContactForm'
import { OficinaInfo } from './OficinaInfo'
import { MapaSection } from './MapaSection'

/**
 * Contacto - Contact Page
 * Styled after Engel & Völkers with elegant form and office info
 */
export function Contacto({
  hero,
  formConfig,
  oficina,
  mapa,
  onSubmit,
  onNavigate,
}: ContactoProps) {
  return (
    <div className="min-h-screen bg-[#F5F2F2] dark:bg-slate-900">
      {/* Header */}
      <Header
        logo="/assets/logo.svg"
        onNavigate={onNavigate}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Decorative Element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#722F37]" />
            <div className="w-2 h-2 bg-[#722F37] rotate-45" />
            <div className="w-12 h-px bg-[#722F37]" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-4">
            {hero.headline}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {hero.subheadline}
          </p>
        </div>
      </section>

      {/* Contact Form & Office Info Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form - Takes more space */}
            <div className="lg:col-span-3">
              <ContactForm
                config={formConfig}
                onSubmit={onSubmit}
              />
            </div>

            {/* Office Info */}
            <div className="lg:col-span-2">
              <OficinaInfo oficina={oficina} />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapaSection
        config={mapa}
        direccion={oficina.direccion}
      />

      {/* Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Bienes Raíces. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
