import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAllUsers();
  }

  async findOneById(userId: number): Promise<UserDto | undefined> {
    return this.userRepository.findUserById(userId);
  }
  async findOneByUsername(username: string): Promise<UserDto | undefined> {
    return this.userRepository.findUserByUsername(username);
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(userDto.password)) {
      throw new Error(
        'Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters.',
      );
    }
    await this.userRepository.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.userRepository.createUser(userDto);
  }
  //delete user
  async delete(userId: number): Promise<UserDto | undefined> {
    const findUser = await this.userRepository.findUserById(userId);
    if (!findUser) {
      throw new Error('User not found');
    }
    return this.userRepository.deleteUser(userId);
  }

  async update(id: number, user: UserDto): Promise<UserDto | undefined> {
    //validate user
    const findUser = await this.userRepository.findUserById(id);
    if (!findUser) {
      throw new Error('User not found');
    }
    //check userName
    const existingUser = await this.userRepository.findUserByUsername(
      user.username,
    );
    if (existingUser && existingUser.username !== user.username) {
      throw new Error('username already exists');
    }
    //validate password, The condition to enter the world password is to have uppercase letters, lowercase letters, numbers and special characters.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      throw new Error(
        'Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters.',
      );
    }
    return this.userRepository.updateUser(id, user);
  }
}
