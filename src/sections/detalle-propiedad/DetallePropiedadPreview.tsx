import data from '@/../product/sections/detalle-propiedad/data.json'
import { DetallePropiedad } from './components/DetallePropiedad'

export default function DetallePropiedadPreview() {
  return (
    <DetallePropiedad
      propiedad={data.propiedad}
      breadcrumbs={data.breadcrumbs}
      agente={data.agente}
      contactoOpciones={data.contactoOpciones}
      propiedadesSimilares={data.propiedadesSimilares}
      mapa={data.mapa}
      onBack={() => console.log('Back clicked')}
      onBreadcrumbClick={(href) => console.log('Breadcrumb clicked:', href)}
      onContactoOpcion={(tipo) => console.log('Contacto opción:', tipo)}
      onSolicitarVisita={() => console.log('Solicitar visita clicked')}
      onViewSimilar={(id) => console.log('View similar:', id)}
    />
  )
}
