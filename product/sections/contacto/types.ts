// =============================================================================
// Data Types
// =============================================================================

export interface HeroContacto {
  headline: string
  subheadline: string
  backgroundImage: string
}

export interface CampoTexto {
  label: string
  placeholder: string
  required: boolean
}

export interface OpcionSelect {
  value: string
  label: string
}

export interface CampoSelect {
  label: string
  required: boolean
  opciones: OpcionSelect[]
}

export interface CampoCita {
  label: string
  fechaLabel: string
  horaLabel: string
  horasDisponibles: string[]
}

export interface CampoConsentimiento {
  label: string
  required: boolean
}

export interface FormConfig {
  titulo: string
  campos: {
    nombre: CampoTexto
    email: CampoTexto
    telefono: CampoTexto
    tipoConsulta: CampoSelect
    metodoContacto: CampoSelect
    mensaje: CampoTexto
    cita: CampoCita
    consentimiento: CampoConsentimiento
  }
  submitText: string
  successMessage: string
}

export interface Direccion {
  linea1: string
  linea2: string
  codigoPostal: string
}

export interface HorarioDia {
  dia: string
  horas: string
}

export interface Horario {
  titulo: string
  dias: HorarioDia[]
}

export interface WhatsAppConfig {
  numero: string
  mensaje: string
}

export interface Oficina {
  titulo: string
  direccion: Direccion
  telefono: string
  celular: string
  email: string
  whatsapp: WhatsAppConfig
  horario: Horario
}

export interface Coordenadas {
  lat: number
  lng: number
}

export interface MapaConfig {
  centro: Coordenadas
  zoom: number
  apiKeyPlaceholder: string
}

// Form State
export interface ContactoFormData {
  nombre: string
  email: string
  telefono: string
  tipoConsulta: string
  metodoContacto: string
  mensaje: string
  citaFecha: string
  citaHora: string
  consentimiento: boolean
}

// =============================================================================
// Component Props
// =============================================================================

export interface ContactoProps {
  /** Hero section content */
  hero: HeroContacto
  /** Form configuration */
  formConfig: FormConfig
  /** Office information */
  oficina: Oficina
  /** Google Maps configuration */
  mapa: MapaConfig
  /** Called when form is submitted */
  onSubmit?: (data: ContactoFormData) => void
  /** Called when user navigates to another page */
  onNavigate?: (path: string) => void
}

export interface ContactFormProps {
  config: FormConfig
  onSubmit?: (data: ContactoFormData) => void
}

export interface OficinaInfoProps {
  oficina: Oficina
}

export interface MapaSectionProps {
  config: MapaConfig
  direccion: Direccion
}

export interface HeaderProps {
  logo: string
  onNavigate?: (path: string) => void
}
