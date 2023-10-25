import { IsString, MinLength } from 'class-validator';

export class CreateCommerceDto {
  @IsString()
  @MinLength(1)
  name: string;
}
