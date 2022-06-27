import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private userResultData = {
    id: true,
    userName: true,
    email: true,
    password: false,
    created_at: true,
    updated_at: true,
    deleted_at: true,
  };

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.dbUsers
      .create({
        select: this.userResultData,
        data: {
          ...createUserDto,
          password: await bcrypt.hash(createUserDto.password, 10),
        },
      })
      .catch(handleError);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.dbUsers.findMany({
      select: this.userResultData,
      where: {
        deleted_at: null,
      },
    });

    if (!users) {
      throw new NotFoundException('Any registered users');
    }

    return users;
  }
  async findOne(id: number): Promise<User> {
    const user = await this.prisma.dbUsers.findFirst({
      select: this.userResultData,
      where: {
        id: id,
        deleted_at: null,
      },
    });

    if (!user) {
      throw new NotFoundException('The user with id = ' + id + ' not found!');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const verifyUser = await this.prisma.dbUsers.findUnique({ where: { id } });
    if (!verifyUser) {
      throw new NotFoundException('The user with id = ' + id + ' not found!');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.dbUsers
      .update({
        select: this.userResultData,
        data: {
          ...updateUserDto,
          updated_at: new Date(),
        },
        where: {
          id,
        },
      })
      .catch(handleError);
  }

  async remove(id: number): Promise<User> {
    const verifyUser = await this.prisma.dbUsers.findUnique({ where: { id } });

    if (!verifyUser) {
      throw new NotFoundException('The user with id = ' + id + ' not found!');
    }

    return this.prisma.dbUsers.update({
      select: this.userResultData,
      data: {
        deleted_at: new Date(),
      },
      where: {
        id,
      },
    });
  }
}
