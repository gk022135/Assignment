import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
@UseGuards(JwtGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const todo = await this.todosService.create(req.user.userId, createTodoDto);
    return {
      message: 'Todo created successfully',
      todo: {
        id: todo._id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      },
    };
  }

  @Get()
  async getMine(
    @Req() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.todosService.findMyTodos(
      req.user.userId,
      Number(page),
      Number(limit),
    );
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
  ) {
    const todo = await this.todosService.updateTodo(
      id,
      req.user.userId,
      updateTodoDto,
    );
    return {
      message: 'Todo updated successfully',
      todo: {
        id: todo!._id,
        title: todo!.title,
        completed: todo!.completed,
        userId: todo!.userId,
      },
    };
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Req() req) {
    const todo = await this.todosService.deleteTodo(id, req.user.userId);
    return {
      message: 'Todo deleted successfully',
      todo: {
        id: todo!._id,
        title: todo!.title,
        completed: todo!.completed,
        userId: todo!.userId,
      },
    };
  }
}
