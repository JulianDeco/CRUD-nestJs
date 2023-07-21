import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBooks(): Promise<Book[]>{
        return this.bookService.findAll()
    }

    @Post()
    async createBook(@Body() book: CreateBookDto):Promise<Book> {
        // Suponiendo que los datos del libro se envían en el cuerpo de la solicitud
        const newBook = this.bookService.createBook( book )
        console.log(newBook)
        return newBook;
      }
    
    @Get(':id')
      async getBook(
        @Param('id')
        id: string
      ): Promise<Book>{
          return this.bookService.findById(id)
      }

    @Put(':id')
    async putBook(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDto
      ):Promise<Book> {
          // Suponiendo que los datos del libro se envían en el cuerpo de la solicitud
          const newBook = this.bookService.updateById( id, book )
          return newBook;
        }
}
