import {cn} from '@/lib/utils'
import React from 'react';
import { Container } from '../shared';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';

interface Props{
    className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className = {cn('border border-b', className)}>
        <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-6">
            {/* Левая часть */}
            <Link href='/'>
            <div>
                <Image src="/logo.png" alt="Logo" width={35} height={35} />
                <div>
                    <h1 className="text-2xl uppercase font-black">Next Pizza </h1>
                    <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                </div>
            </div>
            </Link>

            <div className='mx-10 flex-1'>
                <SearchInput />
            </div>
            {/* Правая часть */}
            <div className='flex flex-start gap-3 pr-5'>
            <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
            </Button>
            </div>
            <div>
             <Button size="default" className="group relative overflow-x-hidden">
              <b>520 ₽</b>
              <span className="h-full w-[1px] bg-white/30 mx-3" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
                <b>3</b>
              </div>
              <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
        </div>
        </div>
         </Container>
        </header>

    )
}