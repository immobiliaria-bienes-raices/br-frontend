import { CheckCircle, Handshake, MapPin, Award, Clock, Users } from 'lucide-react'
import type { ValorPropuesta } from '@/../product/sections/pagina-de-inicio/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'check-circle': CheckCircle,
  'handshake': Handshake,
  'map-pin': MapPin,
  'award': Award,
  'clock': Clock,
  'users': Users,
}

interface ValorPropuestaCardProps {
  valorPropuesta: ValorPropuesta
  index?: number
}

export function ValorPropuestaCard({ valorPropuesta, index = 0 }: ValorPropuestaCardProps) {
  const Icon = iconMap[valorPropuesta.icono] || CheckCircle

  return (
    <div
      className="group text-center"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Icon Container */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        {/* Background Circle */}
        <div className="absolute inset-0 bg-[#722F37]/5 rounded-full transition-all duration-500 group-hover:bg-[#722F37]/10 group-hover:scale-110" />
        {/* Icon Circle */}
        <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 group-hover:shadow-xl">
          <Icon size={32} className="text-[#722F37]" />
        </div>
        {/* Decorative Ring */}
        <div className="absolute inset-0 border-2 border-dashed border-[#722F37]/20 rounded-full animate-spin-slow" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-4 group-hover:text-[#722F37] transition-colors">
        {valorPropuesta.titulo}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
        {valorPropuesta.descripcion}
      </p>

      {/* Bottom Accent */}
      <div className="w-12 h-0.5 bg-[#722F37]/30 mx-auto mt-6 transition-all duration-500 group-hover:w-20 group-hover:bg-[#722F37]" />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
