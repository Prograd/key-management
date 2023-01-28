import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {Password} from "./password.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(type => Password, password => password.users)
  @JoinTable()
  passwords: Password[];
}
