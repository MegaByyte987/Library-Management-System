import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { MembersService } from 'src/members/members.service';
import { JwtModule } from '@nestjs/jwt';
import { BooksService } from 'src/books/books.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1h'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaClient,UsersService,MembersService,BooksService,TransactionsService],
})
export class AuthModule {}
