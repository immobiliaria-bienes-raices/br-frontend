import data from '@/../product/sections/pagina-de-inicio/data.json'
import { PaginaDeInicio } from './components/PaginaDeInicio'

export default function PaginaDeInicioPreview() {
  return (
    <PaginaDeInicio
      hero={data.hero}
      propiedadesDestacadas={data.propiedadesDestacadas}
      servicios={data.servicios}
      valorPropuestas={data.valorPropuestas}
      contactoCTA={data.contactoCTA}
      onViewPropiedad={(id) => console.log('View propiedad:', id)}
      onExplorarPropiedades={() => console.log('Explorar propiedades')}
      onVerServicios={() => console.log('Ver servicios')}
      onContactar={() => console.log('Contactar')}
    />
  )
}
