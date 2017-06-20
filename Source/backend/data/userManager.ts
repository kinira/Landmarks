import { User } from '../models/User';
import { db } from '../server';
import * as bcrypt from 'bcrypt';
import { BadRequest } from 'ts-httpexceptions';
import { Service } from 'ts-express-decorators/lib';

@Service()
export class UserDataManager {

    private HASH_ROUNDS = 10;

    async findUser(username: string): Promise<User> {
        let res = await db.session().run('MATCH (n:User) WHERE n.username = {nameParam} RETURN n', { nameParam: username });
        if (!res.records.length)
            throw new BadRequest("Username does not exist");

        return <User>res.records[0].get('n').properties;
    }

    async createUser(user: User) {
        let passwordHash = await bcrypt.hash(user.password, this.HASH_ROUNDS);
        let res = await db.session().run('CREATE (n:User { username: {pUser}, password: {pPass}, name: {pName}, email: {pEmail} }) RETURN n',
            { pUser: user.username, pPass: passwordHash, pName: user.name, pEmail: user.email });

        return res;
    }

    async verifyLogin(username: string, password: string) {
        let user = await this.findUser(username);
        let passwordHash = user.password;

        if (await bcrypt.compare(password, passwordHash) == false) {
            throw new BadRequest("Username/password is invalid");
        } else {
            return user;
        }
    }

}
