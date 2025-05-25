import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <Link href={`/product/${id}`} className={cn(
      'flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg',
      className
    )}>

      <div className='flex justify-center items-center bg-secondary p-6 h-[260px]'>
        {imageUrl && (
          <img
            className='w-[215px] h-[215px] object-cover'
            src={imageUrl}
            alt={name}
          />
        )}
      </div>

      <div className='p-4 flex flex-col flex-1'>
        <Title text={name} size="sm" className='mb-1 font-bold' />

        <p className='text-sm text-gray-400 flex-1'>
          Цыпленок, моцарелла, сыр чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок.
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>
          <Button variant="secondary">
            <Plus className="w-4 h-4 mr-1" />
            Добавить
          </Button>
        </div>
      </div>
    </Link>
  );
};
