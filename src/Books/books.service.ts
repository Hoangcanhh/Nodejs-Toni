import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Books } from "./books.entity";
import { BooksDto } from "./books.dto";

@Injectable()

export class BooksService {
    constructor(
        @InjectRepository(Books)
        private booksRepository: Repository<Books>
    ){}

    async findAll(): Promise<Books[]>{
        return this.booksRepository.find();
    }
    
    async findOne(id: number): Promise<Books | undefined>{
        return this.booksRepository.findOne({ where: { id } });
    }
    
    async create(book: Books): Promise<Books>{
        return this.booksRepository.create(book);
    }

    async update(id: number, book: BooksDto): Promise<Books | undefined>{
        await this.booksRepository.update(id, book);
        return this.booksRepository.findOne({where: {id}});
    }
    
    async delete(id: number): Promise<void>{
        await this.booksRepository.delete(id);
    }

}