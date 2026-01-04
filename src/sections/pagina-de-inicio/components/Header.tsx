'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  logo: string
  onExplorarPropiedades?: () => void
  onVerServicios?: () => void
  onContactar?: () => void
}

export function Header({ logo, onExplorarPropiedades, onVerServicios, onContactar }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Propiedades', onClick: onExplorarPropiedades },
    { label: 'Servicios', onClick: onVerServicios },
    { label: 'Contacto', onClick: onContactar },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Bienes Raíces"
              className="h-10 lg:h-12 w-auto brightness-0 invert"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-white/80 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onContactar}
              className="px-6 py-2.5 bg-[#722F37] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#5a252c] transition-colors"
            >
              Contáctenos
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick?.()
                    setIsMobileMenuOpen(false)
                  }}
                  className="px-6 py-4 text-white/80 hover:text-white hover:bg-white/5 text-sm font-medium uppercase tracking-wider transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-6 py-4">
                <button
                  onClick={() => {
                    onContactar?.()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-6 py-3 bg-[#722F37] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#5a252c] transition-colors"
                >
                  Contáctenos
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
