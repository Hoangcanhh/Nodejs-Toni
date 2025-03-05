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

  async findOneUser(username: string): Promise<UserDto | undefined> {
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

  async updateUser(
    userid: number,
    UserDto: UserDto,
  ): Promise<UserDto | undefined> {
    await this.userRepository.update(userid, UserDto);
    return this.userRepository.findOne({
      where: { username: UserDto.username },
    });
  }
}
