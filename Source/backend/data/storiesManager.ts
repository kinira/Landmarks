import { db } from '../server'
import { Service } from "ts-express-decorators/lib";
import { BadRequest } from 'ts-httpexceptions';
import { StoryDb } from "../models/StoryDb";

@Service()

export class StoriesManager {
    private HASH_ROUNDS = 10;

     async insertStory(forInsert:StoryDb) {
     
        let res = await db.session().run(
           `CREATE(s:Story {text:{textParam}, date: {dateParam}})
            WITH s
            MATCH(u:User) WHERE u.username = {userNameParam}
            MATCH(c:City) WHERE c.name = {cityParam}
            CREATE (u)-[:CREATED]->(s)
            CREATE (s)-[:IS_ABOUT]->(c) RETURN s`, 
            {textParam : forInsert.text, dateParam : forInsert.created, 
            userNameParam:forInsert.username, cityParam : forInsert.town
            }
        );
        
        return res;
     }
     async updateStory(forUpdate : StoryDb){
        await this.deleteStory(forUpdate.id);
        await this.insertStory(forUpdate);
     }

     async getAll() : Promise<Array<StoryDb>> {
        let allStories = await db.session().run(
            `MATCH  (city:City)<-[:IS_ABOUT]-(s:Story)<-[:CREATED]-(user:User)
            RETURN s.date as date, id(s) as id, s.text as text,user.name as username, city.name as city`, {}
        );
        let mapped = allStories.records.map(rec => 
                        new StoryDb(rec.get('id').toNumber(),
                        rec.get('username'),
                        rec.get('city'),
                        rec.get('date'),
                        rec.get('text')));
        return mapped;
     }

     async deleteStory(storyId : number){
         try{
            let res = await db.session().run(
                `MATCH (s:Story) WHERE id(s) = {idParam} OPTIONAL MATCH (s)-[r]-() DELETE s,r`,
                {idParam : storyId}
            );
         }
         catch (error){
            throw new BadRequest("Story id doesn't not exists!");
         }
     }

}