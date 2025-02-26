import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { usersService } from "./users.service";
import { Users } from "./users.entity";
import { UsersDto } from "./users.dto";

@Controller()
export class usersController {
    constructor(private readonly usersService : usersService) {}

    @Get()
    findAll(): Promise<Users[]>{
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(name : string): Promise<Users | undefined>{
        return this.usersService.findOne(name);
    }

    @Post()
    create(@Body() UsersDto : UsersDto){
        return this.usersService.create(UsersDto);{
    }

}
}