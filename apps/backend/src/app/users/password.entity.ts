import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashedPassword: string;

  @ManyToOne(type => User, user => user.passwords)
  user: User;
}
