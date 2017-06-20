
import { LoginData } from "./LoginData";
import { ValidationMessage } from './errors/ValidationMessage';

export class User extends LoginData {

    email: string;

    name: string;

    validate() {
        var problems = super.validate();

        if (!this.name) {
            problems.push(new ValidationMessage("name", "Please provide a name"));
        }
        if (!this.email || this.email.length < 3)
            problems.push(new ValidationMessage("email", "Please provide a valid email"));

        return problems;
    }

}