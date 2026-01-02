# Catálogo de Propiedades Specification

## Overview
Property catalog page with Engel & Völkers style grid layout, advanced filtering, and map integration. Allows users to search, filter, and sort properties in Bogotá D.C. Logged-in users can save searches and bookmark favorite properties to their dashboard.

## User Flows
- User lands on catalog and sees grid of properties with map view
- User applies filters (zona, tipo, modalidad, precio, habitaciones, baños, área, parqueadero, características)
- User sorts results by newest, hottest (best priced), price ascending/descending, or area
- User sees "Nuevo" and "Destacado" badges on qualifying properties
- User clicks property card to navigate to property details
- Logged-in user clicks "Guardar Búsqueda" to save current filter combination with custom name
- Logged-in user clicks heart icon to bookmark property to favorites
- User accesses dashboard to view saved searches and favorite properties
- User clicks on map marker to highlight corresponding property card
- User clears individual filters or resets all filters

## UI Requirements
- Filter bar with all Engel & Völkers style filters:
  - Ubicación/Zona (neighborhood dropdown/autocomplete)
  - Tipo de Propiedad (Apartamento, Casa, Apartaestudio, Local Comercial)
  - Modalidad (Venta, Arriendo)
  - Precio (Min/Max range slider in COP)
  - Habitaciones (Min: 1, 2, 3, 4+)
  - Baños (Min: 1, 2, 3+)
  - Área (Min/Max m² range)
  - Parqueadero (Con/Sin)
  - Características (multi-select: Vista, Terraza, Gimnasio, Seguridad 24h, etc.)
- Collapsible filter bar on mobile
- Grid layout with property cards showing image, badge, location, price, area, beds, baths
- Split-screen map view (desktop) or toggle map view (mobile)
- Google Maps integration showing property markers
- Results count display (e.g., "24 propiedades encontradas")
- Active filter chips with remove option
- Sort dropdown: Más recientes (default), Mejores ofertas, Precio menor a mayor, Precio mayor a menor, Área mayor a menor
- "Nuevo" badge for recently added properties
- "Destacado" badge for hottest/best-priced properties
- Heart/bookmark icon on property cards for logged-in users
- "Guardar Búsqueda" button with modal to name the search (logged-in users)
- Pagination or infinite scroll for large result sets
- Empty state when no properties match filters
- Responsive design with mobile-first approach

## Configuration
- shell: true
