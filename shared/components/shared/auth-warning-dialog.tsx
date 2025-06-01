'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '../ui';
import { useRouter } from 'next/navigation';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const AuthWarningDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const router = useRouter();

  const handleOpenChange = (v: boolean) => {
    if (!v) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xs text-center">
        <DialogHeader>
          <DialogTitle>Требуется авторизация</DialogTitle>
        </DialogHeader>
        <p className="mt-4 mb-6">Для оформления заказа необходимо войти в аккаунт</p>
        <Button onClick={() => router.push('/')} className="w-full">
          На главную
        </Button>
      </DialogContent>
    </Dialog>
  );
};
