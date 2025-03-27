import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  createUser(todoDto: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.save(todoDto);
  }

  updateUser(id: number, todoDto: Partial<UserEntity>): Promise<UpdateResult> {
    return this.userRepository.update(id, todoDto);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
