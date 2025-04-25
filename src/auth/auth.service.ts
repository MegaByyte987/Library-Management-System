import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import {
  RegisterBookDto,
  RegisterMemberDto,
  RegisterTransactionDto,
  RegisterUserDto,
} from './dto/register.dto';
import { MembersService } from 'src/members/members.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { BooksService } from 'src/books/books.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
    private readonly membersService: MembersService,
    private readonly booksService: BooksService,
    private readonly transactionsService: TransactionsService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterUserDto) {
    try {
      const user = await this.usersService.create(registerDto);
      const token = await this.jwtService.signAsync(user);
      console.log('Received body:', registerDto); // Log the received data
      return { token };
    } catch (error) {
      console.error('Error in registration:', error);
      throw error; // This will help you see detailed errors in the console
    }
  }

  async registerMember(registerDto: RegisterMemberDto) {
    const member = await this.membersService.create(registerDto);
    const token = await this.jwtService.signAsync(member);
    return { token };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: loginUserDto.username,
          },
          {
            mobile: loginUserDto.username,
          },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException('Unable to find user');
    }

    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    const token = await this.jwtService.signAsync(user);
    return { token };
  }

  async registerBook(registerBookDto: RegisterBookDto) {
    const book = await this.booksService.create(registerBookDto);
    const token = await this.jwtService.signAsync(book);
    return { token };
  }

  async registerTransaction(registerTransactionDto: RegisterTransactionDto) {
    const transaction = await this.transactionsService.create(
      registerTransactionDto,
    );
    const token = await this.jwtService.signAsync(transaction);
    return { token };
  }
}
