import * as Express from "express";

import { DashboardManager } from '../data/dashboardManager';
import { Route } from '../models/Route';
import { RouteManager } from '../data/routeManager';
import {
  Controller, Get, Response, Request, Next, PathParams, BodyParams,
  Post, Authenticated, Inject, Status, MultipartFile, Delete
} from "ts-express-decorators";


@Controller("/routes")
export class RouteController {

  constructor(private routeManager: RouteManager) {
    this.routeManager = routeManager;
  }


  @Post("/") @Authenticated() @Status(201)
  async insertRoute( @BodyParams() routeData: Route) {
    await this.routeManager.insertRoutsAsync(routeData);
    return { "message": "created" };
  }

  @Get("/:city")
  async getRoutes( @PathParams("city") city: string) {
    var routes = await this.routeManager.getRoutesAsync(city);
    return routes;
  }
}
