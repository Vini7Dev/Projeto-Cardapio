/**
 * Util: Get Validation Errors
 */

import { ValidationError } from 'yup';

interface IValidationError {
    [key: string]: string;
}

const getValidationErrors = (error: ValidationError): IValidationError => {
    // Creating a base of validation errors
    const validationErrors: IValidationError = {};

    // Getting all errors and add in one object
    error.inner.forEach(err => {
        if(err.path) {
            validationErrors[err.path] = err.message;
        }
    });

    // Returning errors
    return validationErrors;
}

export default getValidationErrors;