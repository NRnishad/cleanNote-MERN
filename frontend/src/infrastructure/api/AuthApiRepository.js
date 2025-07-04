import { AuthRepository } from '../../domain/repositories/AuthRepository';
import api from '../../lib/axios';

export class AuthApiRepository extends AuthRepository {
  async login({ email, password }) {
    const { data } = await api.post('/users/login', { email, password });
    return data;
  }
  async register({ name, email, password }) {
    const { data } = await api.post('/users/register', { name, email, password });
    return data;
  }
  async logout() {
    await api.post('/users/logout');
  }
  async checkAuthStatus() {
    const { data } = await api.get('/users/me');
    return data;
  }
}