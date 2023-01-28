import {Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {Password} from "./password.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,
  ) {}

  async getPasswords(id: number): Promise<Password[]> {
    console.log(id);
    const user = await this.userRepository.findOneBy({userId: id});
    return user.passwords;
  }

  async addPassword(plainTextPassword: { password:string }, authenticatedUser: { userId: number }) {
    const user = await this.userRepository.findOneBy({
      userId: authenticatedUser.userId
    });
    console.log(plainTextPassword);
    const password = await this.passwordRepository.save({
      hashedPassword: plainTextPassword.password,
      user: user
    });
    user.passwords = user.passwords ?  [...user.passwords, password] : [password];
    await this.userRepository.save(user);
  }
}
