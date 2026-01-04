// =============================================================================
// Data Types
// =============================================================================

export interface HeroServicios {
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  backgroundImage: string
}

export interface ValorPropuesta {
  id: string
  titulo: string
  descripcion: string
  icono: string
}

export interface PasoProceso {
  id: string
  numero: number
  titulo: string
  descripcion: string
  imagen: string
}

export interface FAQItem {
  id: string
  pregunta: string
  respuesta: string
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

export interface ServiciosProps {
  /** Hero section content */
  hero: HeroServicios
  /** Value proposition cards */
  valorPropuestas: ValorPropuesta[]
  /** Process timeline steps */
  pasosProceso: PasoProceso[]
  /** FAQ items for accordion */
  faqItems: FAQItem[]
  /** Contact CTA section */
  contactoCTA: ContactoCTA
  /** Called when user clicks primary CTA */
  onContactar?: () => void
  /** Called when user clicks "Valorar Propiedad" */
  onValorar?: () => void
}

export interface HeroSectionProps {
  hero: HeroServicios
  onContactar?: () => void
  onValorar?: () => void
}

export interface ValorPropuestaCardProps {
  valorPropuesta: ValorPropuesta
  index?: number
}

export interface PasoProcesoCardProps {
  paso: PasoProceso
  isReversed?: boolean
}

export interface FAQAccordionProps {
  items: FAQItem[]
}

export interface ContactoCTASectionProps {
  contactoCTA: ContactoCTA
  onContactar?: () => void
}
