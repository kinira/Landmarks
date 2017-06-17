import { NextFunction, Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../data/models/user';

var router = Router();

export class AuthenticationModule {

    isAuthorized(req: Request) {
        return new Promise((resolve, reject) => {
            try {
                var authHeader = req.headers["authorization"] as string;
                var token = authHeader.split(" ")[1];

                jwt.verify(token, config.appSecret, undefined, (err, decoded) => {
                    if (err) resolve(false);
                    resolve(true);
                });
            } catch (error) {
                resolve(false);
            }
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