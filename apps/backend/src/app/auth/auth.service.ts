import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "./userDto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isPasswordMatch = user && await this.usersService.isPasswordMatch(user, pass);
    if (user && isPasswordMatch) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string; password: string, id: number }) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserDto) {
    return this.usersService.add(user);
  }
}
