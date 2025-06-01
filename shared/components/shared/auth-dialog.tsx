'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button, Input } from '../ui';
import { useAuthStore } from '@/shared/store/auth';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const AuthDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const loading = useAuthStore((state) => state.loading);

  const submit = async () => {
    try {
      if (mode === 'login') {
        await signIn({ email: form.email, password: form.password });
      } else {
        await signUp(form);
      }
      toast.success('Успешно!');
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Ошибка');
    }
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Вход' : 'Регистрация'}</DialogTitle>
        </DialogHeader>

        {mode === 'register' && (
          <Input
            placeholder="Имя"
            className="mb-3"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />
        )}

        <Input
          placeholder="E-mail"
          type="email"
          className="mb-3"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <Button className="mt-6 w-full" disabled={loading} onClick={submit}>
          {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </Button>

        <button
          className="mt-3 text-sm text-primary w-full"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже зарегистрированы? Войти'}
        </button>
      </DialogContent>
    </Dialog>
  );
};
