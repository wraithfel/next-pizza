import { Container, ProductsGroupList} from "@/components/shared";
import { Title } from "@/components/shared";
import { TopBar } from "@/components/shared";
import { Filters } from "@/components/shared";

const dummyItems = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: 'Чиз Пицца',
  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif',
  items: [{ price: 550 }],
}));

const groups = [
  { id: 1, title: 'Пиццы',     items: dummyItems },
  { id: 2, title: 'Комбо',      items: dummyItems },
  { id: 3, title: 'Закуски',    items: dummyItems },
  { id: 4, title: 'Коктейли',   items: dummyItems },
  { id: 5, title: 'Кофе',       items: dummyItems },
  { id: 6, title: 'Напитки',    items: dummyItems },
  { id: 7, title: 'Десерты',    items: dummyItems },
];


export default function Home() {
  return(
    <>
    <Container className="mt-10">
        <Title size="lg" text='Все пиццы' className="font-extrabold"/>
    </Container>
    <TopBar/>

    <Container className=" mt-10 pb-14">
      <div className="flex gap-[60px]">

        <div className="w-[400px]">
          <Filters />
        </div>

        <div className="gap-1 ml-12">
          <div className="flex flex-col gap-16">
              {groups.map(group => (
                <ProductsGroupList
                  key={group.id}
                  categoryId={group.id}
                  title={group.title}
                  items={group.items}
                />
              ))}
          </div>
        </div>

      </div>
    </Container>
    </>
  )
}
