# Servicios Specification

## Overview
Service presentation page styled after Engel & Völkers with elegant layouts showcasing real estate intermediation services for property owners. Features a hero with residential area imagery, 4-step process timeline, value proposition cards, FAQ accordion, and contact CTA.

## User Flows
- User lands on page and sees hero with residential area image and "Contáctenos" / "Valorar Propiedad" CTAs
- User scrolls through value proposition cards highlighting service benefits
- User views 4-step process timeline: Consulta → Valoración → Marketing → Cierre
- User expands FAQ accordion to read common questions
- User clicks contact CTA to reach out

## UI Requirements
- **Hero Section:** Split layout with residential area image (Santa Barbara/El Retiro/San Patricio) + headline + two CTAs in #722F37
- **Value Proposition Cards:** 4-5 benefit blocks with icons (Asesoría calificada, Valoraciones precisas, Marketing personalizado, Red de compradores, Procesos transparentes)
- **Process Timeline:** 4 steps displayed as alternating image/text blocks (Consulta, Valoración, Marketing, Cierre) with residential area images
- **FAQ Accordion:** Expandable questions about selling/renting process, timing, costs
- **Contact CTA Section:** Final conversion block with "Contáctenos" button
- All content in Spanish
- Images from `/mocks/zonas/` (santa-barbara, el-retiro, san-patricio, creditos)
- Responsive design with E&V style spacing and typography

## Configuration
- shell: true
