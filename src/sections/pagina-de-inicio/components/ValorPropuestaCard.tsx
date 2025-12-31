import { CheckCircle, Handshake, MapPin } from 'lucide-react'
import type { ValorPropuesta } from '@/../product/sections/pagina-de-inicio/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'check-circle': CheckCircle,
  'handshake': Handshake,
  'map-pin': MapPin,
}

interface ValorPropuestaCardProps {
  valorPropuesta: ValorPropuesta
}

export function ValorPropuestaCard({ valorPropuesta }: ValorPropuestaCardProps) {
  const Icon = iconMap[valorPropuesta.icono] || CheckCircle

  return (
    <div className="text-center">
      {/* Icon Circle */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#77333B]/10 flex items-center justify-center">
        <Icon size={32} className="text-[#77333B]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-3">
        {valorPropuesta.titulo}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
        {valorPropuesta.descripcion}
      </p>
    </div>
  )
}
