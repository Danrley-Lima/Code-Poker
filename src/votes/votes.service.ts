import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  async create(roomId: number, taskId: number, createVoteDto: CreateVoteDto) {
    const roomExists = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!roomExists) {
      throw new Error('Room not found');
    }

    const taskExists = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!taskExists) {
      throw new Error('Task not found in the specified room');
    }

    const existingVote = await this.prisma.vote.findFirst({
      where: {
        userId: createVoteDto.userId,
        taskId: taskId,
      },
    });

    if (existingVote) {
      throw new Error('User has already voted for this task');
    }

    return this.prisma.vote.create({
      data: {
        taskId: taskId,
        vote: createVoteDto.vote,
        userId: createVoteDto.userId,
      },
    });
  }

  private async updateVoteCount(taskId: number, points: number) {
    const existingVoteCount = await this.prisma.voteCount.findUnique({
      where: {
        id: taskId,
        points: points,
      },
    });

    if (existingVoteCount) {
      return this.prisma.voteCount.update({
        where: {
          id: existingVoteCount.id,
        },
        data: {
          count: existingVoteCount.count + 1,
        },
      });
    } else {
      await this.prisma.voteCount.create({
        data: {
          points: points,
          count: 1,
          task: {
            connect: {
              id: taskId,
            },
          },
        },
      });
    }
  }

  async getVoteCountByTask(taskId: number) {
    const taskExists = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!taskExists) {
      throw new Error('Task not found in the specified room');
    }

    return this.prisma.voteCount.findMany({
      where: {
        taskId: taskId,
      },
    });
  }

  findAll() {
    return `This action returns all votes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
