import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from "./password.service";
import {Password} from "./password.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Password])],
  providers: [UsersService, PasswordService],
  exports: [UsersService, PasswordService],
  controllers: [],
})
export class UsersModule {}
