import {Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {Password} from "./password.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  async getPasswords(id: number): Promise<Password[]> {
    const passwords = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.passwords', 'password')
      .where('user.userId = :id', {id})
      .getOne();

    return passwords.passwords;
  }

  async addPassword(plainTextPassword: string, user: User) {
    const password = new Password();
    password.hashedPassword = await this.hashPassword(plainTextPassword);
    password.salt = await this.generateSalt();
    password.users.push(user);
    user.passwords.push(password);
    await this.userRepository.save(user);
  }
}
