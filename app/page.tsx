import { Container, SortPopup } from "@/components/shared";
import { Title } from "@/components/shared";
import { TopBar } from "@/components/shared";
import { Filters } from "@/components/shared";


export default function Home() {
  return(
    <>
    <Container className="mt-10">
        <Title size="lg" text='Все пиццы' className="font-extrabold"/>
    </Container>
    <TopBar/>

    <Container className="pb-14">
      <div className="flex gap-[60px]">

        <div className="w-[250px]">
          <Filters />
        </div>

        <div className="gap-1">
          <div className="flex flex-col gap-16">
            Список товаров
          </div>
        </div>

      </div>
    </Container>
    </>
  )
}
