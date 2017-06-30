import { User } from './User';
import { ValidationMessage } from './errors/ValidationMessage';


export class RegistrationData extends User {

    public confirmPassword : string;

    validate() {
        var problems = super.validate();

        if (!this.confirmPassword || this.password !== this.confirmPassword) {
            problems.push(new ValidationMessage("username", "User name must be at least 4 symbols"));
        }

        return problems;
    }


}