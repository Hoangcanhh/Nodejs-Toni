import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { BooksDto } from './books.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: BooksRepository,
  ) {}

  async findAll(): Promise<Books[]> {
    return this.booksRepository.findAll();
  }

  async findOne(id: number): Promise<Books | undefined> {
    return this.booksRepository.findOne(id);
  }

  async create(books: Books): Promise<Books> {
    return this.booksRepository.create(books);
  }

  async update(id: number, book: BooksDto): Promise<Books | undefined> {
    const existingBook = await this.booksRepository.findOne(id);
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.booksRepository.update(id, book);
    return this.booksRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const existingBook = await this.booksRepository.findOne(id);
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.booksRepository.delete(id);
  }
}
