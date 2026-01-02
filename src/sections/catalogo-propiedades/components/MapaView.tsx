import { useState, useCallback, useMemo } from 'react'
import { MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { MapaViewProps, Propiedad } from '@/../product/sections/catalogo-propiedades/types'

// =============================================================================
// Utility Functions
// =============================================================================

function formatPrecio(precio: number, modalidad: 'venta' | 'arriendo'): string {
  if (precio >= 1000000000) {
    return `$${(precio / 1000000000).toFixed(1).replace('.0', '')} mil M`
  }
  if (precio >= 1000000) {
    return `$${(precio / 1000000).toFixed(0)} M${modalidad === 'arriendo' ? '/mes' : ''}`
  }
  return `$${precio.toLocaleString('es-CO')}${modalidad === 'arriendo' ? '/mes' : ''}`
}

// =============================================================================
// Property Info Popup
// =============================================================================

interface PropertyPopupProps {
  propiedad: Propiedad
  onClose: () => void
  onClick: () => void
}

function PropertyPopup({ propiedad, onClose, onClick }: PropertyPopupProps) {
  return (
    <div
      className="absolute z-20 bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 w-72 overflow-hidden cursor-pointer"
      style={{
        bottom: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      onClick={onClick}
    >
      {/* Arrow pointing down */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-700 rotate-45"
      />

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 transition-colors"
      >
        <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      </button>

      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={propiedad.imagenPrincipal}
          alt={propiedad.titulo}
          className="w-full h-full object-cover"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {propiedad.esNuevo && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500 text-white rounded">
              Nuevo
            </span>
          )}
          {propiedad.esDestacado && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-[#722F37] text-white rounded">
              Destacado
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
          {propiedad.zona.nombre}, {propiedad.zona.localidad}
        </p>
        <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
          {propiedad.titulo}
        </h4>
        <p className="text-lg font-bold text-[#722F37]">
          {formatPrecio(propiedad.precio, propiedad.modalidad)}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>{propiedad.area} m²</span>
          {propiedad.habitaciones && <span>{propiedad.habitaciones} hab.</span>}
          <span>{propiedad.banos} baños</span>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Map Marker
// =============================================================================

interface MapMarkerProps {
  propiedad: Propiedad
  isSelected: boolean
  position: { x: number; y: number }
  onClick: () => void
  onShowPopup: () => void
  onHidePopup: () => void
  showPopup: boolean
  onViewProperty: () => void
}

function MapMarker({
  propiedad,
  isSelected,
  position,
  onClick,
  onShowPopup,
  onHidePopup,
  showPopup,
  onViewProperty,
}: MapMarkerProps) {
  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -100%)',
      }}
      onMouseEnter={onShowPopup}
      onMouseLeave={onHidePopup}
    >
      {showPopup && (
        <PropertyPopup
          propiedad={propiedad}
          onClose={onHidePopup}
          onClick={onViewProperty}
        />
      )}
      <button
        onClick={onClick}
        className={`relative flex items-center justify-center transition-all ${
          isSelected ? 'z-10 scale-125' : 'hover:scale-110'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isSelected
              ? 'bg-[#722F37] text-white'
              : propiedad.esDestacado
              ? 'bg-[#722F37] text-white'
              : 'bg-white text-[#722F37] border-2 border-[#722F37]'
          }`}
        >
          <MapPin className="w-4 h-4" />
        </div>
        {/* Pulse effect for selected */}
        {isSelected && (
          <div className="absolute inset-0 rounded-full bg-[#722F37]/30 animate-ping" />
        )}
      </button>
    </div>
  )
}

// =============================================================================
// Main MapaView Component
// =============================================================================

export function MapaView({
  propiedades,
  config,
  selectedId,
  onMarkerClick,
}: MapaViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 })

  // Calculate marker positions based on coordinates
  // This is a simplified projection for demo purposes
  const markerPositions = useMemo(() => {
    if (!propiedades.length) return []

    // Find bounds
    const lats = propiedades.map((p) => p.coordenadas.lat)
    const lngs = propiedades.map((p) => p.coordenadas.lng)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    // Add some padding
    const latPadding = (maxLat - minLat) * 0.2 || 0.01
    const lngPadding = (maxLng - minLng) * 0.2 || 0.01

    return propiedades.map((p) => ({
      id: p.id,
      x: ((p.coordenadas.lng - (minLng - lngPadding)) / ((maxLng + lngPadding) - (minLng - lngPadding))) * 80 + 10,
      y: ((maxLat + latPadding - p.coordenadas.lat) / ((maxLat + latPadding) - (minLat - latPadding))) * 80 + 10,
    }))
  }, [propiedades])

  const handlePan = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    const delta = 10
    setViewportOffset((prev) => {
      switch (direction) {
        case 'left':
          return { ...prev, x: prev.x + delta }
        case 'right':
          return { ...prev, x: prev.x - delta }
        case 'up':
          return { ...prev, y: prev.y + delta }
        case 'down':
          return { ...prev, y: prev.y - delta }
        default:
          return prev
      }
    })
  }, [])

  return (
    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
      {/* Map Background (placeholder for actual Google Maps) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translate(${viewportOffset.x}px, ${viewportOffset.y}px)`,
        }}
      />

      {/* Map API Placeholder Notice */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
        <span className="font-medium">Google Maps</span>
        <span className="mx-1">•</span>
        <span>API Key requerida</span>
      </div>

      {/* Pan Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1">
        <div className="flex justify-center">
          <button
            onClick={() => handlePan('up')}
            className="p-2 bg-white dark:bg-slate-800 rounded shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90" />
          </button>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => handlePan('left')}
            className="p-2 bg-white dark:bg-slate-800 rounded shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={() => handlePan('right')}
            className="p-2 bg-white dark:bg-slate-800 rounded shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handlePan('down')}
            className="p-2 bg-white dark:bg-slate-800 rounded shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400 -rotate-90" />
          </button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col bg-white dark:bg-slate-800 rounded shadow-md overflow-hidden">
        <button className="px-3 py-2 text-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-200 dark:border-slate-700">
          +
        </button>
        <button className="px-3 py-2 text-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          −
        </button>
      </div>

      {/* Property Count */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        {propiedades.length} {propiedades.length === 1 ? 'propiedad' : 'propiedades'} en el mapa
      </div>

      {/* Markers Container */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${viewportOffset.x}px, ${viewportOffset.y}px)`,
        }}
      >
        {markerPositions.map((pos) => {
          const propiedad = propiedades.find((p) => p.id === pos.id)
          if (!propiedad) return null

          return (
            <MapMarker
              key={pos.id}
              propiedad={propiedad}
              isSelected={selectedId === pos.id}
              position={{ x: pos.x, y: pos.y }}
              onClick={() => onMarkerClick?.(pos.id)}
              onShowPopup={() => setHoveredId(pos.id)}
              onHidePopup={() => setHoveredId(null)}
              showPopup={hoveredId === pos.id || selectedId === pos.id}
              onViewProperty={() => onMarkerClick?.(pos.id)}
            />
          )
        })}
      </div>

      {/* Empty State */}
      {propiedades.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">
              No hay propiedades para mostrar en el mapa
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
