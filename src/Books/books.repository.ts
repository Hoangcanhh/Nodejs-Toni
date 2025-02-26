// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Books } from './books.entity'; 
// import { BooksDto } from './books.dto'; 

// @Injectable()
// export class BooksRepository {
//     constructor(
//         @InjectRepository(Books)
//         private booksRepository: Repository<Books>
//     ) {}

//     async findAll(): Promise<Books[]> {
//         return this.booksRepository.find();
//     }

//     async findOne(id: number): Promise<Books | undefined> {
//         return this.booksRepository.findOne({ where: { id } });
//     }

//     async create(bookDto: BooksDto): Promise<Books> {
//         const book = this.booksRepository.create(bookDto); // Tạo một thực thể từ DTO
//         return this.booksRepository.save(book);
//     }

//     async update(id: number, bookDto: BooksDto): Promise<Books | undefined> {
//         await this.booksRepository.update(id, bookDto);
//         return this.booksRepository.findOne({ where: { id } });
//     }

//     async delete(id: number): Promise<void> {
//         await this.booksRepository.delete(id);
//     }
// }