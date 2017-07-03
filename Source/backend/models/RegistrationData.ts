import { User } from './User';
import { ValidationMessage } from './errors/ValidationMessage';


export class RegistrationData extends User {

    public confirmPassword : string;

    validate() {
        var problems = super.validate();

        if (!this.confirmPassword || this.password !== this.confirmPassword) {
            problems.push(new ValidationMessage("password", "The passwords doesn't match"));
        }

        return problems;
    }


}