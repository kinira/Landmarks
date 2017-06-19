import * as Express from "express";
import { Controller, Get, Response, Request, Next, PathParams, BodyParams, Post, Authenticated, Inject, Status } from "ts-express-decorators";
import { User } from '../data/models/user';
import UserDataManager from '../data/userManager';
import { AuthenticationModule } from '../modules/auth';


@Controller("/")
export class UserController {

    constructor(private userManager: UserDataManager, private authModule: AuthenticationModule) {
        this.userManager = userManager;
        this.authModule = authModule;
    }


    @Get("/users")
    public get() {
        return { "message": "hello from users controller" }
    }
}
