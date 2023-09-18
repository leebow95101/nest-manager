import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return (await this.userRepository.insert({ ...createUserDto }))?.generatedMaps[0];
    } catch (e) {
      throw new HttpException('创建用户失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async find(id: number) {
    try {
      const data = await this.userRepository.findOneBy({ id });
      if (!data) {
        throw new HttpException('未查询到该用户', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (e) {
      console.error(e)
      throw new HttpException(e.message || '查询用户失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll(): Promise<User[] | []> {
    return this.userRepository.find();
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.id) {
        return await this.userRepository.update(+updateUserDto.id, { ...updateUserDto });
      }
    } catch (e) {
      throw new HttpException(e.message || '修改用户失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id: number) {
    try {
      await this.userRepository.delete(id);
      return null;
    } catch (e) {
      console.error(e)
      throw new HttpException(e.message || '删除用户失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
