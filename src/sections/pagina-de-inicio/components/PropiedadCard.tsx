'use client'

import { useState } from 'react'
import type { Propiedad, ContactoOpcion } from '@/../product/sections/pagina-de-inicio/types'
import { MapPin, Maximize2, BedDouble, Bath, Car, Bot, Mail, MessageCircle, ChevronDown } from 'lucide-react'

interface PropiedadCardProps {
  propiedad: Propiedad
  contactoOpciones?: ContactoOpcion[]
  onView?: () => void
  onContactoOpcion?: (tipo: ContactoOpcion['tipo']) => void
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'bot': Bot,
  'mail': Mail,
  'message-circle': MessageCircle,
}

export function PropiedadCard({ propiedad, contactoOpciones = [], onView, onContactoOpcion }: PropiedadCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  const handleContactoClick = (opcion: ContactoOpcion) => {
    setShowDropdown(false)
    onContactoOpcion?.(opcion.tipo)
  }

  return (
    <article className="group bg-white dark:bg-slate-800 overflow-hidden transition-all duration-500 hover:shadow-2xl">
      {/* Image Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div
          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
          onClick={onView}
        >
          <img
            src={allImages[currentImageIndex]}
            alt={propiedad.titulo}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Modality Badge */}
          <div className="absolute top-4 left-4">
            <span className={`
              px-4 py-2 text-xs font-medium uppercase tracking-wider
              ${propiedad.modalidad === 'venta'
                ? 'bg-[#722F37] text-white'
                : 'bg-white text-slate-900'
              }
            `}>
              {propiedad.modalidad === 'venta' ? 'En Venta' : 'En Arriendo'}
            </span>
          </div>

          {/* Property Type */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
              {propiedad.tipo}
            </span>
          </div>

          {/* View Details Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="px-8 py-3 bg-white text-slate-900 font-medium text-sm uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Ver Detalles
            </span>
          </div>
        </div>

        {/* Image Thumbnails */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {allImages.slice(0, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(idx)
                }}
                className={`
                  w-12 h-12 overflow-hidden border-2 transition-all duration-300
                  ${idx === currentImageIndex
                    ? 'border-white opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
                  }
                `}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            {allImages.length > 5 && (
              <div className="w-12 h-12 bg-black/60 flex items-center justify-center text-white text-xs">
                +{allImages.length - 5}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Location */}
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
          <MapPin size={14} className="text-[#722F37]" />
          <span className="text-sm">{propiedad.zona.nombre}, {propiedad.zona.localidad}</span>
        </div>

        {/* Title */}
        <h3
          className="text-xl lg:text-2xl font-medium text-slate-900 dark:text-white mb-2 cursor-pointer hover:text-[#722F37] transition-colors"
          onClick={onView}
        >
          {propiedad.titulo}
        </h3>

        {/* Address */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {propiedad.direccion}
        </p>

        {/* Price */}
        <p className="text-2xl lg:text-3xl font-light text-[#722F37] mb-6">
          {formatPrice(propiedad.precio, propiedad.modalidad)}
        </p>

        {/* Features */}
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Maximize2 size={18} strokeWidth={1.5} />
            <span className="text-sm font-medium">{propiedad.area} m²</span>
          </div>

          {propiedad.habitaciones !== null && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <BedDouble size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">{propiedad.habitaciones} Hab.</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Bath size={18} strokeWidth={1.5} />
            <span className="text-sm font-medium">{propiedad.banos} Baños</span>
          </div>

          {propiedad.parqueadero && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Car size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">Parq.</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-6 mb-6">
          {propiedad.descripcionCorta}
        </p>

        {/* Characteristics Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {propiedad.caracteristicas.slice(0, 4).map((carac, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {carac}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {/* View Details Button */}
          <button
            onClick={onView}
            className="flex-1 px-6 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-medium text-sm uppercase tracking-wider hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
          >
            Ver Detalles
          </button>

          {/* Preguntar Sobre Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-6 py-3 bg-[#722F37] text-white font-medium text-sm uppercase tracking-wider hover:bg-[#8a3a42] transition-all duration-300"
            >
              Preguntar Sobre
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 bottom-full mb-2 w-64 bg-white dark:bg-slate-800 shadow-2xl z-50 overflow-hidden animate-slide-up">
                  {contactoOpciones.map((opcion) => {
                    const Icon = iconMap[opcion.icono] || MessageCircle
                    return (
                      <button
                        key={opcion.id}
                        onClick={() => handleContactoClick(opcion)}
                        className="w-full flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-[#722F37]/10 text-[#722F37]">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">
                            {opcion.titulo}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {opcion.descripcion}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }
      `}</style>
    </article>
  )
}
