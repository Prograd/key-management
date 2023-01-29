import {Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getPasswords(userId: number): Promise<string[]> {
    const user = await this.userRepository.findOneBy({
      userId,
    });
    return user.passwords;
  }

  async addPassword(plainTextPassword: string, userId: number) {
    const user = await this.userRepository.findOneBy({
      userId,
    });
    user.passwords = user.passwords ?  [...user.passwords, plainTextPassword] : [plainTextPassword];
    await this.userRepository.save(user);
  }
}
