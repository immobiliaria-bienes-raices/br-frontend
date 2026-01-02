import { useState, useMemo } from 'react'
import {
  ChevronDown,
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Search,
} from 'lucide-react'
import type { FilterBarProps, FiltrosActivos, Zona, FiltroOpcion } from '../types'

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
// Dropdown Component
// =============================================================================

interface DropdownProps {
  label: string
  isActive: boolean
  children: React.ReactNode
  onClose?: () => void
}

function Dropdown({ label, isActive, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all ${
          isActive
            ? 'border-[#722F37] bg-[#722F37]/5 text-[#722F37] dark:bg-[#722F37]/10'
            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 min-w-[280px] max-h-[400px] overflow-auto">
            {children}
          </div>
        </>
      )}
    </div>
  )
}

// =============================================================================
// Multi-Select Option
// =============================================================================

interface MultiSelectOptionProps {
  label: string
  isSelected: boolean
  onClick: () => void
}

function MultiSelectOption({ label, isSelected, onClick }: MultiSelectOptionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
    >
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          isSelected
            ? 'bg-[#722F37] border-[#722F37]'
            : 'border-slate-300 dark:border-slate-600'
        }`}
      >
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-slate-700 dark:text-slate-300">{label}</span>
    </button>
  )
}

// =============================================================================
// Range Slider
// =============================================================================

interface RangeSliderProps {
  label: string
  min: number
  max: number
  step: number
  valueMin?: number
  valueMax?: number
  formatLabel: (value: number) => string
  onChange: (min?: number, max?: number) => void
}

function RangeSlider({
  label,
  min,
  max,
  step,
  valueMin,
  valueMax,
  formatLabel,
  onChange,
}: RangeSliderProps) {
  const [localMin, setLocalMin] = useState(valueMin ?? min)
  const [localMax, setLocalMax] = useState(valueMax ?? max)

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, localMax - step)
    setLocalMin(newMin)
    onChange(newMin === min ? undefined : newMin, localMax === max ? undefined : localMax)
  }

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, localMin + step)
    setLocalMax(newMax)
    onChange(localMin === min ? undefined : localMin, newMax === max ? undefined : newMax)
  }

  const percentMin = ((localMin - min) / (max - min)) * 100
  const percentMax = ((localMax - min) / (max - min)) * 100

  return (
    <div className="px-4 py-4">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
        {label}
      </p>

      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
        <span>{formatLabel(localMin)}</span>
        <span>-</span>
        <span>{formatLabel(localMax)}</span>
      </div>

      <div className="relative h-2 mb-4">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div
          className="absolute h-full bg-[#722F37] rounded-full"
          style={{
            left: `${percentMin}%`,
            width: `${percentMax - percentMin}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#722F37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#722F37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
    </div>
  )
}

// =============================================================================
// Filter Chip
// =============================================================================

interface FilterChipProps {
  label: string
  onRemove: () => void
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#722F37]/10 text-[#722F37] text-sm font-medium rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-[#722F37]/20 rounded-full transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </span>
  )
}

// =============================================================================
// Main FilterBar Component
// =============================================================================

export function FilterBar({
  zonas,
  filtros,
  filtrosActivos = {},
  onFiltrosChange,
  onReset,
}: FilterBarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const activeCount = countActiveFilters(filtrosActivos)

  // Filter zonas based on search
  const filteredZonas = useMemo(() => {
    if (!searchQuery) return zonas
    const query = searchQuery.toLowerCase()
    return zonas.filter(
      (z) =>
        z.nombre.toLowerCase().includes(query) ||
        z.localidad.toLowerCase().includes(query) ||
        z.codigoPostal.includes(query)
    )
  }, [zonas, searchQuery])

  // Handler functions
  const updateFilter = (updates: Partial<FiltrosActivos>) => {
    onFiltrosChange?.({ ...filtrosActivos, ...updates })
  }

  const toggleZona = (zonaId: string) => {
    const current = filtrosActivos.zonaIds || []
    const updated = current.includes(zonaId)
      ? current.filter((id) => id !== zonaId)
      : [...current, zonaId]
    updateFilter({ zonaIds: updated.length ? updated : undefined })
  }

  const toggleTipo = (tipoId: string) => {
    const current = filtrosActivos.tipos || []
    const updated = current.includes(tipoId)
      ? current.filter((id) => id !== tipoId)
      : [...current, tipoId]
    updateFilter({ tipos: updated.length ? updated : undefined })
  }

  const toggleCaracteristica = (caracteristicaId: string) => {
    const current = filtrosActivos.caracteristicas || []
    const updated = current.includes(caracteristicaId)
      ? current.filter((id) => id !== caracteristicaId)
      : [...current, caracteristicaId]
    updateFilter({ caracteristicas: updated.length ? updated : undefined })
  }

  // Get active filter labels for chips
  const getActiveChips = () => {
    const chips: { label: string; onRemove: () => void }[] = []

    if (filtrosActivos.zonaIds?.length) {
      const zonaNames = filtrosActivos.zonaIds
        .map((id) => zonas.find((z) => z.id === id)?.nombre)
        .filter(Boolean)
      chips.push({
        label: `Zonas: ${zonaNames.join(', ')}`,
        onRemove: () => updateFilter({ zonaIds: undefined }),
      })
    }

    if (filtrosActivos.modalidad) {
      chips.push({
        label: filtrosActivos.modalidad === 'venta' ? 'Venta' : 'Arriendo',
        onRemove: () => updateFilter({ modalidad: undefined }),
      })
    }

    if (filtrosActivos.tipos?.length) {
      const tipoLabels = filtrosActivos.tipos
        .map((id) => filtros.tipos.find((t) => t.id === id)?.label)
        .filter(Boolean)
      chips.push({
        label: tipoLabels.join(', '),
        onRemove: () => updateFilter({ tipos: undefined }),
      })
    }

    if (filtrosActivos.precioMin || filtrosActivos.precioMax) {
      const min = filtrosActivos.precioMin
        ? formatPrecioLabel(filtrosActivos.precioMin)
        : 'Min'
      const max = filtrosActivos.precioMax
        ? formatPrecioLabel(filtrosActivos.precioMax)
        : 'Max'
      chips.push({
        label: `Precio: ${min} - ${max}`,
        onRemove: () => updateFilter({ precioMin: undefined, precioMax: undefined }),
      })
    }

    if (filtrosActivos.habitacionesMin) {
      chips.push({
        label: `${filtrosActivos.habitacionesMin}+ Hab.`,
        onRemove: () => updateFilter({ habitacionesMin: undefined }),
      })
    }

    if (filtrosActivos.banosMin) {
      chips.push({
        label: `${filtrosActivos.banosMin}+ Baños`,
        onRemove: () => updateFilter({ banosMin: undefined }),
      })
    }

    if (filtrosActivos.parqueadero !== undefined) {
      chips.push({
        label: filtrosActivos.parqueadero ? 'Con parqueadero' : 'Sin parqueadero',
        onRemove: () => updateFilter({ parqueadero: undefined }),
      })
    }

    if (filtrosActivos.areaMin || filtrosActivos.areaMax) {
      const min = filtrosActivos.areaMin || filtros.areaRango.min
      const max = filtrosActivos.areaMax || filtros.areaRango.max
      chips.push({
        label: `${min} - ${max} m²`,
        onRemove: () => updateFilter({ areaMin: undefined, areaMax: undefined }),
      })
    }

    if (filtrosActivos.caracteristicas?.length) {
      const labels = filtrosActivos.caracteristicas
        .map((id) => filtros.caracteristicas.find((c) => c.id === id)?.label)
        .filter(Boolean)
      chips.push({
        label: labels.join(', '),
        onRemove: () => updateFilter({ caracteristicas: undefined }),
      })
    }

    return chips
  }

  const activeChips = getActiveChips()
  const precioRango =
    filtrosActivos.modalidad === 'arriendo'
      ? filtros.precioRango.arriendo
      : filtros.precioRango.venta

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      {/* Desktop Filter Bar */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Ubicación Dropdown */}
            <Dropdown
              label="Ubicación"
              isActive={!!filtrosActivos.zonaIds?.length || !!filtrosActivos.codigoPostal}
            >
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar zona o código postal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F37]/20"
                  />
                </div>
              </div>
              <div className="max-h-[300px] overflow-auto">
                {filteredZonas.map((zona) => (
                  <MultiSelectOption
                    key={zona.id}
                    label={`${zona.nombre} (${zona.codigoPostal})`}
                    isSelected={filtrosActivos.zonaIds?.includes(zona.id) || false}
                    onClick={() => toggleZona(zona.id)}
                  />
                ))}
              </div>
            </Dropdown>

            {/* Tipo Dropdown */}
            <Dropdown label="Tipo" isActive={!!filtrosActivos.tipos?.length}>
              <div className="py-2">
                {filtros.tipos.map((tipo) => (
                  <MultiSelectOption
                    key={tipo.id}
                    label={tipo.label}
                    isSelected={filtrosActivos.tipos?.includes(tipo.id) || false}
                    onClick={() => toggleTipo(tipo.id)}
                  />
                ))}
              </div>
            </Dropdown>

            {/* Modalidad Dropdown */}
            <Dropdown label="Modalidad" isActive={!!filtrosActivos.modalidad}>
              <div className="py-2">
                {filtros.modalidades.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() =>
                      updateFilter({
                        modalidad:
                          filtrosActivos.modalidad === mod.id
                            ? undefined
                            : (mod.id as 'venta' | 'arriendo'),
                      })
                    }
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      filtrosActivos.modalidad === mod.id
                        ? 'text-[#722F37] font-medium'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </Dropdown>

            {/* Precio Dropdown */}
            <Dropdown
              label="Precio"
              isActive={!!filtrosActivos.precioMin || !!filtrosActivos.precioMax}
            >
              <RangeSlider
                label={`Rango de precio (${filtrosActivos.modalidad === 'arriendo' ? 'Arriendo' : 'Venta'})`}
                min={precioRango.min}
                max={precioRango.max}
                step={precioRango.step}
                valueMin={filtrosActivos.precioMin}
                valueMax={filtrosActivos.precioMax}
                formatLabel={formatPrecioLabel}
                onChange={(min, max) => updateFilter({ precioMin: min, precioMax: max })}
              />
            </Dropdown>

            {/* Habitaciones Dropdown */}
            <Dropdown label="Habitaciones" isActive={!!filtrosActivos.habitacionesMin}>
              <div className="py-2">
                {filtros.habitaciones.map((hab) => (
                  <button
                    key={hab.id}
                    onClick={() =>
                      updateFilter({
                        habitacionesMin:
                          filtrosActivos.habitacionesMin === Number(hab.id)
                            ? undefined
                            : Number(hab.id),
                      })
                    }
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      filtrosActivos.habitacionesMin === Number(hab.id)
                        ? 'text-[#722F37] font-medium'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {hab.label}
                  </button>
                ))}
              </div>
            </Dropdown>

            {/* Baños Dropdown */}
            <Dropdown label="Baños" isActive={!!filtrosActivos.banosMin}>
              <div className="py-2">
                {filtros.banos.map((bano) => (
                  <button
                    key={bano.id}
                    onClick={() =>
                      updateFilter({
                        banosMin:
                          filtrosActivos.banosMin === Number(bano.id)
                            ? undefined
                            : Number(bano.id),
                      })
                    }
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      filtrosActivos.banosMin === Number(bano.id)
                        ? 'text-[#722F37] font-medium'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {bano.label}
                  </button>
                ))}
              </div>
            </Dropdown>

            {/* Más Filtros Dropdown */}
            <Dropdown
              label="Más filtros"
              isActive={
                filtrosActivos.parqueadero !== undefined ||
                !!filtrosActivos.areaMin ||
                !!filtrosActivos.areaMax ||
                !!filtrosActivos.caracteristicas?.length
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* Parqueadero */}
                <div className="py-3 px-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Parqueadero
                  </p>
                  <div className="flex gap-2">
                    {filtros.parqueadero.map((option) => (
                      <button
                        key={option.id}
                        onClick={() =>
                          updateFilter({
                            parqueadero:
                              (filtrosActivos.parqueadero === true && option.id === 'con') ||
                              (filtrosActivos.parqueadero === false && option.id === 'sin')
                                ? undefined
                                : option.id === 'con',
                          })
                        }
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          (filtrosActivos.parqueadero === true && option.id === 'con') ||
                          (filtrosActivos.parqueadero === false && option.id === 'sin')
                            ? 'border-[#722F37] bg-[#722F37]/5 text-[#722F37]'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Área */}
                <RangeSlider
                  label="Área (m²)"
                  min={filtros.areaRango.min}
                  max={filtros.areaRango.max}
                  step={filtros.areaRango.step}
                  valueMin={filtrosActivos.areaMin}
                  valueMax={filtrosActivos.areaMax}
                  formatLabel={(v) => `${v} m²`}
                  onChange={(min, max) => updateFilter({ areaMin: min, areaMax: max })}
                />

                {/* Características */}
                <div className="py-3">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 px-4">
                    Características
                  </p>
                  <div className="max-h-[200px] overflow-auto">
                    {filtros.caracteristicas.map((car) => (
                      <MultiSelectOption
                        key={car.id}
                        label={car.label}
                        isSelected={
                          filtrosActivos.caracteristicas?.includes(car.id) || false
                        }
                        onClick={() => toggleCaracteristica(car.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Dropdown>

            {/* Reset Button */}
            {activeCount > 0 && (
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#722F37] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Active Filter Chips */}
          {activeChips.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Filtros activos:
              </span>
              {activeChips.map((chip, index) => (
                <FilterChip key={index} label={chip.label} onRemove={chip.onRemove} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Filtros
              </span>
              {activeCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-[#722F37] text-white rounded-full">
                  {activeCount}
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${
                isMobileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {isMobileOpen && (
          <div className="container mx-auto px-4 pb-4 space-y-4">
            {/* Zonas */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Ubicación
              </label>
              <div className="flex flex-wrap gap-2">
                {zonas.slice(0, 6).map((zona) => (
                  <button
                    key={zona.id}
                    onClick={() => toggleZona(zona.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      filtrosActivos.zonaIds?.includes(zona.id)
                        ? 'border-[#722F37] bg-[#722F37]/5 text-[#722F37]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {zona.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Modalidad */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Modalidad
              </label>
              <div className="flex gap-2">
                {filtros.modalidades.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() =>
                      updateFilter({
                        modalidad:
                          filtrosActivos.modalidad === mod.id
                            ? undefined
                            : (mod.id as 'venta' | 'arriendo'),
                      })
                    }
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                      filtrosActivos.modalidad === mod.id
                        ? 'border-[#722F37] bg-[#722F37] text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tipo de propiedad
              </label>
              <div className="flex flex-wrap gap-2">
                {filtros.tipos.map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => toggleTipo(tipo.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      filtrosActivos.tipos?.includes(tipo.id)
                        ? 'border-[#722F37] bg-[#722F37]/5 text-[#722F37]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {activeCount > 0 && (
              <button
                onClick={onReset}
                className="w-full py-2.5 text-sm font-medium text-[#722F37] border border-[#722F37] rounded-lg hover:bg-[#722F37]/5 transition-colors"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
