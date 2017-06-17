import { NextFunction, Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../data/models/user';

var router = Router();

export class AuthenticationModule {

    isAuthorized(req: Request, res: Response, next: NextFunction) {
        var authHeader = req.headers["auth"] as string;
        var token = authHeader.split(" ")[1];

        jwt.verify(token, config.appSecret, undefined, (err, decoded) => {
            if (err) {
                res.header(401);
                res.json({ "error": "authentication failed" });
            } else next();
        });
    }

    signIn(user: User) {
        return new Promise<string>((resolve, reject) => {
            var claimsData = { username: user.username };

            jwt.sign(claimsData, config.appSecret, (err, token) => {
                if (err) reject(err);
                else resolve(token);
            });
        });
    }
}

export default new AuthenticationModule();