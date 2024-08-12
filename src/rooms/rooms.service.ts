import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    let roomCode: string;
    let roomExists = true;

    // Verifica se existe alguma room com o código gerado
    while (roomExists) {
      roomCode = this.generateRoomCode();
      const existingRoom = await this.prisma.room.findUnique({
        where: {
          roomCode: roomCode,
        },
      });
      roomExists = !!existingRoom;
    }

    return this.prisma.room.create({
      data: { ...createRoomDto, roomCode },
    });
  }

  async findOne(id: number) {
    return this.prisma.room.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.room.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.prisma.room.update({
      where: {
        id,
      },
      data: updateRoomDto,
    });
  }

  async remove(id: number) {
    return this.prisma.room.delete({
      where: {
        id,
      },
    });
  }

  async findTasks(roomsId: number) {
    return this.prisma.task.findMany({
      where: {
        roomId: roomsId,
      },
    });
  }

  private generateRoomCode(length: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let roomCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      roomCode += characters[randomIndex];
    }
    return roomCode;
  }
}
