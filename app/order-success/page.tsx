'use client';

import { Container } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { useAuthStore } from '@/shared/store/auth';
import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <Container className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-black mb-4">
        Спасибо за заказ, {user?.fullName.split(' ')[0]}!
      </h1>
      <p className="text-xl mb-10">
        Мы уже&nbsp;спешим к&nbsp;вам&nbsp;🚴‍♂️
      </p>

      <Button onClick={() => router.push('/')}>На&nbsp;главную</Button>
    </Container>
  );
}
