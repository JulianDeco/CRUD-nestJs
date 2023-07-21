import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBooks(): Promise<Book[]>{
        return this.bookService.findAll()
    }

    @Post()
    async createBook(@Body() createBookDto: any) {
        // Suponiendo que los datos del libro se envían en el cuerpo de la solicitud
        const { title, description, author, price, category } = createBookDto;
        return this.bookService.createBook(title, description, author, price, category);
      }
}
