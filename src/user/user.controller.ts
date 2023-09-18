import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as dayjs from 'dayjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const now = dayjs();
      return await this.userService.create({
        ...createUserDto,
        registered_time: now.format('YYYY-MM-DD HH:mm:ss')
      });
    } catch (e) {
      console.error(e)
      throw new HttpException('创建用户失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('get')
  async find(@Query('id') id: number): Promise<User> {
    if (!id) {
      throw new HttpException('id不能为空', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    try {
      console.log('id====', id, typeof id);
      return await this.userService.find(id);
    } catch (e) {
      console.error(e)
      throw new HttpException(e.message || '用户查询失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('list')
  async findAll(): Promise<User[] | []> {
    try {
      return await this.userService.findAll();
    } catch (e) {
      console.error(e)
      throw new HttpException('请求异常', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('update')
  async update(@Body() updateUserDto: UpdateUserDto) {
    if (!updateUserDto) {
      throw new HttpException('id不能为空', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    try {
      return await this.userService.update(updateUserDto);
    } catch (e) {
      console.error(e)
      throw new HttpException('请求异常', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('delete')
  async delete(@Body('id') id: number) {
    if (!id) {
      throw new HttpException('id不能为空', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    try {
      return await this.userService.delete(id);
    } catch (e) {
      throw new HttpException('请求异常', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
