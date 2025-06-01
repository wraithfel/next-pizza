export const ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj, ind) => ({ id: ind + 1, ...obj }));

export const categories = [
  { name: "Пицца" },
  { name: "Завтрак" },
  { name: "Закуски" },
  { name: "Коктейли" },
  { name: "Напитки" },
];

export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/019635f026a47947978aefdd7ccaad8d.avif',
    categoryId: 2,
    description:
      'Начните утро с нашумевшего омлета: взбитые яйца, нежная ветчина и ароматные шампиньоны в каждой вилке.',
  },
  {
    name: 'Омлет с пепперони',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/019635f2c8c27808a3f77786977bc7b8.avif',
    categoryId: 2,
    description:
      'Огненная смесь яиц и пикантной пепперони, чтобы зарядиться энергией на весь день.',
  },
  {
    name: 'Омлет с томатами в пите',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/0197031381be73b0a8253112df142148.avif',
    categoryId: 2,
    description:
      'Сочная комбинация свежих томатов и расплавленной моцареллы, завернутая в мягкую питу.',
  },
  {
    name: 'Омлет с ветчиной и грибами в пите',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/019702ef9a7371f795eaaa1372844e13.avif',
    categoryId: 2,
    description:
      'Классический омлет с ветчиной и грибами — только в удобном формате питы. Берите с собой в дорогу!',
  },
  {
    name: 'Омлет сырный в пите',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/0197030bdc7e700ab6f0a869787cc9f9.avif',
    categoryId: 2,
    description:
      'Расплавленная моцарелла и нежный омлет в каждой порции — сырная магия в каждой укусе.',
  },
  {
    name: 'Дэнвич ветчина и сыр',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/01960b7c2e3871fabedd3f13bd270d6e.avif',
    categoryId: 3,
    description:
      'Хрустящий хлеб, сочная ветчина и плавленый сыр — классика, проверенная временем и голодом.',
  },
  {
    name: 'Куриные наггетсы',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11eef45eacc4d7eabc10e0a0e0c2c67a.avif',
    categoryId: 3,
    description:
      'Золотистая корочка, нежное куриное мясо внутри — идеальная закуска для любого повода.',
  },
  {
    name: 'Картофель из печи с соусом 🌱',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11eed646b7ac9c38ba256320dd31c4d5.avif',
    categoryId: 3,
    description:
      'Запечённый картофель с ароматным соусом — домашний уют на вашем столе.',
  },
  {
    name: 'Додстер',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ee796f96d11392a2f6dd73599921b9.avif',
    categoryId: 3,
    description:
      'Мини-пирожок с начинкой, способный утолить голод и поднять настроение в одно мгновение.',
  },
  {
    name: 'Острый Додстер 🌶️🌶️',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ee796fd3b594068f7a752df8161d04.avif',
    categoryId: 3,
    description:
      'Острое приключение для смелых: два красных перца гарантируют огненный вкус!',
  },
  {
    name: 'Клубничный молочный коктейль',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ef5bc1b51d1329b6378418b134c873.avif',
    categoryId: 4,
    description:
      'Спелая клубника и холодное молоко — как глоток летнего утра в каждом стакане.',
  },
  {
    name: 'Шоколадный молочный коктейль',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ef5bc2b2516586896007fcd6a14c23.avif',
    categoryId: 4,
    description:
      'Густой шоколад, мороженое и молоко — сладкая фантазия, в которую хочется окунуться.',
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ef5bc24dc566b0918b1ede2949a71a.avif',
    categoryId: 4,
    description:
      'Хрустящее печенье Орео и кремовая основа — взрыв вкуса в каждом глотке.',
  },
  {
    name: 'Классический молочный коктейль 👶',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ef5bc13531cc94bb01bef8fa0cc92f.avif',
    categoryId: 4,
    description:
      'Простое сочетание мороженого и молока, возвращающее в беззаботные детские дни.',
  },
  {
    name: 'Кофе Ореховый латте',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ee7d61b12220ab911ff4fa42ef585d.avif',
    categoryId: 5,
    description:
      'Нежный латте с нотками грецкого ореха — уютный напиток для тех, кто ценит тепло утра.',
  },
  {
    name: 'Кофе Карамельный капучино',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ee7d61aed6b6d4bfdad4e58d76cf56.avif',
    categoryId: 5,
    description:
      'Сливочный капучино с карамелью — внимание к деталям в каждом глотке.',
  },
  {
    name: 'Кофе Кокосовый латте',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ee7d61b19fa07090ee88b0ed347f42.avif',
    categoryId: 5,
    description:
      'Тропический аромат кокоса в сочетании с богатым эспрессо — капучино, как отпуск.',
  },
  {
    name: 'Кофе Американо',
    imageUrl:
      'https://media.dodostatic.net/image/r:1875x1875/11ee7d61b02b810b8767d5ff70d15897.avif',
    categoryId: 5,
    description:
      'Чёткий вкус классического чёрного кофе — идеальный старт для целого дня дел.',
  },
  {
    name: 'Кофе Латте',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/11ee7d61b0c26a3f85d97a78feee00ad.avif',
    categoryId: 5,
    description:
      'Мягкость молока и крепость эспрессо — баланс, который согреет в любую погоду.',
  },
];
