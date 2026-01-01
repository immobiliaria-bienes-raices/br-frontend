# Detalle de Propiedad Specification

## Overview
Full property details page styled after Engel & Völkers. Displays comprehensive property information including image gallery, specifications, description, amenities, location map, and contact options. Elegant, minimalist luxury design with generous whitespace.

## User Flows
- User arrives from property card on landing page via "Ver Detalles" button
- User browses through image gallery (carousel with thumbnails, fullscreen option)
- User reviews property specifications (price, area, bedrooms, bathrooms, etc.)
- User reads full property description
- User views amenities and features list
- User checks property location on map
- User contacts agent via "Preguntar Sobre" dropdown (AI Chat, Email, WhatsApp)
- User views nearby/similar properties carousel
- User navigates back to property listings

## UI Requirements

### Header
- Sticky header with logo (top-left, links to home)
- Breadcrumb navigation: Inicio > Propiedades > [Property Title]
- Back button to return to listings

### Image Gallery Section
- Large hero image carousel with counter (e.g., "1/12")
- Navigation arrows for previous/next
- Thumbnail strip below main image
- Fullscreen/lightbox view option
- Smooth transitions between images

### Property Overview Bar
- Property title (prominent)
- Location with MapPin icon
- Price (large, wine red color #722F37)
- Modality badge (Venta/Arriendo)
- Property ID reference

### Key Specifications Grid
- Area (m²) with icon
- Bedrooms with icon
- Bathrooms with icon
- Parking with icon
- Floor/level (if applicable)
- Year built (if available)

### Description Section
- Section header "Descripción"
- Full property description text
- Expandable "Ver más" if text is long

### Amenities & Features Section
- Section header "Características"
- Grid of feature tags/pills
- Icons where applicable

### Location Section
- Section header "Ubicación"
- Google Maps placeholder showing property location
- Neighborhood description
- Nearby points of interest

### Contact Section
- Agent/realtor card with photo, name, title
- Phone number (clickable)
- Email (clickable)
- "Preguntar Sobre" button (#722F37) with dropdown:
  - AI Chat (bot icon)
  - Send Email (mail icon)
  - WhatsApp (message icon)
- "Solicitar Visita" button

### Similar Properties Section
- Section header "Propiedades Similares"
- Horizontal carousel of 3-4 property cards
- Same card style as landing page
- Navigation arrows

### Footer
- Same footer as landing page

## Design Direction
- Engel & Völkers inspired: refined luxury, editorial feel
- Colors: #F5F2F2 (cream), #722F37 (wine red), slate (neutral)
- Typography: Manrope - elegant, modern
- Generous whitespace and padding
- Subtle hover animations
- Mobile-responsive layout

## Configuration
- shell: true
