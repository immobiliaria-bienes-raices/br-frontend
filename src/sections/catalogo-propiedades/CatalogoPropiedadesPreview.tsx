import data from '@/../product/sections/catalogo-propiedades/data.json'
import { CatalogoPropiedades } from './components/CatalogoPropiedades'

export default function CatalogoPropiedadesPreview() {
  return (
    <CatalogoPropiedades
      propiedades={data.propiedades}
      zonas={data.zonas}
      filtros={data.filtros}
      ordenOpciones={data.ordenOpciones}
      busquedasGuardadas={data.busquedasGuardadas}
      usuario={data.usuario}
      mapa={data.mapa}
      resultados={data.resultados}
      onViewPropiedad={(id) => console.log('View propiedad:', id)}
      onToggleFavorito={(id) => console.log('Toggle favorito:', id)}
      onFiltrosChange={(filtros) => console.log('Filtros change:', filtros)}
      onOrdenChange={(orden) => console.log('Orden change:', orden)}
      onGuardarBusqueda={(nombre, filtros) => console.log('Guardar busqueda:', nombre, filtros)}
      onEliminarBusqueda={(id) => console.log('Eliminar busqueda:', id)}
      onCargarBusqueda={(id) => console.log('Cargar busqueda:', id)}
      onToggleAlerta={(id) => console.log('Toggle alerta:', id)}
      onMapMarkerClick={(id) => console.log('Map marker click:', id)}
      onResetFiltros={() => console.log('Reset filtros')}
      onPageChange={(page) => console.log('Page change:', page)}
    />
  )
}
