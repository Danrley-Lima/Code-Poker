import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { TasksModule } from './tasks/tasks.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [PrismaModule, UsersModule, RoomsModule, TasksModule, VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
