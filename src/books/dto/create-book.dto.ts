import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  author: string;

  @IsOptional()
  quantity: number;

  @IsBoolean()
  availability: boolean;

  @IsNumber()
  user_id: number;
}
