import * as Express from "express";

import { DashboardManager } from '../data/dashboardManager';
import {
    Controller, Get, Response, Request, Next, PathParams, BodyParams,
    Post, Authenticated, Inject, Status, MultipartFile, Delete
} from "ts-express-decorators";

@Controller("/")

export class DashboardController {
     constructor(private dashboardManager: DashboardManager) {
        this.dashboardManager = dashboardManager;
     }

    @Get("/dashboard")
    public async GetAll(){
       return await this.dashboardManager.getTopCities();
    }
}