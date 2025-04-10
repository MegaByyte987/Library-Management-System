import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [MembersModule, UsersModule, BooksModule, TransactionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
