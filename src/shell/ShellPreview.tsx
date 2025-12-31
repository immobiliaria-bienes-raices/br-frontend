import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: 'Inicio', href: '/', isActive: true },
    { label: 'Propiedades', href: '/propiedades' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Contacto', href: '/contacto' },
  ]

  return (
    <AppShell
      navigationItems={navigationItems}
      logoText="Bienes Raíces"
      onNavigate={(href) => console.log('Navigate to:', href)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Área de Contenido
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Las secciones de la aplicación se renderizarán aquí dentro del shell.
            Este es un preview del diseño de navegación.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="w-full h-40 bg-slate-100 dark:bg-slate-700 rounded-lg mb-4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4 mb-2" />
              <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
