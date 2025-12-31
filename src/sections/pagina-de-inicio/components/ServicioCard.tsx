import { Users, FileText, Shield, Home } from 'lucide-react'
import type { ServicioCardProps } from '@/../product/sections/pagina-de-inicio/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'users': Users,
  'file-text': FileText,
  'shield': Shield,
  'home': Home,
}

export function ServicioCard({ servicio, onLearnMore }: ServicioCardProps) {
  const Icon = iconMap[servicio.icono] || Home

  return (
    <article
      onClick={onLearnMore}
      className="group relative p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-500 hover:border-[#77333B] hover:shadow-xl"
    >
      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center bg-[#F5F2F2] dark:bg-slate-700 text-[#77333B] mb-6 transition-all duration-300 group-hover:bg-[#77333B] group-hover:text-white">
        <Icon size={28} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-3 group-hover:text-[#77333B] transition-colors">
        {servicio.titulo}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
        {servicio.descripcion}
      </p>

      {/* Arrow indicator */}
      <div className="absolute bottom-8 right-8 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          className="w-5 h-5 text-[#77333B]"
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
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#77333B] group-hover:w-full transition-all duration-500" />
    </article>
  )
}
