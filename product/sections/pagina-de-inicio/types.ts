// =============================================================================
// Data Types
// =============================================================================

export interface Zona {
  id: string
  nombre: string
  localidad: string
}

export interface Coordenadas {
  lat: number
  lng: number
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
  coordenadas: Coordenadas
  descripcionCorta: string
  descripcionCompleta: string
  imagenPrincipal: string
  imagenes: string[]
  destacado: boolean
  caracteristicas: string[]
}

export interface MiembroEquipo {
  id: string
  nombre: string
  cargo: string
  telefono: string
  email: string
  foto: string
  descripcion: string
}

export interface ContactoOpcion {
  id: string
  tipo: 'ai-chat' | 'email' | 'whatsapp'
  titulo: string
  descripcion: string
  icono: string
  accion: string
  valor?: string
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
  /** Background videos for auto-sliding hero (optional, overrides backgroundImage) */
  backgroundVideos?: string[]
  /** Duration in seconds to display each video before transitioning */
  videoTransitionDuration?: number
  logo: string
}

export interface ContactoCTA {
  titulo: string
  subtitulo: string
  ctaText: string
  preguntarSobreText: string
  telefono: string
  email: string
}

export interface MapaConfig {
  centro: Coordenadas
  zoom: number
  apiKeyPlaceholder: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface PaginaDeInicioProps {
  /** Hero section content */
  hero: Hero
  /** Team members to display in "Conoce el Equipo" section */
  equipo: MiembroEquipo[]
  /** List of featured properties (exactly 2) */
  propiedadesDestacadas: Propiedad[]
  /** Contact options for "Preguntar Sobre" dropdown */
  contactoOpciones: ContactoOpcion[]
  /** List of services to display */
  servicios: Servicio[]
  /** Value propositions to highlight */
  valorPropuestas: ValorPropuesta[]
  /** Contact CTA section content */
  contactoCTA: ContactoCTA
  /** Google Maps configuration */
  mapa: MapaConfig
  /** Called when user clicks on a property card */
  onViewPropiedad?: (id: string) => void
  /** Called when user clicks the main CTA to explore properties */
  onExplorarPropiedades?: () => void
  /** Called when user clicks to view services */
  onVerServicios?: () => void
  /** Called when user clicks the contact CTA */
  onContactar?: () => void
  /** Called when user selects a contact option */
  onContactoOpcion?: (tipo: ContactoOpcion['tipo']) => void
  /** Called when user clicks on a team member */
  onViewEquipoMember?: (id: string) => void
}

export interface PropiedadCardProps {
  /** The property to display */
  propiedad: Propiedad
  /** Called when user clicks to view property details */
  onView?: () => void
  /** Called when user clicks "Preguntar Sobre" */
  onPreguntarSobre?: () => void
}

export interface EquipoCardProps {
  /** The team member to display */
  miembro: MiembroEquipo
  /** Called when user clicks to view member details */
  onView?: () => void
}

export interface PreguntarSobreButtonProps {
  /** Contact options to display in dropdown */
  opciones: ContactoOpcion[]
  /** Called when user selects an option */
  onSelect?: (opcion: ContactoOpcion) => void
}

export interface ServicioCardProps {
  /** The service to display */
  servicio: Servicio
  /** Called when user clicks to learn more */
  onLearnMore?: () => void
}

export interface GoogleMapProps {
  /** Properties to show on the map */
  propiedades: Propiedad[]
  /** Map configuration */
  config: MapaConfig
  /** Called when user clicks on a property marker */
  onPropertyClick?: (id: string) => void
}
