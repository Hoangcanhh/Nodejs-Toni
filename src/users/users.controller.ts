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
  findOne(userId: number): Promise<UserDto | undefined> {
    return this.usersService.findOneById(userId);
  }

  @Post('/createUsers')
  create(@Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.create(userDto);
  }

  @Patch('/updateUsers')
  update(
    @Body() users : Users
  ): Promise<UserDto | undefined> {
    return this.usersService.update(users);
  }
}
