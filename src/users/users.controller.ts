import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('/usersid')
  findOne(userName: string): Promise<UserDto | undefined> {
    return this.usersService.findOne(userName);
  }

  @Post('/createUsers')
  create(@Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.create(userDto);
  }

  @Patch('/updateUsers')
  update(
    userid: number,
    @Body() userDto: UserDto,
  ): Promise<UserDto | undefined> {
    return this.usersService.update(userid, userDto);
  }
}
