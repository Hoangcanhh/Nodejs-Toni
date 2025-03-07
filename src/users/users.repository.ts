import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findAllUsers() {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserDto | undefined> {
    return this.userRepository.findOne({ where: { userid: userId } });
  }

  async findUserByUsername(username: string): Promise<UserDto | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(UserDto: UserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findOne({
      where: { username: UserDto.username },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    return this.userRepository.save(UserDto);
  }
  //delete user
  async deleteUser(userId: number): Promise<UserDto | undefined> {
    const user = await this.userRepository.findOne({
      where: { userid: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(userId);
    return user;
  }

  async updateUser(id: number, user: UserDto): Promise<UserDto | undefined> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({
      where: { userid: id },
    });
  }
}
