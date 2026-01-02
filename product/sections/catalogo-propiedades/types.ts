// =============================================================================
// Data Types
// =============================================================================

export interface Coordenadas {
  lat: number
  lng: number
}

export interface Zona {
  id: string
  nombre: string
  localidad: string
  codigoPostal: string
  estrato: string
  descripcion?: string
}

export interface Propiedad {
  id: string
  titulo: string
  tipo: 'apartamento' | 'apartaestudio' | 'casa' | 'local'
  modalidad: 'venta' | 'arriendo'
  precio: number
  moneda: 'COP'
  area: number
  habitaciones: number | null
  banos: number
  parqueadero: boolean
  piso: number | null
  zona: Zona
  direccion: string
  codigoPostal: string
  coordenadas: Coordenadas
  descripcionCorta: string
  descripcionCompleta: string
  imagenPrincipal: string
  imagenes: string[]
  esNuevo: boolean
  esDestacado: boolean
  fechaPublicacion: string
  caracteristicas: string[]
}

export interface FiltroOpcion {
  id: string
  label: string
}

export interface RangoPrecio {
  min: number
  max: number
  step: number
}

export interface Filtros {
  tipos: FiltroOpcion[]
  modalidades: FiltroOpcion[]
  habitaciones: FiltroOpcion[]
  banos: FiltroOpcion[]
  parqueadero: FiltroOpcion[]
  caracteristicas: FiltroOpcion[]
  precioRango: {
    venta: RangoPrecio
    arriendo: RangoPrecio
  }
  areaRango: RangoPrecio
  codigosPostales: string[]
}

export interface OrdenOpcion {
  id: 'recientes' | 'destacados' | 'precio-asc' | 'precio-desc' | 'area-desc'
  label: string
}

export interface FiltrosActivos {
  zonaIds?: string[]
  codigoPostal?: string
  tipos?: string[]
  modalidad?: 'venta' | 'arriendo'
  precioMin?: number
  precioMax?: number
  areaMin?: number
  areaMax?: number
  habitacionesMin?: number
  banosMin?: number
  parqueadero?: boolean
  caracteristicas?: string[]
}

export interface BusquedaGuardada {
  id: string
  nombre: string
  fechaCreacion: string
  filtros: FiltrosActivos
  alertaActiva: boolean
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  estaAutenticado: boolean
  propiedadesFavoritas: string[]
}

export interface MapaConfig {
  centro: Coordenadas
  zoom: number
  apiKeyPlaceholder: string
}

export interface Resultados {
  total: number
  paginaActual: number
  porPagina: number
  totalPaginas: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface CatalogoPropiedadesProps {
  /** List of properties to display */
  propiedades: Propiedad[]
  /** Available neighborhoods for filtering */
  zonas: Zona[]
  /** Filter options configuration */
  filtros: Filtros
  /** Sort options */
  ordenOpciones: OrdenOpcion[]
  /** User's saved searches */
  busquedasGuardadas: BusquedaGuardada[]
  /** Current user state */
  usuario: Usuario
  /** Map configuration */
  mapa: MapaConfig
  /** Pagination info */
  resultados: Resultados
  /** Currently active filters */
  filtrosActivos?: FiltrosActivos
  /** Current sort order */
  ordenActivo?: OrdenOpcion['id']
  /** Called when user clicks on a property card */
  onViewPropiedad?: (id: string) => void
  /** Called when user toggles favorite on a property */
  onToggleFavorito?: (id: string) => void
  /** Called when filters change */
  onFiltrosChange?: (filtros: FiltrosActivos) => void
  /** Called when sort order changes */
  onOrdenChange?: (orden: OrdenOpcion['id']) => void
  /** Called when user saves a search */
  onGuardarBusqueda?: (nombre: string, filtros: FiltrosActivos) => void
  /** Called when user deletes a saved search */
  onEliminarBusqueda?: (id: string) => void
  /** Called when user loads a saved search */
  onCargarBusqueda?: (id: string) => void
  /** Called when user toggles search alert */
  onToggleAlerta?: (id: string) => void
  /** Called when user clicks on map marker */
  onMapMarkerClick?: (id: string) => void
  /** Called when user resets all filters */
  onResetFiltros?: () => void
  /** Called when page changes */
  onPageChange?: (page: number) => void
}

export interface PropiedadCatalogoCardProps {
  /** The property to display */
  propiedad: Propiedad
  /** Whether the property is favorited */
  esFavorito?: boolean
  /** Called when user clicks to view property details */
  onView?: () => void
  /** Called when user toggles favorite */
  onToggleFavorito?: () => void
}

export interface FilterBarProps {
  /** Available zones for filtering */
  zonas: Zona[]
  /** Filter configuration */
  filtros: Filtros
  /** Currently active filters */
  filtrosActivos?: FiltrosActivos
  /** Called when filters change */
  onFiltrosChange?: (filtros: FiltrosActivos) => void
  /** Called when user resets all filters */
  onReset?: () => void
}

export interface GuardarBusquedaModalProps {
  /** Whether modal is open */
  isOpen: boolean
  /** Current active filters to save */
  filtros: FiltrosActivos
  /** Called when modal closes */
  onClose: () => void
  /** Called when user saves the search */
  onSave: (nombre: string) => void
}

export interface BusquedasGuardadasPanelProps {
  /** List of saved searches */
  busquedas: BusquedaGuardada[]
  /** Called when user loads a search */
  onCargar?: (id: string) => void
  /** Called when user deletes a search */
  onEliminar?: (id: string) => void
  /** Called when user toggles alert */
  onToggleAlerta?: (id: string) => void
}

export interface MapaViewProps {
  /** Properties to show on map */
  propiedades: Propiedad[]
  /** Map configuration */
  config: MapaConfig
  /** Currently selected property ID */
  selectedId?: string
  /** Called when user clicks on a marker */
  onMarkerClick?: (id: string) => void
}
