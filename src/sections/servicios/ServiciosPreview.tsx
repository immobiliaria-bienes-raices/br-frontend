'use client'

import { Servicios } from './components/Servicios'
import data from '@/../product/sections/servicios/data.json'

export default function ServiciosPreview() {
  const handleContactar = () => {
    console.log('Contactar clicked')
  }

  const handleValorar = () => {
    console.log('Valorar propiedad clicked')
  }

  return (
    <Servicios
      hero={data.hero}
      valorPropuestas={data.valorPropuestas}
      pasosProceso={data.pasosProceso}
      faqItems={data.faqItems}
      contactoCTA={data.contactoCTA}
      onContactar={handleContactar}
      onValorar={handleValorar}
    />
  )
}
