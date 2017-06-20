import { ValidationMessage } from './ValidationMessage';
export class ValidationError extends Error{

    /**
     *
     */
    constructor(public errors: ValidationMessage[]) {
        super("validation errors have occured");
        this.errors = errors;
    }

}