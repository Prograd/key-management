import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashedPassword: string;

  @Column()
  salt: string;

  @ManyToMany(type => User, user => user.passwords)
  users: User[];
}
