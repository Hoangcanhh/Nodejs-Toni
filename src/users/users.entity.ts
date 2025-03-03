import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
