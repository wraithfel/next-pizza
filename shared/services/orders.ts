import { axiosInstance } from './instance';

export const create = (payload: {
  fullName: string;
  phone: string;
  address: string;
  comment?: string;
}) => axiosInstance.post('/orders', payload).then(r => r.data);
