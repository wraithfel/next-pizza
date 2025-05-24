'use client';

import { Title } from './title';
import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { RangeSlider } from './range-slider';
import { useFilters } from '@/hooks/useFilters';

export const Filters: React.FC<{ className?: string }> = ({ className }) => {
  const {
    ingredients,
    loading,
    sizes,
    types,
    selectedIng,
    price,
    toggleSize,
    toggleType,
    toggleIng,
    setPrice,
  } = useFilters();

  const ingredientItems = ingredients.map(i => ({ value: String(i.id), text: i.name }));

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={toggleSize}
        selectedValues={sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={toggleType}
        selectedValues={types}
        items={[
          { text: 'Тонкое',        value: '1' },
          { text: 'Традиционное',  value: '2' },
        ]}
      />

      {/* блок "Цена" */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            min={0}
            max={1000}
            placeholder="0"
            value={price.priceFrom ?? ''}
            onChange={e => setPrice(p => ({ ...p, priceFrom: Number(e.target.value) }))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={price.priceTo ?? ''}
            onChange={e => setPrice(p => ({ ...p, priceTo: Number(e.target.value) }))}
          />
        </div>
        <RangeSlider
          className="mx-2"
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom ?? 0, price.priceTo ?? 1000]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>

      {/* ингредиенты */}
      <CheckboxFiltersGroup
        className="mt-5"
        title="Ингредиенты"
        name="ingredients"
        limit={6}
        loading={loading}
        items={ingredientItems}
        defaultItems={ingredientItems.slice(0, 6)}
        onClickCheckbox={toggleIng}
        selectedValues={selectedIng}
      />
    </div>
  );
};
