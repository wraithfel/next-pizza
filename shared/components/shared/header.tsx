import {cn} from '@/shared/lib/utils'
import React from 'react';
import { CartButton, Container } from '.';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { AuthButton } from './auth-button';

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
            <AuthButton />
            <div>
                <CartButton />
        </div>
        </div>
         </Container>
        </header>

    )
}