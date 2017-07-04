import * as Express from "express";

import { DashboardManager } from '../data/dashboardManager';
import { Route } from '../models/Route';
import { RouteManager } from '../data/routeManager';
import {
    Controller, Get, Response, Request, Next, PathParams, BodyParams,
    Post, Authenticated, Inject, Status, MultipartFile, Delete
} from "ts-express-decorators";

@Controller("/")


export class RouteController {

     constructor(private routeManager: RouteManager) {
        this.routeManager = routeManager;
     }
  @Post("/routes/") 
  async insertRoute(@BodyParams() routeData: Route)
  {
    await this.routeManager.insertRoutsAsync(routeData);
    return {"message" : "created"};
  }
}
