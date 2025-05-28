'use client'

import React, { JSX } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import { useCategories } from '@/shared/hooks/useCategories'

interface Props {
  className?: string
}

export function Categories({ className }: Props): JSX.Element {

  const { categories, loading} = useCategories()


  const activeIndex = useCategoryStore(s => s.activeId)
  const setActive   = useCategoryStore(s => s.setActiveId)
  const searchParams = useSearchParams()
  const queryString  = searchParams.toString()

  if (loading) {
    return (
    <div className={cn('flex flex-wrap gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-11 w-20 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
      )
  }

  return (
    <div className={cn('flex flex-wrap gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {categories!.map(({ id, name }) => {
        const href = queryString
          ? `?${queryString}#${encodeURIComponent(name)}`
          : `#${encodeURIComponent(name)}`

        return (
          <Link
            key={id}
            href={href}
            className={cn(
              'flex items-center font-bold h-11 rounded-2xl px-5',
              activeIndex === id && 'bg-white shadow-md shadow-gray-200 text-primary'
            )}
            onClick={() => setActive(id)}
          >
            {name}
          </Link>
        )
      })}
    </div>
  )
}
