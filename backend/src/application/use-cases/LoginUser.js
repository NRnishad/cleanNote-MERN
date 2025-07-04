export class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await user.matchPassword(password))) {
      return user;
    }
    throw new Error('Invalid email or password');
  }
}