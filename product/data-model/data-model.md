# Data Model

## Entities

### Propiedad
Un inmueble listado en la plataforma (apartamento, casa o local comercial) con información como precio, área, habitaciones y fotos. Es el elemento central del catálogo y la base de las búsquedas de los usuarios.

### Zona
Área o barrio de Bogotá D.C. donde se ubican las propiedades. Permite a los usuarios filtrar y buscar inmuebles por ubicación geográfica.

### Servicio
Los servicios que la inmobiliaria ofrece a propietarios, incluyendo intermediación, gestión administrativa y seguros mediante alianzas estratégicas.

### Consulta
Una solicitud de información o cita enviada por un cliente potencial interesado en una propiedad o en los servicios de la inmobiliaria.

## Relationships

- Propiedad pertenece a una Zona
- Zona tiene muchas Propiedades
- Consulta está asociada a una Propiedad (cuando preguntan por un inmueble específico)
