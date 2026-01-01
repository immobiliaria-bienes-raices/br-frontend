import type { MiembroEquipo } from '@/../product/sections/pagina-de-inicio/types'
import { Phone, Mail } from 'lucide-react'

interface EquipoSectionProps {
  equipo: MiembroEquipo[]
  onViewMember?: (id: string) => void
}

export function EquipoSection({ equipo, onViewMember }: EquipoSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
            Conoce el Equipo
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight">
            Nuestros Asesores
          </h2>
          <div className="w-20 h-px bg-[#722F37] mx-auto mt-8" />
          <p className="mt-8 text-slate-400 max-w-2xl mx-auto text-lg">
            Un equipo de profesionales comprometidos con encontrar la propiedad perfecta para usted
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipo.map((miembro, index) => (
            <div
              key={miembro.id}
              onClick={() => onViewMember?.(miembro.id)}
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative bg-slate-800 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#722F37]/10">
                {/* Photo Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* Team photo */}
                  <img
                    src={miembro.foto}
                    alt={miembro.nombre}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Wine accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#722F37] group-hover:w-full transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="relative p-6">
                  {/* Name & Title */}
                  <h3 className="text-xl font-medium text-white mb-1 group-hover:text-[#722F37] transition-colors">
                    {miembro.nombre}
                  </h3>
                  <p className="text-[#722F37] text-sm uppercase tracking-wider mb-4">
                    {miembro.cargo}
                  </p>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {miembro.descripcion}
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={`tel:${miembro.telefono}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      <Phone size={14} />
                      <span>{miembro.telefono}</span>
                    </a>
                    <a
                      href={`mailto:${miembro.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      <Mail size={14} />
                      <span>{miembro.email}</span>
                    </a>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
