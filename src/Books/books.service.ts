import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { BooksDto } from './books.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async findAll(): Promise<Books[]> {
    return this.booksRepository.findAll();
  }

  async findOne(id: number): Promise<BooksDto | undefined> {
    return this.booksRepository.findOne(id);
  }

  async create(books: BooksDto): Promise<BooksDto | undefined> {
    return this.booksRepository.create(books);
  }

  async update(id: number, book: BooksDto): Promise<BooksDto | undefined> {
    const existingBook = await this.booksRepository.findOne(id);
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    if (existingBook.author !== book.author) {
      throw new ForbiddenException(
        `You do not have permission to delete this book`,
      );
    }
    await this.booksRepository.update(id, book);
    return this.booksRepository.findOne(id);
  }

  async delete(id: number, author: string): Promise<BooksDto | undefined> {
    const existingBook = await this.booksRepository.findOne(id);
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    if (existingBook.author !== author) {
      throw new ForbiddenException(
        `You do not have permission to delete this book`,
      );
    }
    await this.booksRepository.delete(id);
    return undefined;
  }
}
