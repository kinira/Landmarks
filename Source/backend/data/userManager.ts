import { User } from './models/user';
import { db } from '../app';
import * as bcrypt from 'bcrypt';

export class UserDataManager {

    private HASH_ROUNDS = 10;

    async findUser(username: string): Promise<User> {
        let res = await db.session().run('MATCH (n:User) WHERE n.username = {nameParam} RETURN n', { nameParam: username });
        return <User>res.records[0].get('n').properties;
    }

    async createUser(username: string, password: string) {
        let passwordHash = await bcrypt.hash(password, this.HASH_ROUNDS);
        let res = await db.session().run('CREATE (n:User { username: {nameParam}, password: {passParam}}) RETURN n',
            { nameParam: username, passParam: passwordHash });

        return res;
    }

    async verifyLogin(username: string, password: string) {
        let user = await this.findUser(username);
        let passwordHash = user.password;

        if(await bcrypt.compare(password, passwordHash) == false){
            throw new Error("Username/password is invalid");
        } else {
            return user;
        }
    }

}

// Export a default instance (like a singleton)
export default new UserDataManager();