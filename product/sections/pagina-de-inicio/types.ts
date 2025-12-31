// =============================================================================
// Data Types
// =============================================================================

export interface Zona {
  id: string
  nombre: string
  localidad: string
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
  descripcionCorta: string
  imagenPrincipal: string
  imagenes: string[]
  destacado: boolean
  caracteristicas: string[]
}

export interface Servicio {
  id: string
  titulo: string
  descripcion: string
  icono: string
}

export interface ValorPropuesta {
  id: string
  titulo: string
  descripcion: string
  icono: string
}

export interface Hero {
  headline: string
  subheadline: string
  ctaText: string
  ctaSecondary: string
  backgroundImage: string
}

export interface ContactoCTA {
  titulo: string
  subtitulo: string
  ctaText: string
  telefono: string
  email: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface PaginaDeInicioProps {
  /** Hero section content */
  hero: Hero
  /** List of featured properties for the carousel */
  propiedadesDestacadas: Propiedad[]
  /** List of services to display */
  servicios: Servicio[]
  /** Value propositions to highlight */
  valorPropuestas: ValorPropuesta[]
  /** Contact CTA section content */
  contactoCTA: ContactoCTA
  /** Called when user clicks on a property card */
  onViewPropiedad?: (id: string) => void
  /** Called when user clicks the main CTA to explore properties */
  onExplorarPropiedades?: () => void
  /** Called when user clicks to view services */
  onVerServicios?: () => void
  /** Called when user clicks the contact CTA */
  onContactar?: () => void
}

export interface PropiedadCardProps {
  /** The property to display */
  propiedad: Propiedad
  /** Called when user clicks to view property details */
  onView?: () => void
}

export interface ServicioCardProps {
  /** The service to display */
  servicio: Servicio
  /** Called when user clicks to learn more */
  onLearnMore?: () => void
}

export interface CarouselProps {
  /** Properties to display in the carousel */
  propiedades: Propiedad[]
  /** Called when user clicks on a property */
  onViewPropiedad?: (id: string) => void
}
