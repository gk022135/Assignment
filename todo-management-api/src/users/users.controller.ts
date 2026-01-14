import {
  Controller,
  Get,
  Patch,
  Delete,
  Req,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/enums/role.enum';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@Req() req) {
    const user = await this.usersService.findById(req.user.userId);
    return {
      id: user!._id,
      name: user!.name,
      email: user!.email,
      role: user!.role,
    };
  }

  @Patch('me')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateById(
      req.user.userId,
      updateUserDto,
    );
    return {
      id: user!._id,
      name: user!.name,
      email: user!.email,
      role: user!.role,
    };
  }

  @Delete('me')
  async deleteMe(@Req() req) {
    const user = await this.usersService.softDeleteById(req.user.userId);
    return {
      message: 'User deleted successfully',
      user: {
        id: user!._id,
        name: user!.name,
        email: user!.email,
        role: user!.role,
      },
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isDeleted: user.isDeleted,
    }));
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.adminUpdateUser(id, updateUserDto);
    return {
      id: user!._id,
      name: user!.name,
      email: user!.email,
      role: user!.role,
    };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.adminDeleteUser(id);
    return {
      message: 'User deleted successfully',
      user: {
        id: user!._id,
        name: user!.name,
        email: user!.email,
        role: user!.role,
      },
    };
  }
}
