import * as Express from "express";
import { StoriesManager } from '../data/storiesManager';
import { StoryDb } from "../models/StoryDb";
import {
    Controller, Get, Response, Request, Next, PathParams, BodyParams,
    Post, Authenticated, Inject, Status, MultipartFile, Delete
} from "ts-express-decorators";


@Controller("/stories")

export class StoriesController {
    constructor(private storiesManager: StoriesManager) {
        this.storiesManager = storiesManager;
    }

    @Get("/")
    public async All() {
        try {
            return { "stories": await this.storiesManager.getAll() };
        } catch (error) {
            return { "stories": "error" }
        }
    }

    @Get("/:city")
    public async ByCity( @PathParams("city") city: string) {
        return { "stories": await this.storiesManager.byCity(city) };
    }


    @Post("/") @Status(201)
    public insert( @BodyParams() storyData: StoryDb) {
        this.storiesManager.insertStory(storyData);
        return { "message": "created" }
    }

    @Post("/:id")

    public updateStory( @PathParams("id") id, @BodyParams() storyData: StoryDb) {
        this.storiesManager.updateStory(storyData);
        return { "message": "updated" }
    }

    @Delete("/:id")
    public deleteStory( @PathParams("id") id) {
        this.storiesManager.deleteStory(id);
        return { "message": "deleted" }
    }
}