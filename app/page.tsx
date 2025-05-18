import { Container, ProductsGroupList} from "@/components/shared";
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

    <Container className=" mt-10 pb-14">
      <div className="flex gap-[60px]">

        <div className="w-[400px]">
          <Filters />
        </div>

        <div className="gap-1 ml-12">
          <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" items={[{
                id: 1,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 2,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 3,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 4,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 5,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 6,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] }
              ]}
                categoryId={1} />
              <ProductsGroupList title="Комбо" items={[{
                id: 1,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 2,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 3,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 4,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 5,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 6,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] }
              ]}
                categoryId={2} />
              <ProductsGroupList title="Коктейли" items={[{
                id: 1,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 2,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 3,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 4,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 5,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 6,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] }
              ]}
                categoryId={3} />
              <ProductsGroupList title="Закуски" items={[{
                id: 1,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 2,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 3,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 4,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 5,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 6,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] }
              ]}
                categoryId={4} />
              <ProductsGroupList title="Комбо" items={[{
                id: 1,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 2,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 3,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 4,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 5,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] },
              {
                id: 6,
                name: 'Чиз Пицца',
                imageUrl:"https://media.dodostatic.net/image/r:584x584/11ee7d60fda22358ac33c6a44eb093a2.avif",
                price: 550,
                items: [{ price: 550}] }
              ]}
                categoryId={5} />
          </div>
        </div>

      </div>
    </Container>
    </>
  )
}
