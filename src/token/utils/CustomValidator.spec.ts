import { validate } from 'class-validator';
import {
  IsAllowedEmailDomain,
  IsExpirationYear,
  IsLuhnValid,
} from './CustomValidator';

describe('CustomValidator email', () => {
  class TestClass {
    @IsAllowedEmailDomain({
      message:
        'Only emails with the domains gmail.com, hotmail.com and yahoo.es are allowed',
    })
    email: string;
  }
  it('should return true when email domain is in allowedDomains list', async () => {
    const instance = new TestClass();
    instance.email = 'test@gmail.com';
    const errors = await validate(instance);
    expect(errors.length).toBe(0);
  });
  it('should disallow invalid email domains', async () => {
    const instance = new TestClass();
    instance.email = '';

    const errors = await validate(instance);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toEqual({
      isAllowedEmailDomain:
        'Only emails with the domains gmail.com, hotmail.com and yahoo.es are allowed',
    });
  });
});
describe('CustomValidaor LuhnValid', () => {
  class TestClass {
    @IsLuhnValid({ message: 'card_number is not valid' })
    card_number: string;
  }
  it('should return true when input is a valid Luhn number', async () => {
    const instance = new TestClass();
    instance.card_number = '45320151128336';
    const errors = await validate(instance);
    expect(errors.length).toBe(0);
  });
  it('should null info invalid credit card', async () => {
    const instance = new TestClass();
    instance.card_number = '';

    const errors = await validate(instance);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toEqual({
      IsLuhnValid: 'card_number is not valid',
    });
  });
});
describe('CustomValidaor isExpirationYear', () => {
  class TestClass {
    @IsExpirationYear({ message: 'enter a valid expiration date' })
    expiration_year: string;
  }
  it('should return true when the provided year is the current year', async () => {
    const instance = new TestClass();
    const currentYear = new Date().getFullYear();
    instance.expiration_year = currentYear.toString();
    const errors = await validate(instance);
    expect(errors.length).toBe(0);
  });
  it('should return false when the provided year is more than 5 years in the future', async () => {
    const instance = new TestClass();
    const currentYear = new Date().getFullYear() + 6;
    instance.expiration_year = currentYear.toString();
    const errors = await validate(instance);
    expect(errors.length).toBe(1);
  });
});
