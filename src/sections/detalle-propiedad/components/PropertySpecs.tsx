import { Maximize2, BedDouble, Bath, Car, Building2 } from 'lucide-react'

interface PropertySpecsProps {
  area: number
  habitaciones: number | null
  banos: number
  parqueadero: boolean
  piso: number | null
}

export function PropertySpecs({ area, habitaciones, banos, parqueadero, piso }: PropertySpecsProps) {
  const specs = [
    {
      icon: Maximize2,
      label: 'Área',
      value: `${area} m²`,
      show: true,
    },
    {
      icon: BedDouble,
      label: 'Habitaciones',
      value: habitaciones !== null ? `${habitaciones}` : 'Estudio',
      show: true,
    },
    {
      icon: Bath,
      label: 'Baños',
      value: `${banos}`,
      show: true,
    },
    {
      icon: Car,
      label: 'Parqueadero',
      value: parqueadero ? 'Sí' : 'No',
      show: true,
    },
    {
      icon: Building2,
      label: 'Piso',
      value: piso !== null ? `${piso}` : '-',
      show: piso !== null,
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
      {specs.filter(s => s.show).map((spec, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center p-4 lg:p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
        >
          <spec.icon
            size={28}
            strokeWidth={1.5}
            className="text-[#722F37] mb-3"
          />
          <span className="text-2xl font-light text-slate-900 dark:text-white mb-1">
            {spec.value}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {spec.label}
          </span>
        </div>
      ))}
    </div>
  )
}
