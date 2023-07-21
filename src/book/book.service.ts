import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, Category } from './schemas/book.schema';
import mongoose from 'mongoose';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(): Promise<Book[]>{
        const books = await this.bookModel.find()
        return books
    }

    async createBook(
        title: string,
        description: string,
        author: string,
        price: number,
        category: Category,
      ): Promise<Book> {
        const newBook = new this.bookModel({ title, description, author, price, category });
        return newBook.save();
      }
}
