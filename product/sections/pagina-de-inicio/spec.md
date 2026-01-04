# Página de Inicio Specification

## Overview
Landing page styled after Engel & Völkers with elegant, minimalist design. Features a full-screen hero with 3 auto-sliding background videos, brand identity, team of real estate advisors, two featured properties with premium card design, Google Maps integration, and multiple contact channels.

## User Flows
- User lands on page and sees immersive hero with auto-playing video background and "Encuentra Tu Hogar Ideal en Bogotá" headline
- User watches as videos auto-transition every 10 seconds (3 videos in continuous loop)
- User clicks "Ver Propiedades" CTA to browse catalog
- User scrolls to see "Conoce el Equipo" section with realtor profile cards
- User browses two featured properties with E&V style cards
- User clicks property card to view full details
- User clicks "Preguntar Sobre" button to see contact options (AI Chat, Email, WhatsApp)
- User uses Google Maps to view property locations
- User clicks contact CTA to reach out

## UI Requirements
- **Hero Video Slider:**
  - Full-screen background with 3 videos from `/mocks/videos/`
  - Auto-slide every 10 seconds with smooth crossfade transition
  - Videos auto-play muted and loop continuously
  - No manual navigation controls (fully automatic)
  - Dark overlay for text readability
  - "Encuentra Tu Hogar Ideal en Bogotá" heading centered
  - "Ver Propiedades" CTA button in secondary color (#722F37)
- SVG logo from `/assets/logo.svg` in header
- "Conoce el Equipo" section with realtor profile cards (photo, name, title, contact)
- Exactly 2 featured properties using images from `/mocks/prop1/` and `/mocks/prop2/`
- Property cards E&V style: large image, modality badge, location, price, area, bedrooms, bathrooms
- Google Maps integration showing property locations
- "Preguntar Sobre" button (#722F37) with dropdown: AI Chat, Email, WhatsApp
- Value proposition section highlighting key benefits
- Services section with icons/cards
- Contact CTA with strong call-to-action
- All content in Spanish
- Responsive design with mobile-first approach

## Configuration
- shell: false
