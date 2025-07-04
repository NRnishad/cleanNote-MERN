export class AuthRepository {
  async login(credentials) {
    throw new Error("AuthRepository.login must be implemented");
  }
  async register(userData) {
    throw new Error("AuthRepository.register must be implemented");
  }
  async logout() {
    throw new Error("AuthRepository.logout must be implemented");
  }
  async checkAuthStatus() {
    throw new Error("AuthRepository.checkAuthStatus must be implemented");
  }
}