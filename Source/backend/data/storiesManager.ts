import { db } from '../server'
import { Service } from "ts-express-decorators/lib";
import { Story } from "../../frontend/src/app/stories/stories.model";

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
     async updateStory(storyID : number){
        let res = await db.session().run(
            
        )
     }
}