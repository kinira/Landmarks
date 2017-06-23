import * as Express from "express";
import { StoriesManager } from '../data/storiesManager';
import { Story } from '../../frontend/src/app/stories/stories.model';
import {
    Controller, Get, Response, Request, Next, PathParams, BodyParams,
    Post, Authenticated, Inject, Status, MultipartFile, Delete
} from "ts-express-decorators";

@Controller("/")

export class StoriesController {
        constructor(private storiesManager: StoriesManager) {
        this.storiesManager = storiesManager;
    }

    @Get("/stories")
    public async All() {
        try {
          return { "stories" : await this.storiesManager.getAll() };
        } catch (error) {
            return { "stories": "error" }
        }
    }
    @Post("/stories/") @Status(201)

    public insert( @BodyParams() storyData: Story) {

        this.storiesManager.insertStory(storyData);
        return { "message": "created" }
    }

    @Post("/stories/:id") 

    public updateStory (@PathParams("id") id, @BodyParams() storyData: Story){
        this.storiesManager.updateStory(storyData);
        return {"message" : "updated"}
    }

    @Delete("/stories/:id")
    public deleteStory(@PathParams("id") id)
    {
        this.storiesManager.deleteStory(id);
        return {"message" : "deleted"}
    }
}