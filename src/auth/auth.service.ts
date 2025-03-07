import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(username: string, pass: string):  Promise<Omit<UserDto, 'password'> | null> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
  async login(user: any): Promise<{ access_token: string }> {
    //validate user
    const existingUser = await this.userService.findOneByUsername(user.username);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const payload ={ userid: user.userid, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(user: any): Promise<any> {
    const existingUser = await this.userService.findOneByUsername(user.username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.userService.create(user);
  }
}
