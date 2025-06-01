import React, { Suspense } from 'react'
import { Container, ProductsGroupList } from '@/shared/components/shared'
import { Title } from '@/shared/components/shared'
import { TopBar } from '@/shared/components/shared'
import { Filters } from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  })

  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="Все пиццы" className="font-extrabold" />
      </Container>

      <Suspense fallback={null}>
        <TopBar />
      </Suspense>

      <Container className="mt-10 pb-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px]">
          <aside className="w-full lg:w-[400px] mb-8 lg:mb-0">
            <Suspense fallback={null}>
              <Filters />
            </Suspense>
          </aside>

          <div className="w-full lg:ml-12">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                <Suspense key={category.id} fallback={null}>
                  <ProductsGroupList
                    categoryId={category.id}
                    title={category.name}
                    items={category.products}
                  />
                </Suspense>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
