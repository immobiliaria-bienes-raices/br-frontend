'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface MobileNavProps {
  items: NavigationItem[]
  logoSrc?: string
  onNavigate?: (href: string) => void
}

export function MobileNav({ items, logoSrc = '/assets/logo.svg', onNavigate }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = (href: string) => {
    setIsOpen(false)
    onNavigate?.(href)
  }

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#77333B] transition-colors"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-[#F5F2F2] dark:bg-slate-900 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <img
            src={logoSrc}
            alt=""
            className="h-8 w-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#722F37] transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavigate(item.href)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${
                      item.isActive
                        ? 'bg-[#722F37]/10 text-[#722F37]'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={() => handleNavigate('/contacto')}
            className="w-full mt-6 px-5 py-3 bg-[#722F37] hover:bg-[#5a272e] text-white text-sm font-medium rounded-lg transition-colors"
          >
            Contáctenos
          </button>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Bogotá D.C., Colombia
          </p>
        </div>
      </div>
    </div>
  )
}
