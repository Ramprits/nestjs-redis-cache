import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
  }
  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto).save()
  }

  async findAll(): Promise<User[]> {
    try {
      let users = await this.getUsersFromCache();
      if (!users) {
        users = await this.getUsersFromRepository();
        await this.cacheUsers(users);
      }
      return users;
    } catch (error) {
      // Handle or log the error
      throw error; // Rethrow the error or return a default value
    }
  }

  async getUsersFromCache(): Promise<User[] | null> {
    try {
      return await this.cacheManager.get<User[]>('users_key');
    } catch (error) {
      // Handle or log the error
      throw error; // Rethrow the error or return a default value
    }
  }

  async getUsersFromRepository(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      // Handle or log the error
      throw error; // Rethrow the error or return a default value
    }
  }

  async cacheUsers(users: User[]): Promise<void> {
    try {
      await this.cacheManager.set('users_key', users, 1800);
    } catch (error) {
      // Handle or log the error
      throw new BadRequestException(error.message); // Rethrow the error or return a default value
    }
  }


  findOne(id: string) {
    return this.userRepository.findOne({ where: { user_id: id } })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: string) {
    return this.userRepository.delete(id)
  }
}
