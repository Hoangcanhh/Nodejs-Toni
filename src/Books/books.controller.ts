import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './books.dto';
import { Books } from './books.entity';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { time } from 'console';
import { title } from 'process';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBook: Books) {
    return this.booksService.create(createBook);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(title);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBook: BooksDto) {
    return this.booksService.update(id, updateBook);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
}
