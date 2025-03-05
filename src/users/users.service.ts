import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

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

  async update(userId: number, user: UserDto): Promise<UserDto | undefined> {
    //validate user
    const existingUser = await this.userRepository.findOneUser(user.username);
    if (!existingUser) {
      throw new Error('User not found');
    }
    return this.userRepository.updateUser(userId, user);
  }
}
