import { Container, ProductsGroupList} from "@/shared/components/shared";
import { Title } from "@/shared/components/shared";
import { TopBar } from "@/shared/components/shared";
import { Filters } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";


export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true
        }
      }
    }
  })
  return(
    <>
    <Container className="mt-10">
        <Title size="lg" text='Все пиццы' className="font-extrabold"/>
    </Container>
    <TopBar/>

    <Container className="mt-10 pb-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px]">
        <aside className="w-full lg:w-[400px] mb-8 lg:mb-0">
            <Filters />
        </aside>

        <div className="w-full lg:ml-12">
              <div className="flex flex-col gap-16">
                  {categories.map((category) => (
                      <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                      />
                    ))}
                </div>
          </div>
      </div>
      </Container>
    </>
  )
}
