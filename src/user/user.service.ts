import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { UserEntity } from './user.entity';
import { BcryptService } from '@common/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
  ) {}

  findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByParams(params: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(params);
  }

  async createUser(userDto: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({
      username: userDto.username,
    });

    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }

    const password = await this.bcryptService.hashPassword(
      userDto.password as string,
    );
    const user = this.userRepository.create({
      ...userDto,
      password,
    });

    return this.userRepository.save(user);
  }

  updateUser(id: number, userDto: Partial<UserEntity>): Promise<UpdateResult> {
    return this.userRepository.update(id, userDto);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
