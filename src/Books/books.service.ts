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
import { title } from 'process';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async findAll(): Promise<Books[]> {
    return this.booksRepository.findAll();
  }

  async findOne(title: string): Promise<BooksDto | undefined> {
    return this.booksRepository.findOne(title);
  }

  async create(books: BooksDto): Promise<BooksDto | undefined> {
    return this.booksRepository.create(books);
  }

  async update(id: number, book: BooksDto): Promise<BooksDto | undefined> {
    const existingBook = await this.booksRepository.findOne(title);
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    if (existingBook.author !== book.author) {
      throw new ForbiddenException(
        `You do not have permission to delete this book`,
      );
    }
    await this.booksRepository.update(id, book);
    return this.booksRepository.findOne(title);
  }

  async delete(title: string, author: string): Promise<BooksDto | undefined> {
    const existingBook = await this.booksRepository.findOne(title);
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${title} not found`);
    }
    if (existingBook.author !== author) {
      throw new ForbiddenException(
        `You do not have permission to delete this book`,
      );
    }
    await this.booksRepository.delete(title);
    return undefined;
  }
}
