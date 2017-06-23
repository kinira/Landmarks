import { db } from '../server'
import { Service } from "ts-express-decorators/lib";
import { Story } from '../../frontend/src/app/stories/stories.model';
import { BadRequest } from 'ts-httpexceptions';

@Service()

export class StoriesManager {
    private HASH_ROUNDS = 10;

     async insertStory(forInsert:Story) {
     
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
     async updateStory(forUpdate : Story){
        await this.deleteStory(forUpdate.id);
        await this.insertStory(forUpdate);
     }

     async getAll() : Promise<Array<Story>> {
        let allStories = await db.session().run(
            `MATCH (s:Story) RETURN s`
        );

        return allStories;
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