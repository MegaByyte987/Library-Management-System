import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterUserDto extends CreateUserDto {}
export class RegisterMemberDto extends CreateMemberDto {}
export class RegisterBookDto extends CreateBookDto {}
export class RegisterTransactionDto extends CreateTransactionDto {}
