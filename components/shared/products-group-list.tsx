'use client';

import React from 'react';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import {useIntersection} from 'react-use';
import { useCategoryStore } from '@/store/category';

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    className ?: string;
    listClassName ?: string
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    listClassName,
    categoryId,
    className,
}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = React.useRef<HTMLDivElement | null>(null);
    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.2,
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting){
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting])
    
    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            
            <div className={cn('grid gap-[50px] gap-y-12 sm:gap-x-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3', listClassName)}>
                {items.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                    />
                ))}
            </div>
        </div>
    )
}