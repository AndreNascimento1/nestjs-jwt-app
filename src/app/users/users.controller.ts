import { Controller, Delete, Get, Post, Put, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {

    constructor( private readonly usersServices: UsersService) {}

    @Get()
    async index() {
        return await this.usersServices.findAll()
    }

    @Post()
    async store(@Body() body: CreateUserDto) {
        return await this.usersServices.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string ) {
        return await this.usersServices.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.usersServices.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.usersServices.destroy(id);
    }
}
