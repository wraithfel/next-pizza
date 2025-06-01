'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/shared/store/auth';

export default function InitAuth() {
  useEffect(() => {
    useAuthStore.getState().fetchUser();
  }, []);

  return null;
}
