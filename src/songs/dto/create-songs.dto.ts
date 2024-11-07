import { MinLength, IsEnum } from 'class-validator';

export class CreateSongsDto {
  @MinLength(3)
  name: string;

  @IsEnum(['Phnom penh', 'Sway Reang'], { message: 'use correct' })
  city: 'Phnom penh' | 'Sway Reang';
}
