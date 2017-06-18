import * as Express from "express";
import { Controller, Get, Response, Request, Next, PathParams, BodyParams, Post, Authenticated, Inject, Status } from "ts-express-decorators";
import { User } from '../data/models/user';
import UserDataManager from '../data/userManager';
import { AuthenticationModule } from '../modules/auth';


@Controller("/")
export class IndexController {

    constructor(private userManager: UserDataManager, private authModule: AuthenticationModule) {
        this.userManager = userManager;
        this.authModule = authModule;
    }


    @Get("/")
    public get() {
        return { "message": "hello there!" }
    }

    @Get("/throw")
    public async throw() {
        await new Promise(resolve => setTimeout(resolve, 500));
        throw new Error("fatal error");
    }

    @Get("/greet/:name")
    public greet( @PathParams("name") name: string) {
        return { "message": `hello ${name}!` };
    }

    @Post("/login")
    public async login( @BodyParams() loginData: User) {
        var user = await this.userManager.verifyLogin(loginData.username, loginData.password);
        var token = await this.authModule.signIn(user);

        return { "status": "success", "token": token };
    }

    @Get("/protected") @Authenticated() @Status(201)
    public protectedThing() {
        return { "message": `hello you accessed a protected resource!` };
    }
}
