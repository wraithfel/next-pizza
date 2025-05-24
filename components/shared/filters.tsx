'use client'

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from 'qs';
import { useRouter } from "next/navigation";

interface Props {
    className ?: string;
}

interface PriceProps {
    priceFrom: number;
    priceTo: number
}


export const Filters: React.FC<Props> = ({ className }) => {
    const router = useRouter();
    const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();

    const [sizes, { toggle: toggleSizes}] = useSet(new Set<string>([]));
    const [types, { toggle: toggleTypes}] = useSet(new Set<string>([]));

    const [ prices, setPrice] = React.useState<PriceProps>({
        priceFrom: 0,
        priceTo: 1000
    })

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name}));

    const changePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        });
    };

    React.useEffect(() => {
        const filters = {
            ...prices,
            pizzaTypes: Array.from(types),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIds)
        }

        const queryString = qs.stringify(filters, {
            arrayFormat:'comma',
        });

        router.push(`?${queryString}`);
    }, [selectedIds, types, sizes, prices, router])

    return (
    <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

        <CheckboxFiltersGroup
        title='Размеры'
        name="sizes"
        className="mb-5"
        onClickCheckbox={toggleSizes}
        items={[
            {text: '20 см', value: '20'},
            {text: '30 см', value: '30'},
            {text: '40 см', value: '40'},
        ]} 
        selectedValues={sizes}
        />

        <CheckboxFiltersGroup
        title='Тип теста'
        name="type"
        className="mb-5"
        onClickCheckbox={toggleTypes}
        items={[
            {text: 'Тонкое', value: '1'},
            {text: 'Традиционное', value: '2'},
        ]} 
        selectedValues={types}
        />

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
            <Input type="number" placeholder="0" min={0} max={1000} value={String(prices.priceFrom)} onChange={(e) => changePrice('priceFrom', Number(e.target.value))} />
            <Input type="number" min={100} max={1000} placeholder="1000" value={String(prices.priceTo)} onChange={(e) => changePrice('priceTo', Number(e.target.value))} />
            </div>
         <RangeSlider 
            className="mx-2"
            min={0}
            max={1000}
            step={10}
            value={[prices.priceFrom, prices.priceTo]}
            onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})} />
        </div> 
        <CheckboxFiltersGroup
        className="mt-5"
        title="Ингредиенты"
        limit={6}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={onAddId}
        selectedValues={selectedIds}
        name='ingredients'
      />
    </div>)
}