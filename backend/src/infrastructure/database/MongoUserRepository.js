import { UserRepository } from '../../domain/repositories/UserRepository.js';
import UserModel from './models/UserSchema.js';

export class MongoUserRepository extends UserRepository {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id).select('-password');
  }

  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }
}