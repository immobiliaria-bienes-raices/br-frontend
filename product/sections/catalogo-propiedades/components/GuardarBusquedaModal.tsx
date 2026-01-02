import { useState, useEffect, useRef } from 'react'
import { X, Bookmark, Bell } from 'lucide-react'
import type { GuardarBusquedaModalProps, FiltrosActivos } from '../types'

// =============================================================================
// Utility Functions
// =============================================================================

function getFilterSummary(filtros: FiltrosActivos): string {
  const parts: string[] = []

  if (filtros.modalidad) {
    parts.push(filtros.modalidad === 'venta' ? 'Venta' : 'Arriendo')
  }

  if (filtros.tipos?.length) {
    parts.push(filtros.tipos.join(', '))
  }

  if (filtros.zonaIds?.length) {
    parts.push(`${filtros.zonaIds.length} zona${filtros.zonaIds.length > 1 ? 's' : ''}`)
  }

  if (filtros.precioMin || filtros.precioMax) {
    parts.push('rango de precio')
  }

  if (filtros.habitacionesMin) {
    parts.push(`${filtros.habitacionesMin}+ hab.`)
  }

  if (filtros.banosMin) {
    parts.push(`${filtros.banosMin}+ baños`)
  }

  return parts.length > 0 ? parts.join(' • ') : 'Sin filtros específicos'
}

function generateSuggestedName(filtros: FiltrosActivos): string {
  const parts: string[] = []

  if (filtros.tipos?.length === 1) {
    const tipoLabels: Record<string, string> = {
      apartamento: 'Apartamentos',
      casa: 'Casas',
      apartaestudio: 'Apartaestudios',
      local: 'Locales',
    }
    parts.push(tipoLabels[filtros.tipos[0]] || filtros.tipos[0])
  } else if (filtros.tipos?.length) {
    parts.push('Inmuebles')
  }

  if (filtros.modalidad) {
    parts.push(`en ${filtros.modalidad}`)
  }

  if (filtros.zonaIds?.length === 1) {
    parts.push('en zona seleccionada')
  } else if (filtros.zonaIds?.length) {
    parts.push(`en ${filtros.zonaIds.length} zonas`)
  }

  if (parts.length === 0) {
    return 'Mi búsqueda'
  }

  return parts.join(' ')
}

// =============================================================================
// Main Component
// =============================================================================

export function GuardarBusquedaModal({
  isOpen,
  filtros,
  onClose,
  onSave,
}: GuardarBusquedaModalProps) {
  const [nombre, setNombre] = useState('')
  const [enableAlerts, setEnableAlerts] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate suggested name when modal opens
  useEffect(() => {
    if (isOpen) {
      setNombre(generateSuggestedName(filtros))
      // Focus input after a short delay for animation
      setTimeout(() => {
        inputRef.current?.select()
      }, 100)
    }
  }, [isOpen, filtros])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nombre.trim()) {
      onSave(nombre.trim())
      setNombre('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#722F37]/10 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-[#722F37]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Guardar búsqueda
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Guarda estos filtros para acceder fácilmente
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Filter Summary */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Filtros incluidos
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {getFilterSummary(filtros)}
              </p>
            </div>

            {/* Name Input */}
            <div>
              <label
                htmlFor="search-name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Nombre de la búsqueda
              </label>
              <input
                ref={inputRef}
                id="search-name"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Apartamentos en Santa Bárbara"
                className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F37]/20 focus:border-[#722F37] transition-colors"
                maxLength={50}
              />
              <p className="mt-1.5 text-xs text-slate-400 text-right">
                {nombre.length}/50
              </p>
            </div>

            {/* Alert Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#722F37]" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Activar alertas
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Recibe notificaciones de nuevas propiedades
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEnableAlerts(!enableAlerts)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  enableAlerts
                    ? 'bg-[#722F37]'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    enableAlerts ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!nombre.trim()}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-[#722F37] rounded-lg hover:bg-[#5a252c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Guardar búsqueda
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
