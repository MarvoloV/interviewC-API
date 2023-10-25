import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsAllowedEmailDomain(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAllowedEmailDomain',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            return false;
          }

          const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
          const emailParts = value.split('@');
          if (emailParts.length !== 2) {
            return false;
          }

          const domain = emailParts[1];
          return allowedDomains.includes(domain);
        },
      },
    });
  };
}
export function IsExpirationYear(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExpirationYear',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            return false;
          }

          const currentYear = new Date().getFullYear();
          const providedYear = parseInt(value, 10);

          if (providedYear >= currentYear && providedYear <= currentYear + 5) {
            return true;
          }

          return false;
        },
      },
    });
  };
}
