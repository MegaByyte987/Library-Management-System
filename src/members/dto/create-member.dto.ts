import { IsString, IsNotEmpty, IsEmail, IsMobilePhone, IsOptional, IsNumber } from "class-validator";

export class CreateMemberDto {
    @IsOptional()
    @IsNumber()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  
    @IsString()
    mobile: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;
}
