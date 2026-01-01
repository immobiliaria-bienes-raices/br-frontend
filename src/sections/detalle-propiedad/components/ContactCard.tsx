'use client'

import { useState } from 'react'
import { Phone, Mail, ChevronDown, Bot, MessageCircle, Calendar } from 'lucide-react'
import type { AgenteContacto, ContactoOpcion } from '@/../product/sections/detalle-propiedad/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'bot': Bot,
  'mail': Mail,
  'message-circle': MessageCircle,
}

interface ContactCardProps {
  agente: AgenteContacto
  contactoOpciones: ContactoOpcion[]
  onContactoOpcion?: (tipo: ContactoOpcion['tipo']) => void
  onSolicitarVisita?: () => void
}

export function ContactCard({ agente, contactoOpciones, onContactoOpcion, onSolicitarVisita }: ContactCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleContactoClick = (opcion: ContactoOpcion) => {
    setShowDropdown(false)
    onContactoOpcion?.(opcion.tipo)
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 lg:p-8 border border-slate-100 dark:border-slate-700">
      {/* Agent Info */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
        <div className="w-16 h-16 lg:w-20 lg:h-20 overflow-hidden">
          <img
            src={agente.foto}
            alt={agente.nombre}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            {agente.nombre}
          </h3>
          <p className="text-sm text-[#722F37]">{agente.cargo}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-6">
        <a
          href={`tel:${agente.telefono}`}
          className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-[#722F37] transition-colors"
        >
          <Phone size={18} />
          <span>{agente.telefono}</span>
        </a>
        <a
          href={`mailto:${agente.email}`}
          className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-[#722F37] transition-colors"
        >
          <Mail size={18} />
          <span className="text-sm">{agente.email}</span>
        </a>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Preguntar Sobre Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] text-white font-medium text-sm uppercase tracking-wider hover:bg-[#8a3a42] transition-all duration-300"
          >
            Preguntar Sobre
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute left-0 right-0 bottom-full mb-2 bg-white dark:bg-slate-800 shadow-2xl z-50 overflow-hidden animate-slide-up">
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

        {/* Solicitar Visita */}
        <button
          onClick={onSolicitarVisita}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-medium text-sm uppercase tracking-wider hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
        >
          <Calendar size={18} />
          Solicitar Visita
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
