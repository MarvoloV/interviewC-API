import {
  IsEmail,
  IsIn,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import {
  IsAllowedEmailDomain,
  IsExpirationYear,
  IsLuhnValid,
} from '../utils/CustomValidator';
export class CreateTokenDto {
  // @Length(13, 16)
  @IsLuhnValid({ message: 'card_number is not valid' })
  card_number: number;

  @IsNumberString()
  @IsString()
  @Length(3, 4)
  cvv: string;

  @IsString()
  @IsIn(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
  expiration_month: string;

  @IsNumberString()
  @IsString()
  @IsExpirationYear({ message: 'enter a valid expiration date' })
  expiration_year: string;

  @IsEmail()
  @IsAllowedEmailDomain({
    message:
      'Only emails with the domains gmail.com, hotmail.com and yahoo.es are allowed',
  })
  email: string;
}
