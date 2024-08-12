import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { CreateVoteDto } from 'src/votes/dto/create-vote.dto';
import { VotesService } from 'src/votes/votes.service';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly votesService: VotesService,
    private readonly taskService: TasksService,
  ) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get('/user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.roomsService.findAllByUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Get(':roomId/tasks')
  findTasks(@Param('roomId') id: string) {
    return this.roomsService.findTasks(+id);
  }

  @Post(':roomId/tasks')
  createTask(@Param('roomId') roomId: string, @Body() createTaskDto: any) {
    return this.taskService.create(+roomId, createTaskDto);
  }

  @Post(':roomId/tasks/:taskId/votes')
  createVote(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
    @Body() createVoteDto: CreateVoteDto,
  ) {
    return this.votesService.create(+roomId, +taskId, createVoteDto);
  }
}
