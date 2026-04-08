import { IsDateString, IsInt, IsString, Max, Min } from 'class-validator';

export class CreatePromoCodeDto {
  @IsString()
  code: string;

  @IsInt()
  @Min(1)
  @Max(100)
  discount: number;

  @IsInt()
  @Min(1)
  activationLimit: number;

  @IsDateString()
  expiresAt: string;
}
