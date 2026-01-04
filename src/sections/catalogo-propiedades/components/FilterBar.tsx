'use client'

import { useState, useMemo } from 'react'
import {
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  Plus,
  Minus,
  Bookmark,
  RotateCcw,
  SlidersHorizontal,
  Check,
} from 'lucide-react'
import type { FilterBarProps, FiltrosActivos } from '@/../product/sections/catalogo-propiedades/types'

// =============================================================================
// Utility Functions
// =============================================================================

function formatPrecioLabel(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1).replace('.0', '')} mil M`
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(0)} M`
  }
  return `$${value.toLocaleString('es-CO')}`
}

function countActiveFilters(filtros?: FiltrosActivos): number {
  if (!filtros) return 0
  let count = 0
  if (filtros.zonaIds?.length) count++
  if (filtros.codigoPostal) count++
  if (filtros.tipos?.length) count++
  if (filtros.precioMin || filtros.precioMax) count++
  if (filtros.areaMin || filtros.areaMax) count++
  if (filtros.habitacionesMin) count++
  if (filtros.banosMin) count++
  if (filtros.parqueadero !== undefined) count++
  if (filtros.caracteristicas?.length) count++
  return count
}

// =============================================================================
// Increment/Decrement Counter Component
// =============================================================================

interface CounterProps {
  label: string
  value: number | undefined
  min?: number
  max?: number
  onChange: (value: number | undefined) => void
}

function Counter({ label, value, min = 0, max = 10, onChange }: CounterProps) {
  const currentValue = value ?? 0

  const decrement = () => {
    if (currentValue <= min) {
      onChange(undefined)
    } else {
      onChange(currentValue - 1)
    }
  }

  const increment = () => {
    if (currentValue < max) {
      onChange(currentValue + 1)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-300 min-w-[80px]">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition-colors disabled:opacity-50"
          disabled={currentValue <= min}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-white font-medium w-8 text-center">
          {currentValue === 0 ? '-' : `${currentValue}+`}
        </span>
        <button
          onClick={increment}
          className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition-colors disabled:opacity-50"
          disabled={currentValue >= max}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// Filter Chip Component
// =============================================================================

interface FilterChipProps {
  label: string
  onRemove: () => void
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#722F37]/20 text-[#722F37] text-sm font-medium rounded-full border border-[#722F37]/30">
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-[#722F37]/30 rounded-full transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </span>
  )
}

// =============================================================================
// Main FilterBar Component (E&V Style)
// =============================================================================

export function FilterBar({
  zonas,
  filtros,
  filtrosActivos = {},
  onFiltrosChange,
  onReset,
  onGuardarBusqueda,
  isLoggedIn = false,
}: FilterBarProps & { onGuardarBusqueda?: () => void; isLoggedIn?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showTipoDropdown, setShowTipoDropdown] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Local state for pending changes (applied on "Aplicar" click)
  const [pendingFilters, setPendingFilters] = useState<FiltrosActivos>(filtrosActivos)

  const activeCount = countActiveFilters(filtrosActivos)

  // Filter zonas based on search
  const filteredZonas = useMemo(() => {
    if (!locationSearch) return zonas
    const query = locationSearch.toLowerCase()
    return zonas.filter(
      (z) =>
        z.nombre.toLowerCase().includes(query) ||
        z.localidad.toLowerCase().includes(query) ||
        z.codigoPostal.includes(query)
    )
  }, [zonas, locationSearch])

  // Update pending filter
  const updatePending = (updates: Partial<FiltrosActivos>) => {
    setPendingFilters((prev) => ({ ...prev, ...updates }))
  }

  // Apply filters
  const applyFilters = () => {
    onFiltrosChange?.(pendingFilters)
  }

  // Toggle zona selection
  const toggleZona = (zonaId: string) => {
    const current = pendingFilters.zonaIds || []
    const updated = current.includes(zonaId)
      ? current.filter((id) => id !== zonaId)
      : [...current, zonaId]
    updatePending({ zonaIds: updated.length ? updated : undefined })
  }

  // Get selected zona names
  const selectedZonaNames = useMemo(() => {
    if (!pendingFilters.zonaIds?.length) return ''
    return pendingFilters.zonaIds
      .map((id) => zonas.find((z) => z.id === id)?.nombre)
      .filter(Boolean)
      .join(', ')
  }, [pendingFilters.zonaIds, zonas])

  // Get active filter chips
  const getActiveChips = () => {
    const chips: { label: string; onRemove: () => void }[] = []

    if (filtrosActivos.zonaIds?.length) {
      const zonaNames = filtrosActivos.zonaIds
        .map((id) => zonas.find((z) => z.id === id)?.nombre)
        .filter(Boolean)
      chips.push({
        label: `${zonaNames.join(', ')}`,
        onRemove: () => onFiltrosChange?.({ ...filtrosActivos, zonaIds: undefined }),
      })
    }

    if (filtrosActivos.tipos?.length) {
      const tipoLabels = filtrosActivos.tipos
        .map((id) => filtros.tipos.find((t) => t.id === id)?.label)
        .filter(Boolean)
      chips.push({
        label: tipoLabels.join(', '),
        onRemove: () => onFiltrosChange?.({ ...filtrosActivos, tipos: undefined }),
      })
    }

    if (filtrosActivos.precioMin || filtrosActivos.precioMax) {
      const min = filtrosActivos.precioMin ? formatPrecioLabel(filtrosActivos.precioMin) : 'Min'
      const max = filtrosActivos.precioMax ? formatPrecioLabel(filtrosActivos.precioMax) : 'Max'
      chips.push({
        label: `${min} - ${max}`,
        onRemove: () => onFiltrosChange?.({ ...filtrosActivos, precioMin: undefined, precioMax: undefined }),
      })
    }

    if (filtrosActivos.habitacionesMin) {
      chips.push({
        label: `${filtrosActivos.habitacionesMin}+ Hab.`,
        onRemove: () => onFiltrosChange?.({ ...filtrosActivos, habitacionesMin: undefined }),
      })
    }

    if (filtrosActivos.banosMin) {
      chips.push({
        label: `${filtrosActivos.banosMin}+ Baños`,
        onRemove: () => onFiltrosChange?.({ ...filtrosActivos, banosMin: undefined }),
      })
    }

    if (filtrosActivos.areaMin || filtrosActivos.areaMax) {
      const min = filtrosActivos.areaMin || filtros.areaRango.min
      const max = filtrosActivos.areaMax || filtros.areaRango.max
      chips.push({
        label: `${min} - ${max} m²`,
        onRemove: () => onFiltrosChange?.({ ...filtrosActivos, areaMin: undefined, areaMax: undefined }),
      })
    }

    return chips
  }

  const activeChips = getActiveChips()

  return (
    <div className="sticky top-0 z-40">
      {/* ========== DESKTOP: Dark E&V Style Filter Bar ========== */}
      <div className="hidden lg:block bg-[#1a1a1a] border-b border-slate-800">
        {/* Primary Row */}
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-3 py-4">
            {/* Venta / Arriendo Toggle */}
            <div className="flex rounded-lg overflow-hidden border border-slate-700">
              <button
                onClick={() => updatePending({ modalidad: 'venta' })}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  pendingFilters.modalidad !== 'arriendo'
                    ? 'bg-white text-[#1a1a1a]'
                    : 'bg-transparent text-slate-300 hover:text-white'
                }`}
              >
                Venta
              </button>
              <button
                onClick={() => updatePending({ modalidad: 'arriendo' })}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  pendingFilters.modalidad === 'arriendo'
                    ? 'bg-white text-[#1a1a1a]'
                    : 'bg-transparent text-slate-300 hover:text-white'
                }`}
              >
                Arriendo
              </button>
            </div>

            {/* Location Search */}
            <div className="relative flex-1 max-w-md">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Ciudad, barrio o código postal"
                value={locationSearch || selectedZonaNames}
                onChange={(e) => {
                  setLocationSearch(e.target.value)
                  setShowLocationDropdown(true)
                }}
                onFocus={() => setShowLocationDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#722F37]/50 focus:border-[#722F37]"
              />

              {/* Location Dropdown */}
              {showLocationDropdown && filteredZonas.length > 0 && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLocationDropdown(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-auto">
                    {filteredZonas.map((zona) => (
                      <button
                        key={zona.id}
                        onClick={() => {
                          toggleZona(zona.id)
                          setLocationSearch('')
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center justify-between ${
                          pendingFilters.zonaIds?.includes(zona.id) ? 'bg-slate-700' : ''
                        }`}
                      >
                        <div>
                          <p className="text-white font-medium">{zona.nombre}</p>
                          <p className="text-sm text-slate-400">{zona.localidad} • {zona.codigoPostal}</p>
                        </div>
                        {pendingFilters.zonaIds?.includes(zona.id) && (
                          <Check className="w-4 h-4 text-[#722F37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Property Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTipoDropdown(!showTipoDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-slate-600 transition-colors min-w-[180px]"
              >
                <span className="flex-1 text-left">
                  {pendingFilters.tipos?.length
                    ? filtros.tipos.find((t) => t.id === pendingFilters.tipos![0])?.label
                    : 'Tipo de propiedad'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showTipoDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowTipoDropdown(false)} />
                  <div className="absolute top-full left-0 mt-1 z-50 bg-slate-800 border border-slate-700 rounded-lg shadow-xl min-w-[200px]">
                    {filtros.tipos.map((tipo) => (
                      <button
                        key={tipo.id}
                        onClick={() => {
                          const current = pendingFilters.tipos || []
                          const updated = current.includes(tipo.id)
                            ? current.filter((id) => id !== tipo.id)
                            : [...current, tipo.id]
                          updatePending({ tipos: updated.length ? updated : undefined })
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center justify-between ${
                          pendingFilters.tipos?.includes(tipo.id) ? 'bg-slate-700' : ''
                        }`}
                      >
                        <span className="text-white">{tipo.label}</span>
                        {pendingFilters.tipos?.includes(tipo.id) && (
                          <Check className="w-4 h-4 text-[#722F37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Más Filtros Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                isExpanded
                  ? 'bg-[#722F37] border-[#722F37] text-white'
                  : 'bg-slate-800 border-slate-700 text-white hover:border-slate-600'
              }`}
            >
              <span>Más Filtros</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Apply Button */}
            <button
              onClick={applyFilters}
              className="px-6 py-2.5 bg-white text-[#1a1a1a] font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              Aplicar
            </button>

            {/* Save Search Button - Secondary Color #722F37 */}
            {isLoggedIn && (
              <button
                onClick={onGuardarBusqueda}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#722F37] text-white font-medium rounded-lg hover:bg-[#5a252c] transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                <span>Guardar Búsqueda</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Row (Expandable) */}
        {isExpanded && (
          <div className="border-t border-slate-800">
            <div className="container mx-auto px-4 lg:px-6 py-4">
              <div className="flex flex-wrap items-center gap-6">
                {/* Price Range */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-300">Precio</span>
                  <input
                    type="text"
                    placeholder="Min"
                    value={pendingFilters.precioMin ? formatPrecioLabel(pendingFilters.precioMin) : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      updatePending({ precioMin: value ? Number(value) : undefined })
                    }}
                    className="w-28 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#722F37]/50"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    value={pendingFilters.precioMax ? formatPrecioLabel(pendingFilters.precioMax) : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      updatePending({ precioMax: value ? Number(value) : undefined })
                    }}
                    className="w-28 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#722F37]/50"
                  />
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-slate-700" />

                {/* Habitaciones Counter */}
                <Counter
                  label="Habitaciones"
                  value={pendingFilters.habitacionesMin}
                  min={0}
                  max={6}
                  onChange={(val) => updatePending({ habitacionesMin: val })}
                />

                {/* Divider */}
                <div className="h-8 w-px bg-slate-700" />

                {/* Baños Counter */}
                <Counter
                  label="Baños"
                  value={pendingFilters.banosMin}
                  min={0}
                  max={5}
                  onChange={(val) => updatePending({ banosMin: val })}
                />

                {/* Divider */}
                <div className="h-8 w-px bg-slate-700" />

                {/* Area Range */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-300">Área m²</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={pendingFilters.areaMin || ''}
                    onChange={(e) => updatePending({ areaMin: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-20 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#722F37]/50"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={pendingFilters.areaMax || ''}
                    onChange={(e) => updatePending({ areaMax: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-20 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#722F37]/50"
                  />
                </div>

                {/* Reset Filters */}
                {activeCount > 0 && (
                  <>
                    <div className="h-8 w-px bg-slate-700" />
                    <button
                      onClick={() => {
                        setPendingFilters({})
                        onReset?.()
                      }}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Limpiar filtros
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========== MOBILE: Collapsible Filter Panel ========== */}
      <div className="lg:hidden bg-[#1a1a1a] border-b border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex items-center justify-between w-full px-4 py-3 bg-slate-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-white">Filtros</span>
              {activeCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-[#722F37] text-white rounded-full">
                  {activeCount}
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform ${
                isMobileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {isMobileOpen && (
          <div className="container mx-auto px-4 pb-4 space-y-4">
            {/* Modalidad Toggle */}
            <div className="flex rounded-lg overflow-hidden border border-slate-700">
              <button
                onClick={() => updatePending({ modalidad: 'venta' })}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                  pendingFilters.modalidad !== 'arriendo'
                    ? 'bg-white text-[#1a1a1a]'
                    : 'bg-transparent text-slate-300'
                }`}
              >
                Venta
              </button>
              <button
                onClick={() => updatePending({ modalidad: 'arriendo' })}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                  pendingFilters.modalidad === 'arriendo'
                    ? 'bg-white text-[#1a1a1a]'
                    : 'bg-transparent text-slate-300'
                }`}
              >
                Arriendo
              </button>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Ubicación</label>
              <div className="flex flex-wrap gap-2">
                {zonas.slice(0, 6).map((zona) => (
                  <button
                    key={zona.id}
                    onClick={() => toggleZona(zona.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      pendingFilters.zonaIds?.includes(zona.id)
                        ? 'border-[#722F37] bg-[#722F37]/20 text-white'
                        : 'border-slate-700 text-slate-300'
                    }`}
                  >
                    {zona.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de propiedad</label>
              <div className="flex flex-wrap gap-2">
                {filtros.tipos.map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => {
                      const current = pendingFilters.tipos || []
                      const updated = current.includes(tipo.id)
                        ? current.filter((id) => id !== tipo.id)
                        : [...current, tipo.id]
                      updatePending({ tipos: updated.length ? updated : undefined })
                    }}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      pendingFilters.tipos?.includes(tipo.id)
                        ? 'border-[#722F37] bg-[#722F37]/20 text-white'
                        : 'border-slate-700 text-slate-300'
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => {
                applyFilters()
                setIsMobileOpen(false)
              }}
              className="w-full py-3 bg-white text-[#1a1a1a] font-medium rounded-lg"
            >
              Aplicar Filtros
            </button>

            {/* Save Search - Mobile */}
            {isLoggedIn && (
              <button
                onClick={onGuardarBusqueda}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#722F37] text-white font-medium rounded-lg"
              >
                <Bookmark className="w-4 h-4" />
                Guardar Búsqueda
              </button>
            )}

            {/* Reset */}
            {activeCount > 0 && (
              <button
                onClick={() => {
                  setPendingFilters({})
                  onReset?.()
                }}
                className="w-full py-2.5 text-sm font-medium text-slate-400 border border-slate-700 rounded-lg"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="bg-[#F5F2F2] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 lg:px-6 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-slate-500 dark:text-slate-400">Filtros activos:</span>
              {activeChips.map((chip, index) => (
                <FilterChip key={index} label={chip.label} onRemove={chip.onRemove} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
