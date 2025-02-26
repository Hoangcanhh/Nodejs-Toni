import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { UsersDto } from "./users.dto";
import * as bcrypt from 'bcrypt';
export type User = any;

@Injectable()
export class usersService {
    
    private readonly users = [
        {
          userid: 1,
          username: 'toni',
          email: 'toni@gmail.com',
          password: '123456',
        },
      ];
    constructor (
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ){}

    async findAll(): Promise<Users[]>{
        return this.usersRepository.find();
    }
    
    async findOne(username: string): Promise<Users | undefined>{
        return this.users.find(user => user.username === username);
    }
     
    async create(UsersDto: UsersDto): Promise<Users>{
        const hashedPassword = await bcrypt.hash(UsersDto.password, 10);
        const user = this.usersRepository.create({
            ...UsersDto,
            password: hashedPassword
        })
        return this.usersRepository.save(user);
    }

    
}
