'use client'

import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react'
import type { DetallePropiedadProps } from '@/../product/sections/detalle-propiedad/types'
import { ImageGallery } from './ImageGallery'
import { PropertySpecs } from './PropertySpecs'
import { ContactCard } from './ContactCard'
import { LocationSection } from './LocationSection'
import { SimilarProperties } from './SimilarProperties'

/**
 * Detalle de Propiedad - Property Details Page
 * Styled after Engel & Völkers with elegant, editorial design
 */
export function DetallePropiedad({
  propiedad,
  breadcrumbs,
  agente,
  contactoOpciones,
  propiedadesSimilares,
  mapa,
  onBack,
  onBreadcrumbClick,
  onContactoOpcion,
  onSolicitarVisita,
  onViewSimilar,
}: DetallePropiedadProps) {
  const allImages = [propiedad.imagenPrincipal, ...propiedad.imagenes]

  const formatPrice = (precio: number, modalidad: string) => {
    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)

    return modalidad === 'arriendo' ? `${formatted}/mes` : formatted
  }

  return (
    <div className="min-h-screen bg-[#F5F2F2] dark:bg-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#722F37] transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm hidden sm:inline">Volver</span>
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx > 0 && <ChevronRight size={14} className="text-slate-400" />}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => onBreadcrumbClick?.(crumb.href)}
                      className="text-slate-600 dark:text-slate-300 hover:text-[#722F37] transition-colors"
                    >
                      {crumb.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={allImages} alt={propiedad.titulo} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              {/* Modality Badge */}
              <div className="mb-4">
                <span className={`
                  inline-block px-4 py-2 text-xs font-medium uppercase tracking-wider
                  ${propiedad.modalidad === 'venta'
                    ? 'bg-[#722F37] text-white'
                    : 'bg-slate-900 text-white'
                  }
                `}>
                  {propiedad.modalidad === 'venta' ? 'En Venta' : 'En Arriendo'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white mb-4">
                {propiedad.titulo}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-6">
                <MapPin size={18} className="text-[#722F37]" />
                <span>{propiedad.direccion}</span>
              </div>

              {/* Price */}
              <p className="text-4xl lg:text-5xl font-light text-[#722F37]">
                {formatPrice(propiedad.precio, propiedad.modalidad)}
              </p>

              {/* Property ID */}
              <p className="text-sm text-slate-400 mt-2">
                Ref: {propiedad.id.toUpperCase()}
              </p>
            </div>

            {/* Specifications */}
            <PropertySpecs
              area={propiedad.area}
              habitaciones={propiedad.habitaciones}
              banos={propiedad.banos}
              parqueadero={propiedad.parqueadero}
              piso={propiedad.piso}
            />

            {/* Description */}
            <div className="bg-white dark:bg-slate-800 p-6 lg:p-8 border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-4">
                Descripción
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {propiedad.descripcionCompleta.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features/Characteristics */}
            <div className="bg-white dark:bg-slate-800 p-6 lg:p-8 border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-6">
                Características
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propiedad.caracteristicas.map((carac, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-700/50"
                  >
                    <div className="w-2 h-2 bg-[#722F37]" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{carac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <LocationSection
              direccion={propiedad.direccion}
              zona={propiedad.zona}
              coordenadas={propiedad.coordenadas}
              config={mapa}
            />
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactCard
                agente={agente}
                contactoOpciones={contactoOpciones}
                onContactoOpcion={onContactoOpcion}
                onSolicitarVisita={onSolicitarVisita}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {propiedadesSimilares.length > 0 && (
        <SimilarProperties
          propiedades={propiedadesSimilares}
          onView={onViewSimilar}
        />
      )}
    </div>
  )
}
