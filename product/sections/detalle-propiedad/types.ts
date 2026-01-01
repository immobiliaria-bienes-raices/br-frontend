// =============================================================================
// Re-export shared types from pagina-de-inicio
// =============================================================================

export type {
  Zona,
  Coordenadas,
  Propiedad,
  MiembroEquipo,
  ContactoOpcion,
  MapaConfig,
} from '../pagina-de-inicio/types'

// =============================================================================
// Section-specific Types
// =============================================================================

export interface Breadcrumb {
  label: string
  href: string
}

export interface AgenteContacto {
  id: string
  nombre: string
  cargo: string
  telefono: string
  email: string
  foto: string
}

export interface PropiedadSimilar {
  id: string
  titulo: string
  tipo: 'apartamento' | 'apartaestudio' | 'casa' | 'local'
  modalidad: 'venta' | 'arriendo'
  precio: number
  area: number
  habitaciones: number | null
  banos: number
  imagenPrincipal: string
  zona: {
    nombre: string
    localidad: string
  }
}

// =============================================================================
// Component Props
// =============================================================================

export interface DetallePropiedadProps {
  /** The property to display */
  propiedad: import('../pagina-de-inicio/types').Propiedad
  /** Breadcrumb navigation items */
  breadcrumbs: Breadcrumb[]
  /** Contact agent information */
  agente: AgenteContacto
  /** Contact options for "Preguntar Sobre" dropdown */
  contactoOpciones: import('../pagina-de-inicio/types').ContactoOpcion[]
  /** Similar properties to show in carousel */
  propiedadesSimilares: PropiedadSimilar[]
  /** Google Maps configuration */
  mapa: import('../pagina-de-inicio/types').MapaConfig
  /** Called when user clicks back button */
  onBack?: () => void
  /** Called when user clicks a breadcrumb */
  onBreadcrumbClick?: (href: string) => void
  /** Called when user selects a contact option */
  onContactoOpcion?: (tipo: import('../pagina-de-inicio/types').ContactoOpcion['tipo']) => void
  /** Called when user clicks "Solicitar Visita" */
  onSolicitarVisita?: () => void
  /** Called when user clicks a similar property */
  onViewSimilar?: (id: string) => void
  /** Called when user clicks the logo */
  onLogoClick?: () => void
}

export interface ImageGalleryProps {
  /** All images to display */
  images: string[]
  /** Alt text for images */
  alt: string
  /** Called when user opens fullscreen view */
  onFullscreen?: () => void
}

export interface PropertySpecsProps {
  /** Area in square meters */
  area: number
  /** Number of bedrooms (null for studios/commercial) */
  habitaciones: number | null
  /** Number of bathrooms */
  banos: number
  /** Has parking */
  parqueadero: boolean
  /** Floor number (null if not applicable) */
  piso: number | null
}

export interface ContactCardProps {
  /** Agent information */
  agente: AgenteContacto
  /** Contact options */
  contactoOpciones: import('../pagina-de-inicio/types').ContactoOpcion[]
  /** Called when user selects a contact option */
  onContactoOpcion?: (tipo: import('../pagina-de-inicio/types').ContactoOpcion['tipo']) => void
  /** Called when user clicks "Solicitar Visita" */
  onSolicitarVisita?: () => void
}

export interface SimilarPropertiesProps {
  /** Properties to display */
  propiedades: PropiedadSimilar[]
  /** Called when user clicks a property */
  onView?: (id: string) => void
}
