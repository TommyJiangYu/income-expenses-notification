import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser, UpdateUser } from './types/user.type';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(userInfo: CreateUser) {
    const user = this.repo.create({
      name: userInfo.name,
      line_user_id: userInfo.lineUserId,
    });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async find() {
    return this.repo.find();
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }

  async findByUserLineId(userLineId: string) {
    return this.repo.findOne({ where: { line_user_id: userLineId } });
  }

  async update(newUserInfo: UpdateUser) {
    const user = await this.findOne(newUserInfo.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, newUserInfo);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
}
