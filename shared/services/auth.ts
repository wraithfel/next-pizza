import { axiosInstance } from './instance';

export const me       = () => axiosInstance.get('auth/me').then(r => r.data);
export const login    = (d:{email:string,password:string})  => axiosInstance.post('auth/login', d).then(r=>r.data);
export const register = (d:{fullName:string,email:string,password:string}) => axiosInstance.post('auth/register', d).then(r=>r.data);
export const logout   = () => axiosInstance.post('auth/logout').then(()=>true);
