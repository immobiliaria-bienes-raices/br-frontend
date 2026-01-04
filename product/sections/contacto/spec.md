# Contacto Specification

## Overview
Contact page styled after Engel & Völkers featuring a comprehensive contact form with appointment scheduling, office information, and Google Maps integration. Standalone public-facing page with elegant E&V aesthetics.

## User Flows
- User lands on page and sees contact form alongside office information
- User fills out form: Name, Email, Phone, Inquiry type (Comprar/Vender/Arrendar), Preferred contact method, Message
- User optionally schedules an appointment using date/time picker
- User checks consent checkbox and submits form
- User views office location on embedded Google Maps
- User clicks phone/email to contact directly

## UI Requirements
- **Hero Section:** Minimal header with headline "Contáctenos" and subheadline
- **Contact Form (E&V style):**
  - Name field (required)
  - Email field (required, with validation)
  - Phone field (required)
  - Inquiry type dropdown: Comprar, Vender, Arrendar, Otro
  - Preferred contact method: Email, Teléfono, WhatsApp
  - Message textarea
  - Appointment scheduling: Date picker + Time slot selector
  - Consent checkbox for data processing
  - Submit button in #722F37
- **Office Information Card:**
  - Address
  - Phone number (clickable)
  - Email (clickable)
  - Business hours
  - WhatsApp link
- **Google Maps:** Embedded map showing office location
- Standalone page with custom header (same as Página de Inicio)
- All content in Spanish
- Responsive design with form and info side-by-side on desktop

## Configuration
- shell: false
