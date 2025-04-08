import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Payload } from 'src/interfaces/payload';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: Payload) {
    createTransactionDto.user_id = req.payload.user_id;
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(@Req() req: Payload) {
    return this.transactionsService.findAll(req.payload.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Payload) {
    return this.transactionsService.findOne(+id, req.payload.user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Payload) {
    return this.transactionsService.remove(+id, req.payload.user_id);
  }
}
