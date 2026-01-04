'use client'

import { useState } from 'react'
import { Calendar, Clock, Send, CheckCircle } from 'lucide-react'
import type { ContactFormProps, ContactoFormData } from '@/../product/sections/contacto/types'

export function ContactForm({ config, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactoFormData>({
    nombre: '',
    email: '',
    telefono: '',
    tipoConsulta: '',
    metodoContacto: '',
    mensaje: '',
    citaFecha: '',
    citaHora: '',
    consentimiento: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactoFormData, string>>>({})

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (field: keyof ContactoFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Partial<Record<keyof ContactoFormData, string>> = {}

    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido'
    if (!formData.email) newErrors.email = 'El email es requerido'
    else if (!validateEmail(formData.email)) newErrors.email = 'Email inválido'
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido'
    if (!formData.tipoConsulta) newErrors.tipoConsulta = 'Seleccione un tipo de consulta'
    if (!formData.metodoContacto) newErrors.metodoContacto = 'Seleccione un método de contacto'
    if (!formData.consentimiento) newErrors.consentimiento = 'Debe aceptar el tratamiento de datos'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit?.(formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-light text-slate-900 dark:text-white mb-4">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {config.successMessage}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-8">
        {config.titulo}
      </h2>

      <div className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {config.campos.nombre.label} *
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            placeholder={config.campos.nombre.placeholder}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-colors ${
              errors.nombre ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
            }`}
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
        </div>

        {/* Email & Teléfono - Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {config.campos.email.label} *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={config.campos.email.placeholder}
              className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-colors ${
                errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {config.campos.telefono.label} *
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
              placeholder={config.campos.telefono.placeholder}
              className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-colors ${
                errors.telefono ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.telefono && <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>}
          </div>
        </div>

        {/* Tipo de Consulta */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {config.campos.tipoConsulta.label} *
          </label>
          <select
            value={formData.tipoConsulta}
            onChange={(e) => handleChange('tipoConsulta', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-colors ${
              errors.tipoConsulta ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="">Seleccione una opción</option>
            {config.campos.tipoConsulta.opciones.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
          {errors.tipoConsulta && <p className="mt-1 text-sm text-red-500">{errors.tipoConsulta}</p>}
        </div>

        {/* Método de Contacto */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            {config.campos.metodoContacto.label} *
          </label>
          <div className="flex flex-wrap gap-3">
            {config.campos.metodoContacto.opciones.map((opcion) => (
              <label
                key={opcion.value}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  formData.metodoContacto === opcion.value
                    ? 'border-[#722F37] bg-[#722F37]/5 text-[#722F37]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="metodoContacto"
                  value={opcion.value}
                  checked={formData.metodoContacto === opcion.value}
                  onChange={(e) => handleChange('metodoContacto', e.target.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{opcion.label}</span>
              </label>
            ))}
          </div>
          {errors.metodoContacto && <p className="mt-1 text-sm text-red-500">{errors.metodoContacto}</p>}
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {config.campos.mensaje.label}
          </label>
          <textarea
            value={formData.mensaje}
            onChange={(e) => handleChange('mensaje', e.target.value)}
            placeholder={config.campos.mensaje.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-colors resize-none"
          />
        </div>

        {/* Agendar Cita */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
            <Calendar className="w-4 h-4" />
            {config.campos.cita.label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                {config.campos.cita.fechaLabel}
              </label>
              <input
                type="date"
                value={formData.citaFecha}
                onChange={(e) => handleChange('citaFecha', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                {config.campos.cita.horaLabel}
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={formData.citaHora}
                  onChange={(e) => handleChange('citaHora', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-colors"
                >
                  <option value="">Seleccione hora</option>
                  {config.campos.cita.horasDisponibles.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Consentimiento */}
        <div>
          <label className={`flex items-start gap-3 cursor-pointer ${errors.consentimiento ? 'text-red-500' : ''}`}>
            <input
              type="checkbox"
              checked={formData.consentimiento}
              onChange={(e) => handleChange('consentimiento', e.target.checked)}
              className="mt-1 w-4 h-4 text-[#722F37] border-slate-300 rounded focus:ring-[#722F37]"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {config.campos.consentimiento.label} *
            </span>
          </label>
          {errors.consentimiento && <p className="mt-1 text-sm text-red-500">{errors.consentimiento}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#722F37] text-white font-medium uppercase tracking-wider text-sm hover:bg-[#5a252c] transition-colors"
        >
          <Send className="w-4 h-4" />
          {config.submitText}
        </button>
      </div>
    </form>
  )
}
