import * as Express from "express";
import { Controller, Get, Response, Request, Next, PathParams, BodyParams, Post, Authenticated } from "ts-express-decorators";
import { User } from '../data/models/user';
import { default as userManager } from '../data/userManager';
import { default as authModule } from '../modules/auth';


@Controller("/")
export class IndexController {

    @Get("/")
    public get() {
        return { "message": "hello there!" }
    }

    @Get("/throw")
    public async throw( @PathParams("name") name: string) {
        await new Promise(resolve => setTimeout(resolve, 500));
        throw new Error("fatal error");
    }

    @Get("/greet/:name")
    public greet( @PathParams("name") name: string) {
        return { "message": `hello ${name}!` };
    }

    @Post("/login")
    public async login( @BodyParams() loginData: User) {
        var user = await userManager.verifyLogin(loginData.username, loginData.password);
        var token = await authModule.signIn(user);

        return { "status": "success", "token": token };
    }

    @Get("/protected")
    @Authenticated()
    public protectedThing() {
        return { "message": `hello you accessed a protected resource!` };
    }
}
