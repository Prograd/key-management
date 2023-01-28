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
  async addPassword(@Body() plainTextPassword: string, @Request() req) {
    return this.passwordService.addPassword(plainTextPassword, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('passwords')
  async getPasswords(@Request() req) {
    return this.passwordService.getPasswords(req.user);
  }
}
