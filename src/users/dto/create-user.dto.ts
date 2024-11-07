import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
// $ npm i --save class-validator class-transformer {Class Validate}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'INGINEER', 'ADMIN'], {
    message: 'Vlid role required',
  })
  role: 'INTERN' | 'INGINEER' | 'ADMIN';
}
