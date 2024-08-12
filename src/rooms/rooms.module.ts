import { Module } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { VotesService } from 'src/votes/votes.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [PrismaModule],
  controllers: [RoomsController],
  providers: [RoomsService, VotesService, TasksService],
})
export class RoomsModule {}
