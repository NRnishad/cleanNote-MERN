export class UserRepository {
  async findByEmail(email) {
    throw new Error("UserRepository.findByEmail() must be implemented");
  }
  async findById(id) {
    throw new Error("UserRepository.findById() must be implemented");
  }
  async create(user) {
    throw new Error("UserRepository.create() must be implemented");
  }
}