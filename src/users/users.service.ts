import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const isGuest = !createUserDto.email && !createUserDto.password;
    const role = isGuest ? UserRole.GUEST : UserRole.PARTICIPANT;

    if (!isGuest) {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    return this.prisma.user.create({
      data: { ...createUserDto, role },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
