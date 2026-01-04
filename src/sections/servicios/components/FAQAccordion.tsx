'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQAccordionProps } from '@/../product/sections/servicios/types'

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <span className="font-medium text-slate-900 dark:text-white pr-4">
              {item.pregunta}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#722F37] flex-shrink-0 transition-transform duration-300 ${
                openId === item.id ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openId === item.id ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-6 pt-0 bg-white dark:bg-slate-800">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.respuesta}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
