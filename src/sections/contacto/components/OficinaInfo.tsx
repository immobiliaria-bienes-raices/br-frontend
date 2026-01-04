import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import type { OficinaInfoProps } from '@/../product/sections/contacto/types'

export function OficinaInfo({ oficina }: OficinaInfoProps) {
  const whatsappUrl = `https://wa.me/${oficina.whatsapp.numero.replace(/\D/g, '')}?text=${encodeURIComponent(oficina.whatsapp.mensaje)}`

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-8">
        {oficina.titulo}
      </h2>

      <div className="space-y-6">
        {/* Dirección */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#722F37]/10 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#722F37]" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Dirección
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {oficina.direccion.linea1}<br />
              {oficina.direccion.linea2}
            </p>
          </div>
        </div>

        {/* Teléfonos */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#722F37]/10 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-[#722F37]" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Teléfono
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <a href={`tel:${oficina.telefono}`} className="hover:text-[#722F37] transition-colors">
                {oficina.telefono}
              </a>
              <br />
              <a href={`tel:${oficina.celular}`} className="hover:text-[#722F37] transition-colors">
                {oficina.celular}
              </a>
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#722F37]/10 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#722F37]" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Email
            </h3>
            <a
              href={`mailto:${oficina.email}`}
              className="text-slate-600 dark:text-slate-400 text-sm hover:text-[#722F37] transition-colors"
            >
              {oficina.email}
            </a>
          </div>
        </div>

        {/* Horario */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#722F37]/10 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#722F37]" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              {oficina.horario.titulo}
            </h3>
            <div className="space-y-1">
              {oficina.horario.dias.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{item.dia}</span>
                  <span className="text-slate-900 dark:text-white font-medium">{item.horas}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-[#20bd5a] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  )
}
