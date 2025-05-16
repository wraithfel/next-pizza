import {cn} from '@/lib/utils'
import React from 'react';
import { Container } from '../shared';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';

interface Props{
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b overflow-x-hidden', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              вкусней уже некуда
            </p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            <span className="hidden sm:inline">Войти</span>
          </Button>

          <Button className="group relative flex items-center gap-3">
            <b>520 ₽</b>
            <span className="h-full w-px bg-white/30"></span>
            <div className="flex items-center gap-1 transition-opacity duration-300 group-hover:opacity-0">
              <ShoppingCart className="h-4 w-4" strokeWidth={2} />
              <b>3</b>
            </div>
            <ArrowRight
              className="absolute right-3 w-5 transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Button>
        </div>
      </Container>
    </header>
  );
};
