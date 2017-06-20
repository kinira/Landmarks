import * as Express from "express";
import {
    Controller, Get, Response, Request, Next, PathParams, BodyParams,
    Post, Authenticated, Inject, Status
} from "ts-express-decorators";
import { LoginData } from '../models/LoginData';
import UserDataManager from '../data/userManager';
import { AuthenticationModule } from '../modules/auth';
import { RegistrationData } from '../models/RegistrationData';


@Controller("/")
export class UserController {

    constructor(private userManager: UserDataManager, private authModule: AuthenticationModule) {
        this.userManager = userManager;
        this.authModule = authModule;
    }


    @Post("/login")
    public async login( @BodyParams() loginData: LoginData) {
        var user = await this.userManager.verifyLogin(loginData.username, loginData.password);
        var token = await this.authModule.signIn(user);

        return { "status": "success", "token": token };
    }



    @Post("/register") @Status(201)
    public register( @BodyParams() registerData: RegistrationData) {
        registerData.ensureValid();

        this.userManager.createUser(registerData);
        return { "message": "created" }
    }
}
