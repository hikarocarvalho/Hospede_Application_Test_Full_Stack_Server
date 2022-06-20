import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

  create(createUserDto: CreateUserDto) : Promise <User> {
    return this.prisma.dbUsers.create({
      data: createUserDto,
    }).catch(error=>error);
  }

  findAll() : Promise <User[]> {
    return this.prisma.dbUsers.findMany({
      where:{
        deleted_at: null
      }
    }).catch(error=>error);
  }

  findOne(id: number) : Promise <User> {
    return this.prisma.dbUsers.findUnique({
      select:{
        deleted_at: null,
      },
      where:{
        id,
      }
    }).catch(error=>error);
  }

  update(id: number, updateUserDto: UpdateUserDto) : Promise <User>{
    return this.prisma.dbUsers.update({
      data:{
        ...updateUserDto,
        updated_at: new Date(),
      },
      where:{
        id
      }
    }).catch(error=>error);
  }

  remove(id: number) : Promise <User>{
    return this.prisma.dbUsers.update({
      data:{
        deleted_at: new Date(),
      },
      where:{
        id
      }
    }).catch(error=> error);
  }
}
