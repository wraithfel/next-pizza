'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Input, Button } from '../ui';
import { useState } from 'react';
import { useAuthStore } from '@/shared/store/auth';
import { toast } from 'react-hot-toast';

export const AuthDialog: React.FC<{ open:boolean; onOpenChange:(v:boolean)=>void }> = ({ open, onOpenChange }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ fullName:'', email:'', password:'' });
  const { signIn, signUp, loading } = useAuthStore();

  const submit = async () => {
    try {
      if (mode === 'login') await signIn({ email: form.email, password: form.password });
      else                  await signUp(form);
      toast.success('Успешно!');
      onOpenChange(false);
    } catch (e:any) {
      toast.error(e.response?.data?.message || 'Ошибка');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Вход' : 'Регистрация'}</DialogTitle>
        </DialogHeader>

        {mode === 'register' && (
          <Input
            placeholder="Имя"
            value={form.fullName}
            onChange={e=>setForm({...form, fullName:e.target.value})}
            className="mb-3"
          />
        )}

        <Input
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={e=>setForm({...form, email:e.target.value})}
          className="mb-3"
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={form.password}
          onChange={e=>setForm({...form, password:e.target.value})}
        />

        <Button onClick={submit} disabled={loading} className="mt-6 w-full">
          {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </Button>

        <button
          className="mt-3 text-sm text-primary w-full"
          onClick={()=>setMode(mode==='login'?'register':'login')}
        >
          {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже зарегистрированы? Войти'}
        </button>
      </DialogContent>
    </Dialog>
  );
};
