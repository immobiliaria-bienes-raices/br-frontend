import { useState } from 'react'
import {
  Bookmark,
  Bell,
  BellOff,
  Trash2,
  ChevronRight,
  Calendar,
  Search,
} from 'lucide-react'
import type { BusquedasGuardadasPanelProps, BusquedaGuardada } from '../types'

// =============================================================================
// Utility Functions
// =============================================================================

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getFilterCount(busqueda: BusquedaGuardada): number {
  const filtros = busqueda.filtros
  let count = 0
  if (filtros.zonaIds?.length) count++
  if (filtros.codigoPostal) count++
  if (filtros.tipos?.length) count++
  if (filtros.modalidad) count++
  if (filtros.precioMin || filtros.precioMax) count++
  if (filtros.areaMin || filtros.areaMax) count++
  if (filtros.habitacionesMin) count++
  if (filtros.banosMin) count++
  if (filtros.parqueadero !== undefined) count++
  if (filtros.caracteristicas?.length) count++
  return count
}

// =============================================================================
// Search Card Component
// =============================================================================

interface SearchCardProps {
  busqueda: BusquedaGuardada
  onCargar?: () => void
  onEliminar?: () => void
  onToggleAlerta?: () => void
}

function SearchCard({
  busqueda,
  onCargar,
  onEliminar,
  onToggleAlerta,
}: SearchCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const filterCount = getFilterCount(busqueda)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (showDeleteConfirm) {
      onEliminar?.()
      setShowDeleteConfirm(false)
    } else {
      setShowDeleteConfirm(true)
    }
  }

  return (
    <div
      className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-[#722F37]/30 hover:shadow-md transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowDeleteConfirm(false)
      }}
      onClick={onCargar}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#722F37]/10 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-[#722F37]" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1">
                {busqueda.nombre}
              </h4>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(busqueda.fechaCreacion)}</span>
              </div>
            </div>
          </div>

          {/* Alert Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleAlerta?.()
            }}
            className={`p-2 rounded-lg transition-colors ${
              busqueda.alertaActiva
                ? 'bg-[#722F37]/10 text-[#722F37] hover:bg-[#722F37]/20'
                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            title={busqueda.alertaActiva ? 'Desactivar alertas' : 'Activar alertas'}
          >
            {busqueda.alertaActiva ? (
              <Bell className="w-4 h-4" />
            ) : (
              <BellOff className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Filter Summary */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
            {filterCount} filtro{filterCount !== 1 ? 's' : ''}
          </span>
          {busqueda.filtros.modalidad && (
            <span className="px-2 py-1 text-xs font-medium bg-[#722F37]/10 text-[#722F37] rounded capitalize">
              {busqueda.filtros.modalidad}
            </span>
          )}
          {busqueda.filtros.tipos?.length === 1 && (
            <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded capitalize">
              {busqueda.filtros.tipos[0]}
            </span>
          )}
        </div>

        {/* Actions */}
        <div
          className={`flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleDelete}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              showDeleteConfirm
                ? 'bg-red-500 text-white'
                : 'text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {showDeleteConfirm ? 'Confirmar' : 'Eliminar'}
          </button>

          <div className="flex items-center gap-1.5 text-sm font-medium text-[#722F37]">
            <span>Cargar</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function BusquedasGuardadasPanel({
  busquedas,
  onCargar,
  onEliminar,
  onToggleAlerta,
}: BusquedasGuardadasPanelProps) {
  if (busquedas.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No tienes búsquedas guardadas
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Aplica filtros y guarda tu búsqueda para acceder fácilmente la próxima vez
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Búsquedas guardadas
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {busquedas.length} {busquedas.length === 1 ? 'búsqueda' : 'búsquedas'}
        </span>
      </div>

      {/* Search Cards */}
      <div className="space-y-3">
        {busquedas.map((busqueda) => (
          <SearchCard
            key={busqueda.id}
            busqueda={busqueda}
            onCargar={() => onCargar?.(busqueda.id)}
            onEliminar={() => onEliminar?.(busqueda.id)}
            onToggleAlerta={() => onToggleAlerta?.(busqueda.id)}
          />
        ))}
      </div>
    </div>
  )
}
