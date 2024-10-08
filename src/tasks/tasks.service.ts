import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(roomId: number, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...createTaskDto, roomId: roomId },
    });
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id: id,
      },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
}
