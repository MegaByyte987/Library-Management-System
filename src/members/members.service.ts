import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, Member } from '@prisma/client';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createMemberDto: CreateMemberDto) {
    let member = await this.prisma.member.findUnique({
      where: {
        email: createMemberDto.email,
      },
    });
    if (member) {
      throw new BadRequestException('This member is already registered');
    }

    member = await this.prisma.member.findUnique({
      where: {
        mobile: createMemberDto.mobile,
      },
    });
    if (member) {
      throw new BadRequestException('This member is already registered');
    }

    return this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async findAll(user_id: number) {
    return this.prisma.member.findMany();
  }

  async findOne(id: number, user_id: number) {
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
    await this.findOne(id, updateMemberDto.user_id as number);

    if (updateMemberDto.email) {
      member = await this.prisma.member.findUnique({
        where: { email: updateMemberDto.email },
      });
      if (member && member.id != id) {
        throw new BadRequestException('This member is already registered');
      }
    }
    if (updateMemberDto.mobile) {
      member = await this.prisma.member.findUnique({
        where: { mobile: updateMemberDto.mobile },
      });
      if (member && member.id != id) {
        throw new BadRequestException('This mobile is already registered');
      }
    }

    return this.prisma.member.update({
      where: { id, user_id: updateMemberDto.user_id },
      data: updateMemberDto,
    });
  }

  async remove(id: number, user_id: number) {
    await this.findOne(id, user_id);
    return this.prisma.member.delete({
      where: { id, user_id },
    });
  }
}
