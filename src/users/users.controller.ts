import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { Users } from './users.entity';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('/usersid')
  findOne(username: string): Promise<UserDto | undefined> {
    return this.usersService.findOne(username);
  }

  @Post('/createUsers')
  create(@Body() UserDto: UserDto): Promise<UserDto> {
    return this.usersService.create(UserDto);
  }

  @Patch('/usersid')
  update(
    userid: number,
    @Body() UserDto: UserDto,
  ): Promise<UserDto | undefined> {
    return this.usersService.update(userid, UserDto);
  }

  @Post('/validateUser')
  validateUser(username: string, pass: string): Promise<any> {
    return this.usersService.validateUser(username, pass);
  }
}
