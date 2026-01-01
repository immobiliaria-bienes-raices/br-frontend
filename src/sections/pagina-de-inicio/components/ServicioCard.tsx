import { Users, FileText, Shield, Home, Key, Building2, Search, Briefcase } from 'lucide-react'
import type { Servicio } from '@/../product/sections/pagina-de-inicio/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'users': Users,
  'file-text': FileText,
  'shield': Shield,
  'home': Home,
  'key': Key,
  'building-2': Building2,
  'search': Search,
  'briefcase': Briefcase,
}

interface ServicioCardProps {
  servicio: Servicio
  index?: number
  onLearnMore?: () => void
}

export function ServicioCard({ servicio, index = 0, onLearnMore }: ServicioCardProps) {
  const Icon = iconMap[servicio.icono] || Home

  return (
    <article
      onClick={onLearnMore}
      className="group relative p-6 lg:p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 cursor-pointer transition-all duration-500 hover:border-[#722F37] hover:bg-slate-800"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-[#722F37]/20 text-[#722F37] mb-5 transition-all duration-300 group-hover:bg-[#722F37] group-hover:text-white">
        <Icon size={24} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#722F37] transition-colors">
        {servicio.titulo}
      </h3>

      {/* Description */}
      <p className="text-slate-400 leading-relaxed text-sm">
        {servicio.descripcion}
      </p>

      {/* Arrow indicator */}
      <div className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <svg
          className="w-5 h-5 text-[#722F37]"
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
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#722F37] group-hover:w-full transition-all duration-500" />
    </article>
  )
}
