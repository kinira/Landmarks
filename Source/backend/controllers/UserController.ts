import * as Express from "express";
import {
    Controller, Get, Response, Request, Next, PathParams, BodyParams,
    Post, Authenticated, Inject, Status, MultipartFile
} from "ts-express-decorators";
import { LoginData } from '../models/LoginData';
import { UserDataManager } from '../data/userManager';
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


    @Get("/users/isTaken/:username")
    public async isTaken( @PathParams("username") username) {
        try {
            await this.userManager.findUser(username);
            return { "taken": true }
        } catch (error) {
            return { "taken": false }
        }
    }

    @Post('/file')
    private uploadFile( @MultipartFile() file: File) {
        return { "file": file };
    }

    @Post("/register") @Status(201)
    public register( @BodyParams() registerData: RegistrationData) {
        registerData.ensureValid();

        this.userManager.createUser(registerData);
        return { "message": "created" }
    }
}
