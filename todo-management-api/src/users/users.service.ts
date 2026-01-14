import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async create(data: any) {
    return this.model.create(data);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async findAll() {
    return this.model.find({ isDeleted: false });
  }

  async updateById(id: string, updateDto: UpdateUserDto) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }

    return this.model.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async softDeleteById(id: string) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async adminUpdateUser(id: string, updateDto: UpdateUserDto) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }

    return this.model.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async adminDeleteUser(id: string) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
}
