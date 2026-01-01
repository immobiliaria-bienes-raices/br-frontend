import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  logoSrc?: string
  onNavigate?: (href: string) => void
}

export function AppShell({
  children,
  navigationItems,
  logoSrc = '/assets/logo.svg',
  onNavigate,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2F2] dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F5F2F2] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => onNavigate?.('/')}
                className="block transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={logoSrc}
                  alt=""
                  className="h-14 md:h-16 w-auto"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <MainNav
              items={navigationItems}
              onNavigate={onNavigate}
            />

            {/* Mobile Navigation */}
            <MobileNav
              items={navigationItems}
              logoSrc={logoSrc}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <img
                  src={logoSrc}
                  alt=""
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-slate-400 text-sm">
                Plataforma inmobiliaria integral en Bogotá D.C.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Navegación
              </h3>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => onNavigate?.(item.href)}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Contacto
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Bogotá D.C., Colombia</li>
                <li>info@bienesraices.co</li>
                <li>+57 (1) 234 5678</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
