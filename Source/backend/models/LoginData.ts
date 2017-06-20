import { ValidationError } from './errors/ValidationError';
import { ValidationMessage } from './errors/ValidationMessage';
export class LoginData {

    public username: string;
    public password: string;

    validate() : ValidationMessage[] {
        var problems = [];
        if (!this.username || this.username.length < 4) {
            problems.push(new ValidationMessage("username", "User name must be at least 4 symbols"));
        }
        if (!this.password || this.password.length < 4)
            problems.push(new ValidationMessage("password", "Password must be at least 4 symbols"));

        return problems;
    }

    ensureValid(){
        var problems = this.validate();
        if(problems.length > 0) throw new ValidationError(problems);
    }

}
