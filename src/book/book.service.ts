import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, Category } from './schemas/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'
@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(query: Query): Promise<Book[]>{

        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options : 'i'
            } 
        } : {}

        const books = await this.bookModel.find({ ...keyword }).limit(resPerPage).skip(skip)
        return books
    }

    async createBook( book: Book ): Promise<Book> {
        try {
            const newBook = await this.bookModel.create(book);
            return newBook
        }
        catch (error){
            throw new HttpException('Body incorrecto', HttpStatus.BAD_REQUEST)
        }
      }

    async findById( id: string ): Promise<Book> {
        const newBook = await this.bookModel.findById(id);
        
        if(!newBook) {
            throw new NotFoundException('Book not found')
        }
        return newBook;
      }
    
    async updateById( id: string, book: Book ): Promise<Book> {
        
        try {
            const newBook = await this.bookModel.findByIdAndUpdate(id, book, {
                new: true,
                runValidators: true
            });
            return newBook
        }
        catch {
            throw new HttpException('Id incorrecto o body incorrecto.', HttpStatus.BAD_REQUEST)
        }
      }

      async deleteById(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id)
      }
}
