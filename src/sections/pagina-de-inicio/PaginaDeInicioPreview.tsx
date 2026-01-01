import data from '@/../product/sections/pagina-de-inicio/data.json'
import { PaginaDeInicio } from './components/PaginaDeInicio'

export default function PaginaDeInicioPreview() {
  return (
    <PaginaDeInicio
      hero={data.hero}
      equipo={data.equipo}
      propiedadesDestacadas={data.propiedadesDestacadas}
      contactoOpciones={data.contactoOpciones}
      servicios={data.servicios}
      valorPropuestas={data.valorPropuestas}
      contactoCTA={data.contactoCTA}
      mapa={data.mapa}
      onViewPropiedad={(id) => console.log('View propiedad:', id)}
      onExplorarPropiedades={() => console.log('Explorar propiedades')}
      onVerServicios={() => console.log('Ver servicios')}
      onContactar={() => console.log('Contactar')}
      onContactoOpcion={(tipo) => console.log('Contacto opción:', tipo)}
      onViewEquipoMember={(id) => console.log('View equipo member:', id)}
    />
  )
}
