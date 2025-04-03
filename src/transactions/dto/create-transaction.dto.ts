import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";

enum ReservationType {
    borrow = 'borrow',
    return = 'return',
}

export class CreateTransactionDto {
    @IsOptional()
    @IsNumber()
    user_id: number;

    @IsOptional()
     @IsNumber()
    member_id: number;

    @IsOptional()
    @IsNumber()
    book_id: number;

    @IsDate()
    transactionDate: Date;

    @IsEnum(ReservationType)
    type: ReservationType;
}
