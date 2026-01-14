import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private model: Model<Todo>) {}

  async create(userId: string, createTodoDto: CreateTodoDto) {
    return this.model.create({
      ...createTodoDto,
      userId,
    });
  }

  async findMyTodos(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const todos = await this.model.find({ userId }).skip(skip).limit(limit);
    const total = await this.model.countDocuments({ userId });

    return {
      data: todos,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async updateTodo(
    id: string,
    userId: string,
    updateTodoDto: UpdateTodoDto,
  ) {
    const todo = await this.model.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (todo.userId.toString() !== userId) {
      throw new ForbiddenException('You can only update your own todos');
    }

    return this.model.findByIdAndUpdate(id, updateTodoDto, { new: true });
  }

  async deleteTodo(id: string, userId: string) {
    const todo = await this.model.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (todo.userId.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own todos');
    }

    return this.model.findByIdAndDelete(id);
  }
}
