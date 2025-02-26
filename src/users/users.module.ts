import { Module } from "@nestjs/common";
import { usersController } from "./users.controller";
import { usersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";

@Module(
    {
        imports: [TypeOrmModule.forFeature([Users])],
        controllers: [usersController],
        providers: [usersService],
        exports: [usersService]
    }
)

export class usersModule { }