import { db } from '../server'
import { Service } from "ts-express-decorators/lib";
import { BadRequest } from 'ts-httpexceptions';
import { StoryDb } from "../models/StoryDb";

@Service()

export class CitiesManager {
    
    async getCities(){
        var cities = await db.session().run("MATCH (c:City) RETURN c.name", {});
        return cities.records.map(c=> c.get("c.name") as string);
    }

}