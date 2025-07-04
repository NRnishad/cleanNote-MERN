export class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(userData) {
    const { name, email, password } = userData;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return this.userRepository.create({ name, email, password });
  }
}