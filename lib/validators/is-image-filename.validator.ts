import { registerDecorator, ValidationArguments, ValidationOptions, Validator } from 'class-validator';

export function IsImageFilename(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsImageFilename',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: '$property should be a valid filename',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const validator = new Validator();
          const [userGuid, imageGuid] = value.split('_image_');

          return validator.isUUID(userGuid.split(':')[1], '4') && validator.isUUID(imageGuid.split('.')[0], '4');
        },
      },
    });
  };
}
