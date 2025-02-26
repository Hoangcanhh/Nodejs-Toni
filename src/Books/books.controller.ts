import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./books.dto";
import { Books } from "./books.entity";


@Controller("books")
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    create(@Body() createBook: Books) {
    return this.booksService.create(createBook);
    }

    @Get()
    findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.booksService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateBook: BooksDto) {
        return this.booksService.update(id, updateBook);
    }
    
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.booksService.delete(id);
    }

}
