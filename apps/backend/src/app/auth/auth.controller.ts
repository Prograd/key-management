import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {UserDto} from "./userDto";
import {PasswordService} from "../users/password.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private  passwordService: PasswordService) {}

  @Post('register')
  async register(@Body() body: UserDto) {
    return this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('password')
  async addPassword(@Body() body: { password:string, userId: number }) {
    return this.passwordService.addPassword(body.password, body .userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('passwords')
  async getPasswords(@Body() body: { userId: number }) {
    return this.passwordService.getPasswords(body.userId);
  }
}
