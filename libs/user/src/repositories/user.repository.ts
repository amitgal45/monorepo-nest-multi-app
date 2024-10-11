import { Repository } from 'typeorm';
import { User } from '../../../db/src/entities';

export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async createUser(
    email: string,
    password: string,
    authProvider?: string,
  ): Promise<User> {
    const user = this.create({ email, password, authProvider });
    return this.save(user);
  }
}
