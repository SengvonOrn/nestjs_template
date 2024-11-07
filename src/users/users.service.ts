import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'John Smitd',
      email: 'john.doe@example.com',
      role: 'INGINEER',
    },
    {
      id: 3,
      name: 'John Smitd',
      email: 'john.doe@example.com',
      role: 'ADMIN',
    },
  ];

  findAll(role: 'INTERN' | 'INGINEER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (roleArray.length === 0)
        throw new NotFoundException('User Role Not Found');
      return roleArray;
    }
    return this.users;
  }

  // =======================================================>
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  fineOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  // =======================================================>

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  create(createUserDto: CreateUserDto) {
    const UserID = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: UserID[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  // =======================================================>

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.fineOne(id);
  }
  // =======================================================>
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  delete(id: number) {
    const removedUser = this.fineOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
