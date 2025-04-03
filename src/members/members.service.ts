import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Member } from '@prisma/client';
import { hash } from 'bcrypt';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createMemberDto: CreateMemberDto) {
    let member=await this.prisma.member.findUnique({
      where: {
        email: createMemberDto.email,
      },
    });
    if(member){
      throw new BadRequestException('This member is already registered');
    }

    member =await this.prisma.member.findUnique({
      where: {
        mobile: createMemberDto.mobile,
      },
    });
    if(member){
      throw new BadRequestException('This member is already registered');
    }

    createMemberDto.password = await hash(createMemberDto.password,10); //hashes the password 10 times

    return this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async findAll() {
    return this.prisma.member.findMany();
  }

  async findOne(id: number) {
    const member = await this.prisma.member.findUnique({
      where: { id },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    let member: Member | null;
    await this.findOne(id);

    if(updateMemberDto.email){
      member = await this.prisma.member.findUnique({
        where: {email: updateMemberDto.email},
      });
      if(member && member.id!=id){
        throw new BadRequestException('This member is already registered')
      }
    }
    if(updateMemberDto.mobile){
      member = await this.prisma.member.findUnique({
        where: {mobile: updateMemberDto.mobile},
      });
      if(member && member.id!=id){
        throw new BadRequestException('This mobile is already registered')
      }
    }
    if(updateMemberDto.password){
        updateMemberDto.password = await hash(updateMemberDto.password,10);
    }

    return this.prisma.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.member.delete({
      where: { id },
    });
  }
}