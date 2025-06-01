'use client';

import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { useSort } from '@/shared/hooks/useSort';

interface Props {
  className?: string;
}

const options = [
  { value: 'popular',   label: 'популярное' },
  { value: 'priceAsc',  label: 'дешевле'    },
  { value: 'priceDesc', label: 'дороже'     },
  { value: 'name',      label: 'алфавит'    },
];

export const SortPopup: React.FC<Props> = ({ className }) => {
  const { currentSort, setSort } = useSort();
  const active = options.find(o => o.value === currentSort)?.label ?? 'популярное';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
            className,
          )}
        >
          <ArrowUpDown className="w-4 h-4" />
          <b>Сортировка:</b>
          <b className="text-primary">{active}</b>
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-2 w-44">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => setSort(opt.value)}
            className={cn(
              'flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-gray-100',
              currentSort === opt.value && 'font-bold text-primary',
            )}
          >
            {opt.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
