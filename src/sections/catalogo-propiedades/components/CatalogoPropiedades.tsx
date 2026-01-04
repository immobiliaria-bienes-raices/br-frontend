'use client'

import { useState, useMemo } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  List,
} from 'lucide-react'
import type { CatalogoPropiedadesProps, FiltrosActivos } from '@/../product/sections/catalogo-propiedades/types'
import { PropiedadCatalogoCard } from './PropiedadCatalogoCard'
import { FilterBar } from './FilterBar'
import { GuardarBusquedaModal } from './GuardarBusquedaModal'
import { BusquedasGuardadasPanel } from './BusquedasGuardadasPanel'

// =============================================================================
// Sort Dropdown
// =============================================================================

interface SortDropdownProps {
  options: CatalogoPropiedadesProps['ordenOpciones']
  value?: CatalogoPropiedadesProps['ordenActivo']
  onChange?: (value: CatalogoPropiedadesProps['ordenActivo']) => void
}

function SortDropdown({ options, value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentOption = options.find((o) => o.id === value) || options[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
      >
        <span>Ordenar: {currentOption.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 z-50 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 min-w-[200px] overflow-hidden">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange?.(option.id)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                  option.id === value
                    ? 'text-[#722F37] font-medium bg-[#722F37]/5'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// =============================================================================
// Pagination
// =============================================================================

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | 'ellipsis')[] = []

  // Always show first page
  pages.push(1)

  // Calculate range around current page
  const rangeStart = Math.max(2, currentPage - 1)
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

  if (rangeStart > 2) {
    pages.push('ellipsis')
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (rangeEnd < totalPages - 1) {
    pages.push('ellipsis')
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-slate-400 dark:text-slate-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-[#722F37] text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

// =============================================================================
// Main Component - LIST VIEW ONLY
// =============================================================================

export function CatalogoPropiedades({
  propiedades,
  zonas,
  filtros,
  ordenOpciones,
  busquedasGuardadas,
  usuario,
  resultados,
  filtrosActivos = {},
  ordenActivo = 'recientes',
  onViewPropiedad,
  onToggleFavorito,
  onFiltrosChange,
  onOrdenChange,
  onGuardarBusqueda,
  onEliminarBusqueda,
  onCargarBusqueda,
  onToggleAlerta,
  onResetFiltros,
  onPageChange,
}: CatalogoPropiedadesProps) {
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showSavedSearches, setShowSavedSearches] = useState(false)

  // Filter and sort properties
  const displayedProperties = useMemo(() => {
    let filtered = [...propiedades]

    // Apply filters
    if (filtrosActivos.zonaIds?.length) {
      filtered = filtered.filter((p) =>
        filtrosActivos.zonaIds!.includes(p.zona.id)
      )
    }

    if (filtrosActivos.codigoPostal) {
      filtered = filtered.filter(
        (p) => p.codigoPostal === filtrosActivos.codigoPostal
      )
    }

    if (filtrosActivos.tipos?.length) {
      filtered = filtered.filter((p) => filtrosActivos.tipos!.includes(p.tipo))
    }

    if (filtrosActivos.modalidad) {
      filtered = filtered.filter((p) => p.modalidad === filtrosActivos.modalidad)
    }

    if (filtrosActivos.precioMin) {
      filtered = filtered.filter((p) => p.precio >= filtrosActivos.precioMin!)
    }

    if (filtrosActivos.precioMax) {
      filtered = filtered.filter((p) => p.precio <= filtrosActivos.precioMax!)
    }

    if (filtrosActivos.areaMin) {
      filtered = filtered.filter((p) => p.area >= filtrosActivos.areaMin!)
    }

    if (filtrosActivos.areaMax) {
      filtered = filtered.filter((p) => p.area <= filtrosActivos.areaMax!)
    }

    if (filtrosActivos.habitacionesMin) {
      filtered = filtered.filter(
        (p) =>
          p.habitaciones !== null && p.habitaciones >= filtrosActivos.habitacionesMin!
      )
    }

    if (filtrosActivos.banosMin) {
      filtered = filtered.filter((p) => p.banos >= filtrosActivos.banosMin!)
    }

    if (filtrosActivos.parqueadero !== undefined) {
      filtered = filtered.filter((p) => p.parqueadero === filtrosActivos.parqueadero)
    }

    if (filtrosActivos.caracteristicas?.length) {
      filtered = filtered.filter((p) =>
        filtrosActivos.caracteristicas!.every((c) =>
          p.caracteristicas.some((pc) => pc.toLowerCase().includes(c.toLowerCase()))
        )
      )
    }

    // Apply sorting
    switch (ordenActivo) {
      case 'recientes':
        filtered.sort(
          (a, b) =>
            new Date(b.fechaPublicacion).getTime() -
            new Date(a.fechaPublicacion).getTime()
        )
        break
      case 'destacados':
        filtered.sort((a, b) => {
          if (a.esDestacado !== b.esDestacado) return a.esDestacado ? -1 : 1
          return 0
        })
        break
      case 'precio-asc':
        filtered.sort((a, b) => a.precio - b.precio)
        break
      case 'precio-desc':
        filtered.sort((a, b) => b.precio - a.precio)
        break
      case 'area-desc':
        filtered.sort((a, b) => b.area - a.area)
        break
    }

    return filtered
  }, [propiedades, filtrosActivos, ordenActivo])

  const handleSaveSearch = (nombre: string) => {
    onGuardarBusqueda?.(nombre, filtrosActivos)
  }

  return (
    <div className="min-h-screen bg-[#F5F2F2] dark:bg-slate-950">
      {/* Filter Bar - E&V Style with dark background */}
      <FilterBar
        zonas={zonas}
        filtros={filtros}
        filtrosActivos={filtrosActivos}
        onFiltrosChange={onFiltrosChange}
        onReset={onResetFiltros}
        onGuardarBusqueda={() => setShowSaveModal(true)}
        isLoggedIn={usuario.estaAutenticado}
      />

      {/* Toolbar - Results count & Sort */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Results Count & Saved Searches Toggle */}
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {displayedProperties.length}
                </span>{' '}
                {displayedProperties.length === 1 ? 'propiedad' : 'propiedades'}{' '}
                encontrada{displayedProperties.length !== 1 ? 's' : ''}
              </p>

              {/* Saved Searches Toggle (logged in only) */}
              {usuario.estaAutenticado && busquedasGuardadas.length > 0 && (
                <button
                  onClick={() => setShowSavedSearches(!showSavedSearches)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    showSavedSearches
                      ? 'bg-[#722F37]/10 text-[#722F37]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Mis búsquedas ({busquedasGuardadas.length})</span>
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <SortDropdown
              options={ordenOpciones}
              value={ordenActivo}
              onChange={onOrdenChange}
            />
          </div>
        </div>
      </div>

      {/* Saved Searches Panel */}
      {showSavedSearches && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 lg:px-6 py-4">
            <BusquedasGuardadasPanel
              busquedas={busquedasGuardadas}
              onCargar={(id) => {
                onCargarBusqueda?.(id)
                setShowSavedSearches(false)
              }}
              onEliminar={onEliminarBusqueda}
              onToggleAlerta={onToggleAlerta}
            />
          </div>
        </div>
      )}

      {/* Main Content - LIST VIEW ONLY */}
      <div className="container mx-auto px-4 lg:px-6 py-6">
        {displayedProperties.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
              <List className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Intenta ajustar los filtros para encontrar más resultados o explora
              todas nuestras propiedades.
            </p>
            <button
              onClick={onResetFiltros}
              className="px-6 py-3 text-sm font-medium text-white bg-[#722F37] rounded-lg hover:bg-[#5a252c] transition-colors"
            >
              Limpiar todos los filtros
            </button>
          </div>
        ) : (
          /* Property List */
          <div className="space-y-4">
            {displayedProperties.map((propiedad) => (
              <PropiedadCatalogoCard
                key={propiedad.id}
                propiedad={propiedad}
                esFavorito={usuario.propiedadesFavoritas.includes(propiedad.id)}
                onView={() => onViewPropiedad?.(propiedad.id)}
                onToggleFavorito={() => onToggleFavorito?.(propiedad.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {resultados.totalPaginas > 1 && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <Pagination
              currentPage={resultados.paginaActual}
              totalPages={resultados.totalPaginas}
              onPageChange={(page) => onPageChange?.(page)}
            />
          </div>
        )}
      </div>

      {/* Save Search Modal */}
      <GuardarBusquedaModal
        isOpen={showSaveModal}
        filtros={filtrosActivos}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveSearch}
      />
    </div>
  )
}
