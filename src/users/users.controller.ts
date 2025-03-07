import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  findOne(@Param() userId: number): Promise<UserDto | undefined> {
    return this.usersService.findOneById(userId);
  }

  @Post('/create-users')
  create(@Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.create(userDto);
  }

  @Patch('/update-users')
  update(
    @Param() userId: number,
    @Body() users : Users
  ): Promise<UserDto | undefined> {
    return this.usersService.update(userId, users);
  }

  @Delete('/delete-users')
  delete(@Body('userid') userId: number): Promise<UserDto | undefined> {
    return this.usersService.delete(userId);
  }
}
