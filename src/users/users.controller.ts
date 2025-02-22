import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Request() req) {
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string, @Request() req) {
    return this.userService.removeById(id);
  }


}
