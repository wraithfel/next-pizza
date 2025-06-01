'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/shared/components/shared';
import { Button, Input } from '@/shared/components/ui';
import { AuthDialog } from '@/shared/components/shared/auth-dialog';
import { useAuthStore } from '@/shared/store/auth';
import { useCartStore } from '@/shared/store';
import { Api } from '@/shared/services/api-client';

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuthStore();
  const cartStore   = useCartStore();
  const router      = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    cartStore.fetchCartItems();
  }, [cartStore]);

  useEffect(() => {
    if (!authLoading && !user) {
      setOpenDialog(true);
    }
  }, [authLoading, user]);

  if (authLoading) return null;

  if (!user) {
    return <AuthDialog open={openDialog} onOpenChange={setOpenDialog} />;
  }

  const [form, setForm] = useState({
    fullName: user.fullName,
    phone:    '',
    address:  '',
    comment:  '',
  });
  const [saving, setSaving] = useState(false);

  const onSubmit = async () => {
    try {
      setSaving(true);
      await Api.orders.create(form);
      await cartStore.fetchCartItems();
      router.push('/order-success');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold mb-6">Доставка</h1>

      <div className="max-w-md flex flex-col gap-4">
        <Input
          placeholder="Ваше имя"
          value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })}
        />
        <Input
          placeholder="Телефон"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          placeholder="Адрес доставки"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
        <Input
          placeholder="Комментарий (необязательно)"
          value={form.comment}
          onChange={e => setForm({ ...form, comment: e.target.value })}
        />

        <Button disabled={saving} onClick={onSubmit}>
          Подтвердить заказ
        </Button>
      </div>
    </Container>
  );
}
