import { useForm as mantineUseForm } from '@mantine/form';
import { validateSync } from 'class-validator';
import { Enum } from 'typescript-string-enums';
import { Entries } from './types';

export const useForm = <T extends object>(args: { 
      dto: T, 
      initialValues: T,
      validateInputOnBlur?: boolean,
      clearInputErrorOnChange?: boolean
      validateInputOnChange?: boolean,
      transform?: (values: Entries<T>) => Entries<T> }) => {

   const mantineForm = mantineUseForm<Entries<T>>({
      initialValues : args.initialValues,
      validateInputOnBlur: args.validateInputOnBlur,
      clearInputErrorOnChange: args.clearInputErrorOnChange,
      validateInputOnChange: args.validateInputOnChange,

      
      validate: (values) => {

         const transformedValues = args.transform ? args.transform(values) : values;
         Object.keys(transformedValues).forEach((key) => {
         // @ts-ignore
            args.dto[key] = transformedValues[key];
         });
         const validationErrors = validateSync(args.dto);

         const formErrors: Record<string, string> = {};

         validationErrors.forEach((error)=> {
            const errorMessageArray = Object.values(error.constraints!)[0].split(' ');
            errorMessageArray.shift();
            let errorMessage = errorMessageArray.join(' ');
            errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
            formErrors[error.property] = errorMessage;
         });

         return formErrors;
      },
      transformValues(values) {
         return args.transform ? args.transform (values) : values;
      }
   });

   const keys = Object.keys(args.dto) ;
   
   const fields = Enum<string>(...keys) as {
      [K in keyof T]: string
   };

   return {
      ...mantineForm,
      fields
   };
   
};