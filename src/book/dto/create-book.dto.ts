import { Category } from "../schemas/book.schema"
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    author: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;
}