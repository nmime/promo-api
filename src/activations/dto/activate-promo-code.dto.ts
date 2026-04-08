import { IsEmail, IsString } from 'class-validator';

export class ActivatePromoCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
