'use client';

import { User, LogOut } from 'lucide-react';
import { Button} from '../ui';
import { Popover, PopoverTrigger, PopoverContent}  from '../ui/popover';
import { useState } from 'react';
import { AuthDialog } from './auth-dialog';
import { useAuthStore } from '@/shared/store/auth';
import { cn } from '@/shared/lib/utils';

export const AuthButton: React.FC<{ className?:string }> = ({ className }) => {
  const { user, signOut } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);

  if (!user) {
    return (
      <>
        <Button variant="outline" className={cn('flex items-center gap-1', className)} onClick={()=>setOpenDialog(true)}>
          <User size={16} /> Войти
        </Button>
        <AuthDialog open={openDialog} onOpenChange={setOpenDialog} />
      </>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('gap-1', className)}>
          <User size={16} /> {user.fullName.split(' ')[0]}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 w-36">
        <button
          onClick={signOut}
          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-secondary"
        >
          <LogOut size={16} /> Выйти
        </button>
      </PopoverContent>
    </Popover>
  );
};
