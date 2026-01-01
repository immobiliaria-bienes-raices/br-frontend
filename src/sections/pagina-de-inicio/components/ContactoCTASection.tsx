'use client'

import { useState } from 'react'
import { Phone, Mail, Bot, MessageCircle, ChevronDown } from 'lucide-react'
import type { ContactoCTA, ContactoOpcion } from '@/../product/sections/pagina-de-inicio/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'bot': Bot,
  'mail': Mail,
  'message-circle': MessageCircle,
}

interface ContactoCTASectionProps {
  contactoCTA: ContactoCTA
  contactoOpciones?: ContactoOpcion[]
  onContactar?: () => void
  onContactoOpcion?: (tipo: ContactoOpcion['tipo']) => void
}

export function ContactoCTASection({ contactoCTA, contactoOpciones = [], onContactar, onContactoOpcion }: ContactoCTASectionProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleContactoClick = (opcion: ContactoOpcion) => {
    setShowDropdown(false)
    onContactoOpcion?.(opcion.tipo)
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#722F37]">
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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Main CTA Button */}
          <button
            onClick={onContactar}
            className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-[#722F37] font-medium tracking-wide uppercase text-sm hover:bg-[#F5F2F2] transition-all duration-300"
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

          {/* Preguntar Sobre Dropdown */}
          {contactoOpciones.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-medium text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                {contactoCTA.preguntarSobreText}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  />

                  {/* Menu */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 bg-white dark:bg-slate-800 shadow-2xl z-50 overflow-hidden animate-slide-up">
                    {contactoOpciones.map((opcion) => {
                      const Icon = iconMap[opcion.icono] || MessageCircle
                      return (
                        <button
                          key={opcion.id}
                          onClick={() => handleContactoClick(opcion)}
                          className="w-full flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                        >
                          <div className="w-10 h-10 flex items-center justify-center bg-[#722F37]/10 text-[#722F37]">
                            <Icon size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">
                              {opcion.titulo}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {opcion.descripcion}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

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
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }
      `}</style>
    </section>
  )
}
