import type { NavigationItem } from './AppShell'

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavigate?.(item.href)}
          className={`
            px-4 py-2 text-sm font-medium transition-colors relative
            ${
              item.isActive
                ? 'text-[#722F37] dark:text-[#722F37]'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#722F37] dark:hover:text-[#722F37]'
            }
          `}
        >
          {item.label}
          {item.isActive && (
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#722F37]" />
          )}
        </button>
      ))}

      {/* CTA Button */}
      <button
        onClick={() => onNavigate?.('/contacto')}
        className="ml-4 px-5 py-2.5 bg-[#722F37] hover:bg-[#5a272e] text-white text-sm font-medium rounded transition-colors"
      >
        Contáctenos
      </button>
    </nav>
  )
}
