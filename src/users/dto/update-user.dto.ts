import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto'; // npm i @nestjs/mapped-types -D

export class UpdateUserDto extends PartialType(CreateUserDto) {}
