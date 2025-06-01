'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/shared/components/shared';
import { Input, Button } from '@/shared/components/ui';
import { useAuthStore } from '@/shared/store/auth';
import { useCartStore } from '@/shared/store';
import { Api } from '@/shared/services/api-client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AuthWarningDialog } from '@/shared/components/shared/auth-warning-dialog';

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuthStore();
  const router = useRouter();
  const cartStore = useCartStore();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      setShowWarning(true);
    }
  }, [authLoading, user]);

  const [form, setForm] = useState({
    fullName: user?.fullName ?? '',
    phone: '',
    address: '',
    comment: '',
  });
  const [saving, setSaving] = useState(false);

  const onSubmit = async () => {
    try {
      setSaving(true);
      await Api.orders.create(form);
      await cartStore.fetchCartItems();
      toast.success('Заказ оформлен!');
      router.push('/order-success');
    } catch (error) {
      let message = 'Ошибка оформления';
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: unknown } } }).response?.data?.message ===
          'string'
      ) {
        message = (error as { response: { data: { message: string } } }).response.data.message;
      }
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (showWarning) {
    return <AuthWarningDialog open={showWarning} onOpenChange={setShowWarning} />;
  }

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
          placeholder="Комментарий к заказу (необязательно)"
          value={form.comment}
          onChange={e => setForm({ ...form, comment: e.target.value })}
        />
        <Button onClick={onSubmit} disabled={saving}>
          Подтвердить заказ
        </Button>
      </div>
    </Container>
  );
}
