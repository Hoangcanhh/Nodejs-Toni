import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class BooksDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsInt()
    @IsNotEmpty()
    publicationYear: number;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean;
}