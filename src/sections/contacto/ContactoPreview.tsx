'use client'

import { Contacto } from './components/Contacto'
import data from '@/../product/sections/contacto/data.json'
import type { ContactoFormData } from '@/../product/sections/contacto/types'

export default function ContactoPreview() {
  const handleSubmit = (formData: ContactoFormData) => {
    console.log('Form submitted:', formData)
  }

  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path)
  }

  return (
    <Contacto
      hero={data.hero}
      formConfig={data.formConfig}
      oficina={data.oficina}
      mapa={data.mapa}
      onSubmit={handleSubmit}
      onNavigate={handleNavigate}
    />
  )
}
