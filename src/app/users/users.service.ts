import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinishedOptions } from 'stream';
import { Repository  } from 'typeorm';

import { UsersEntity } from './users.entity';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ){}

    async findAll() {
        return await this.usersRepository.find({
            select: ['id', 'firstName', 'lastName']
        })
    }

    async findOne(id: string) {
        return await this.usersRepository.findOne({
                where: {
                    id: id
                }
            }
         );
    }

    async store(data: CreateUserDto) {
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOne( id );
        this.usersRepository.merge(user, data);

        return await this.usersRepository.save(user);
    }

    async destroy(id: string) {
        await this.usersRepository.findOne({
            where: {
                id: id
            }
        }
        );
        this.usersRepository.softDelete(id);
    }
}
