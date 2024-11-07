import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // =========================================================>

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // create(
  //   @Body()
  //   user: {
  //     name: string;
  //     email: string;
  //     role: 'INTERN' | 'INGINEER' | 'ADMIN';
  //   },
  // ) {
  //   return this.usersService.create(user);
  // }

  // =========================================================>

  @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  findAll(@Query('role') role?: 'INTERN' | 'INGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }
  // =========================================================>
  @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  fineOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.fineOne(id);
  }

  // =========================================================>
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body()
  //   userUpdate: {
  //     name?: string;
  //     email?: string;
  //     role?: 'INTERN' | 'INGINEER' | 'ADMIN';
  //   },
  // ) {
  //   return this.usersService.update(id, userUpdate);
  // }
  // =========================================================>
  @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
// =========================================================>
