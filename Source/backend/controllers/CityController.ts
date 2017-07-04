import * as Express from "express";
import { Controller, Get, Response, Request, Next, PathParams, BodyParams, Post, Authenticated, Inject, Status } from "ts-express-decorators";
import { UserDataManager } from '../data/userManager';
import { AuthenticationModule } from '../modules/auth';
import { CitiesManager } from '../data/citiesManager';


@Controller("/cities")
export class CitiesController {

    constructor(private citiesManger : CitiesManager) {
      
    }


    @Get("/")
    public get() {
        return this.citiesManger.getCities();
    }

}
