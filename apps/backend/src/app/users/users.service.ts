import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({
      username: username
    });
  }

  async add(user: { password: string; username: string }): Promise<void> {
    await this.usersRepository.save({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    });
  }

  async isPasswordMatch(user: User, password: string): Promise<boolean> {
    const userFromDb = await this.findOne(user.username);
    return bcrypt.compareSync(password, userFromDb.password);
  }
}
