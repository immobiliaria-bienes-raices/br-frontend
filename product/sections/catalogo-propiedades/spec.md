# Catálogo de Propiedades Specification

## Overview
Property catalog page with Engel & Völkers style sticky filter bar and list layout. Features a dark two-row filter system, property cards with key details, and save search functionality for logged-in users. List view only - no grid or map toggle.

## User Flows
- User lands on catalog and sees list of properties with sticky filter bar
- User toggles between Venta/Arriendo on primary filter row
- User searches location via autocomplete input
- User selects property type from dropdown
- User expands secondary filters for price range, rooms, baths, area
- User clicks "Aplicar" to apply filter selections
- User sees "Nuevo" and "Destacado" badges on qualifying properties
- User clicks property card to navigate to property details
- Logged-in user clicks "Guardar Búsqueda" button (secondary color) to save current filters
- Logged-in user clicks heart icon to bookmark property to favorites
- User clears individual filters or resets all filters
- User sorts results using sort dropdown

## UI Requirements
- Sticky horizontal filter bar with dark background (#1a1a1a) and light text
- **Primary Filter Row (always visible):**
  - Venta/Arriendo toggle (left)
  - Location input with autocomplete (center)
  - Property type dropdown (Apartamento, Casa, Apartaestudio, Local Comercial)
  - "Más Filtros" expandable button (right)
- **Secondary Filter Row (expandable):**
  - Price range: Min/Max inputs in COP
  - Habitaciones: Increment/decrement buttons (+/-)
  - Baños: Increment/decrement buttons (+/-)
  - Área: Number input in m²
- "Aplicar" button to confirm filter selections
- "Guardar Búsqueda" button in secondary color (#722F37) with white text
- LIST layout only - no grid/split/map view toggle
- Property cards in vertical list showing:
  - Thumbnail image with badges (Nuevo, Destacado)
  - Location (zona, localidad)
  - Title
  - Price in COP
  - Specs: bedrooms, bathrooms, area m²
  - Heart/favorite icon for logged-in users
- Results count display (e.g., "24 propiedades encontradas")
- Active filter chips with remove option
- Sort dropdown: Más recientes, Mejores ofertas, Precio menor a mayor, Precio mayor a menor, Área mayor a menor
- Pagination at bottom
- Collapsible filters on mobile
- Empty state when no properties match filters

## Configuration
- shell: true
