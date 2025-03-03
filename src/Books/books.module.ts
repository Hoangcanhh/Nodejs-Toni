import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { BooksRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksService, BooksRepository],
})
export class BooksModule {}
