import { Phone, Mail } from 'lucide-react'
import type { ContactoCTA } from '@/../product/sections/pagina-de-inicio/types'

interface ContactoCTASectionProps {
  contactoCTA: ContactoCTA
  onContactar?: () => void
}

export function ContactoCTASection({ contactoCTA, onContactar }: ContactoCTASectionProps) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#77333B]">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative Element */}
        <div className="w-16 h-0.5 bg-white/30 mx-auto mb-8" />

        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
          {contactoCTA.titulo}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          {contactoCTA.subtitulo}
        </p>

        {/* CTA Button */}
        <button
          onClick={onContactar}
          className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-[#77333B] font-medium tracking-wide uppercase text-sm hover:bg-[#F5F2F2] transition-all duration-300"
        >
          {contactoCTA.ctaText}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 pt-12 border-t border-white/20">
          <a
            href={`tel:${contactoCTA.telefono}`}
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
          >
            <Phone size={18} />
            <span>{contactoCTA.telefono}</span>
          </a>
          <a
            href={`mailto:${contactoCTA.email}`}
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
          >
            <Mail size={18} />
            <span>{contactoCTA.email}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
