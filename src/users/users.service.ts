import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAllUsers();
  }

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.userRepository.findOneUser(username);
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    await this.userRepository.createUser({
        ...userDto,
        password: hashedPassword,
    });
    return this.userRepository.createUser(userDto);
  }

  async update(userId : number, user: UserDto): Promise<UserDto | undefined> {
    return this.userRepository.updateUser(userId, user);
  }

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneUser(userName);
    if (!user) {
      return null;
    }
    const match = await bcrypt.compare(pass, user.password);
    return match ? user : null;
  }
}
