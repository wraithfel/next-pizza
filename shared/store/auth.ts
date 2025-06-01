import { create } from 'zustand';
import { me, login, register, logout } from '@/shared/services/auth';

type User = { id: number; fullName: string; email: string };

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  fetchUser: () => Promise<void>;
  signIn:  (d:{email:string,password:string}) => Promise<void>;
  signUp:  (d:{fullName:string,email:string,password:string}) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  async fetchUser() {
    try {
      set({ loading: true });
      const user = await me();
      set({ user });
    } finally {
      set({ loading: false });
    }
  },

  async signIn(data) {
    set({ loading: true, error: null });
    try {
      const user = await login(data);
      set({ user });
    } catch (e:any) {
      set({ error: e.response?.data?.message || 'Ошибка входа' });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  async signUp(data) {
    set({ loading: true, error: null });
    try {
      const user = await register(data);
      set({ user });
    } catch (e:any) {
      set({ error: e.response?.data?.message || 'Ошибка регистрации' });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  async signOut() {
    await logout();
    set({ user: null });
  },
}));
