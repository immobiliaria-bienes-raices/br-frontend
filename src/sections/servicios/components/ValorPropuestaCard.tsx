import { UserCheck, Calculator, Megaphone, Users, Eye } from 'lucide-react'
import type { ValorPropuestaCardProps } from '@/../product/sections/servicios/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'user-check': UserCheck,
  'calculator': Calculator,
  'megaphone': Megaphone,
  'users': Users,
  'eye': Eye,
}

export function ValorPropuestaCard({ valorPropuesta, index = 0 }: ValorPropuestaCardProps) {
  const Icon = iconMap[valorPropuesta.icono] || UserCheck

  return (
    <div
      className="group text-center p-8"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#722F37]/10 flex items-center justify-center group-hover:bg-[#722F37] transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#722F37] group-hover:text-white transition-colors duration-300" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
        {valorPropuesta.titulo}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {valorPropuesta.descripcion}
      </p>
    </div>
  )
}
