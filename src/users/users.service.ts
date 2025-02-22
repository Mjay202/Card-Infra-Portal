import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { mapUserDataToResponse } from 'src/utils/map-user-data-to-response';
import { UserLoginCredentials, UserRecord } from 'src/common/types';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

  ) {}

  async create(userData: CreateUserDto) {
    
    const user = this.userRepository.create(userData);
    user.password = await argon2.hash(user.password);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[] | null> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return mapUserDataToResponse(user);
  }

  async findByUsername(username: string): Promise<UserRecord | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return mapUserDataToResponse(user);
  }


  async removeById(id: string) {
    await this.userRepository.delete({ id });
  }


  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
     if (!user) {
       throw new NotFoundException('User not found');
     }
     dto.email = dto.email || user.email;
     if (dto.password) {
       dto.password = await argon2.hash(user.password);
     } else {
       dto.password = user.password;
     }
     if (dto.name) {
       dto.name = dto.name;
     } else {
       dto.name = user.name;
     }

     Object.assign(user, dto);

     const updatedUser = await this.userRepository.save(user);
     const { password, ...safe } = updatedUser;
     return safe;

  }


  async getLoginCredentials(
    username: string,
  ): Promise<UserLoginCredentials | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      last_login: new Date,
      password: user.password,
    };
  }

  async checkIfUserExists(username: string): Promise<boolean | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user ? true : false;
  }
}
