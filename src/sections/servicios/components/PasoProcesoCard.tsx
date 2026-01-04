import type { PasoProcesoCardProps } from '@/../product/sections/servicios/types'

export function PasoProcesoCard({ paso, isReversed = false }: PasoProcesoCardProps) {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
          <img
            src={paso.imagen}
            alt={paso.titulo}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          {/* Step Number Badge */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-[#722F37] text-white rounded-full flex items-center justify-center font-bold text-lg">
            {paso.numero}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        <div className="max-w-md">
          {/* Step Indicator */}
          <span className="text-[#722F37] text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
            Paso {paso.numero}
          </span>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-light text-slate-900 dark:text-white mb-4">
            {paso.titulo}
          </h3>

          {/* Divider */}
          <div className="w-12 h-px bg-[#722F37] mb-6" />

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {paso.descripcion}
          </p>
        </div>
      </div>
    </div>
  )
}
