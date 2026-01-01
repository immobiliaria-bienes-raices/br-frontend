# Página de Inicio Specification

## Overview
Landing page styled after Engel & Völkers with elegant, minimalist design. Presents brand identity, team of real estate advisors, two featured properties with premium card design, Google Maps integration, and multiple contact channels including AI Chat, Email, and WhatsApp.

## User Flows
- User lands on page and sees hero section with brand message and CTA
- User navigates to header and sees "Conoce el Equipo" section with realtor profile cards
- User browses two featured properties with Engel & Völkers style cards
- User clicks property card to view full details
- User clicks "Preguntar Sobre" button to see contact options (AI Chat, Email, WhatsApp)
- User uses Google Maps to view property locations
- User clicks contact CTA to reach out

## UI Requirements
- SVG logo from `/assets/logo.svg` in header
- "Conoce el Equipo" section in header with realtor profile cards (photo, name, title, contact)
- Exactly 2 featured properties using images from `/mocks/prop1/` and `/mocks/prop2/`
- Property cards Engel & Völkers style: large image, modality badge (Venta/Arriendo), location, price, area, bedrooms, bathrooms
- Google Maps integration showing property locations
- "Preguntar Sobre" button in secondary color (#722F37) with dropdown showing:
  - AI Chat (chat/robot icon)
  - Send Email (mail icon)
  - Send WhatsApp (WhatsApp icon)
- Value proposition section highlighting key benefits
- Services section with icons/cards
- Contact CTA with strong call-to-action
- All page content in Spanish
- Responsive design with mobile-first approach
- Smooth transitions and elegant hover states

## Configuration
- shell: true
