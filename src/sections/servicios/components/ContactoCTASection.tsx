import { Phone, Mail } from 'lucide-react'
import type { ContactoCTASectionProps } from '@/../product/sections/servicios/types'

export function ContactoCTASection({ contactoCTA, onContactar }: ContactoCTASectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#722F37]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-white/30" />
          <div className="w-2 h-2 bg-white/30 rotate-45" />
          <div className="w-12 h-px bg-white/30" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
          {contactoCTA.titulo}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          {contactoCTA.subtitulo}
        </p>

        {/* CTA Button */}
        <button
          onClick={onContactar}
          className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#722F37] font-medium text-sm uppercase tracking-wider hover:bg-slate-100 transition-colors"
        >
          {contactoCTA.ctaText}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 text-white/70">
          <a
            href={`tel:${contactoCTA.telefono}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{contactoCTA.telefono}</span>
          </a>
          <a
            href={`mailto:${contactoCTA.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{contactoCTA.email}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
